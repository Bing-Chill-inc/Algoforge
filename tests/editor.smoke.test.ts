import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { chromium, type Browser } from "@playwright/test";
import { join } from "node:path";

let browser: Browser;
let server: ReturnType<typeof Bun.serve>;
let standaloneHtml: string;

beforeAll(async () => {
	standaloneHtml = await Bun.file(join(import.meta.dir, "..", "out", "index.html")).text();
	server = Bun.serve({
		hostname: "127.0.0.1",
		port: 0,
		fetch(request) {
			const { pathname } = new URL(request.url);
			if (pathname === "/Bibliotheque/getStructure") return Response.json([]);
			if (
				pathname.startsWith("/assetsDynamiques/") ||
				pathname.startsWith("/Bibliotheque/")
			) {
				return new Response(
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>',
					{ headers: { "content-type": "image/svg+xml" } },
				);
			}
			const html =
				pathname === "/vscode"
					? withRuntimeConfig(standaloneHtml, {
						initialAlgorithm: null,
						title: null,
						hostKind: "vscode",
						isExam: false,
						prettifyInitialAlgorithm: false,
					})
					: pathname === "/exam"
					? withRuntimeConfig(standaloneHtml, {
							initialAlgorithm: null,
							title: "Exam test",
							hostKind: "web",
							isExam: true,
						prettifyInitialAlgorithm: false,
						})
					: standaloneHtml;
			return new Response(html, {
				headers: { "content-type": "text/html; charset=utf-8" },
			});
		},
	});
	browser = await chromium.launch({ headless: true });
});

afterAll(async () => {
	await browser?.close();
	server?.stop(true);
});

describe("standalone editor", () => {
	test("boots registered custom elements and embeds local assets", async () => {
		const page = await browser.newPage();
		const pageErrors: string[] = [];
		page.on("pageerror", (error) => pageErrors.push(error.message));
		await page.route("https://plausible.feror.fr/**", (route) => route.abort());
		await page.goto(`http://127.0.0.1:${server.port}/`);
		await page.waitForFunction(
			() => customElements.get("editeur-interface") !== undefined,
		);

		expect(await page.locator("editeur-interface").count()).toBe(1);
		expect(await page.locator("plan-travail").count()).toBe(1);
		expect(await page.locator("fenetre-modale").count()).toBe(4);
		expect(
			await page.evaluate(() =>
				(document.querySelector("editeur-interface") as HTMLElement & {
					_clickSound: HTMLAudioElement;
				})._clickSound.src.startsWith("data:audio/ogg"),
			),
		).toBe(true);
		expect(pageErrors).toEqual([]);
		await page.close();
	});

	test("creates, serializes, undoes, and redoes a problem", async () => {
		const page = await browser.newPage();
		const pageErrors: string[] = [];
		page.on("pageerror", (error) => pageErrors.push(error.message));
		await page.route("https://plausible.feror.fr/**", (route) => route.abort());
		await page.goto(`http://127.0.0.1:${server.port}/`);
		await page.waitForFunction(
			() => customElements.get("editeur-interface") !== undefined,
		);

		await page.locator("#boutonProbleme").click();
		await page.locator("#espacePrincipal").click({ position: { x: 300, y: 180 } });
		expect(await page.locator("probleme-element").count()).toBe(1);

		const documentJson = await page.evaluate(() =>
			(document.querySelector("plan-travail") as HTMLElement & {
				exporterEnJSON(): Array<{ typeElement: string }>;
			}).exporterEnJSON(),
		);
		expect(documentJson[0]?.typeElement).toBe("Probleme");

		await page.locator("#boutonUndo").click();
		expect(await page.locator("probleme-element").count()).toBe(0);
		await page.locator("#boutonRedo").click();
		expect(await page.locator("probleme-element").count()).toBe(1);
		expect(pageErrors).toEqual([]);
		await page.close();
	});

	test("imports TBR content and prettifies the active plan", async () => {
		const page = await browser.newPage();
		const pageErrors: string[] = [];
		page.on("pageerror", (error) => pageErrors.push(error.message));
		await page.route("https://plausible.feror.fr/**", (route) => route.abort());
		await page.goto(`http://127.0.0.1:${server.port}/`);
		await page.waitForFunction(
			() => customElements.get("editeur-interface") !== undefined,
		);

		const result = await page.evaluate(() => {
			const editor = document.querySelector("editeur-interface") as HTMLElement & {
				interpreterFichierAlgorithme(
					name: string,
					content: string,
				): {
					algo: Array<Record<string, unknown>>;
					nomAlgo: string;
					estTabulaRasa: boolean;
				};
				prettifyPlanActif(): void;
			};
			const workspace = document.querySelector("plan-travail") as HTMLElement & {
				chargerDepuisJSON(value: unknown): void;
			};
			const imported = editor.interpreterFichierAlgorithme(
				"sample.tbr",
				`<?xml version="1.0"?>
				<Algorithme>
					<nom>Imported TBR</nom>
					<Elements>
						<Action>
							<Position>100;200</Position>
							<Titre>Compute</Titre>
							<PreAssertion>?</PreAssertion>
							<PostAssertion>done</PostAssertion>
							<Enfants />
						</Action>
					</Elements>
				</Algorithme>`,
			);
			workspace.chargerDepuisJSON(imported.algo);
			editor.prettifyPlanActif();
			return {
				name: imported.nomAlgo,
				isTbr: imported.estTabulaRasa,
				type: imported.algo[0]?.typeElement,
				problemCount: document.querySelectorAll("probleme-element").length,
			};
		});

		expect(result).toEqual({
			name: "Imported TBR",
			isTbr: true,
			type: "Probleme",
			problemCount: 1,
		});
		expect(pageErrors).toEqual([]);
		await page.close();
	});

	test("loads and updates a bounded loop", async () => {
		const page = await browser.newPage();
		const pageErrors: string[] = [];
		page.on("pageerror", (error) => pageErrors.push(error.message));
		await page.route("https://plausible.feror.fr/**", (route) => route.abort());
		await page.goto(`http://127.0.0.1:${server.port}/`);
		await page.waitForFunction(
			() => customElements.get("editeur-interface") !== undefined,
		);

		const serialized = await page.evaluate(() => {
			const workspace = document.querySelector("plan-travail") as HTMLElement & {
				chargerDepuisJSON(value: unknown): void;
				exporterEnJSON(): Array<{
					typeElement: string;
					variableAIterer?: string;
					borneInferieure?: string;
					borneSuperieure?: string;
					pas?: string;
				}>;
			};
			workspace.chargerDepuisJSON([
				{
					typeElement: "StructureIterativeBornee",
					abscisse: "10vw",
					ordonnee: "10vw",
					variableAIterer: "index",
					borneInferieure: "1",
					borneSuperieure: "5",
					pas: "1",
					croissant: true,
					enfants: [],
				},
			]);

			const loop = document.querySelector(
				"structure-iterative-bornee-element",
			) as HTMLElement & {
				_variableAIterer: string;
				setVariableAIterer(value: string): void;
			};
			loop.setVariableAIterer("nextIndex");
			return workspace.exporterEnJSON()[0];
		});

		expect(serialized).toEqual(
			expect.objectContaining({
				typeElement: "StructureIterativeBornee",
				variableAIterer: "nextIndex",
				borneInferieure: "1",
				borneSuperieure: "5",
				pas: "1",
			}),
		);
		expect(pageErrors).toEqual([]);
		await page.close();
	});

	test("hydrates decomposed subplans closed until their open button is used", async () => {
		const page = await browser.newPage();
		const pageErrors: string[] = [];
		page.on("pageerror", (error) => pageErrors.push(error.message));
		await page.route("https://plausible.feror.fr/**", (route) => route.abort());
		await page.goto(`http://127.0.0.1:${server.port}/`);
		await page.waitForFunction(
			() => customElements.get("editeur-interface") !== undefined,
		);

		await page.evaluate(() => {
			const editor = document.querySelector("editeur-interface") as HTMLElement & {
				replaceDocument(algorithm: unknown[]): void;
			};
			editor.replaceDocument([
				{
					typeElement: "Probleme",
					abscisse: "20vw",
					ordonnee: "5vw",
					libelle: "Decomposed problem",
					listeDonnes: [],
					listeResultats: [],
					estDecomposeAilleurs: true,
					enfants: [
						{
							typeElement: "Probleme",
							abscisse: "20vw",
							ordonnee: "15vw",
							libelle: "Nested step",
							listeDonnes: [],
							listeResultats: [],
							enfants: [],
						},
					],
				},
				{ typeElement: "DictionnaireDonnee", types: {}, signification: {} },
			]);
		});

		const subplan = page.locator("sous-plan-travail");
		expect(await subplan.count()).toBe(1);
		expect(await subplan.evaluate((element) => element.classList.contains("ouvert"))).toBe(false);
		expect(await page.locator(".sous-titre").count()).toBe(0);

		await page.locator("probleme-element > span.ouvrir").click();
		expect(await subplan.evaluate((element) => element.classList.contains("ouvert"))).toBe(true);
		expect(await page.locator(".sous-titre").count()).toBe(1);

		await page.evaluate(() => {
			const editor = document.querySelector("editeur-interface") as HTMLElement & {
				replaceDocument(algorithm: unknown[]): void;
				serializeDocument(): unknown[];
			};
			editor.replaceDocument(editor.serializeDocument());
		});
		expect(await subplan.evaluate((element) => element.classList.contains("ouvert"))).toBe(false);
		expect(await page.locator(".sous-titre").count()).toBe(0);
		expect(pageErrors).toEqual([]);
		await page.close();
	});

	test("synchronizes a VS Code-hosted document without cloud navigation", async () => {
		const page = await browser.newPage();
		const backendRequests: string[] = [];
		page.on("request", (request) => {
			const path = new URL(request.url()).pathname;
			if (path.startsWith("/api/") || path.includes("Bibliotheque/getStructure")) {
				backendRequests.push(path);
			}
		});
		await page.addInitScript(() => {
			const messages: unknown[] = [];
			(globalThis as typeof globalThis & { __hostMessages: unknown[] }).__hostMessages =
				messages;
			(globalThis as typeof globalThis & {
				acquireVsCodeApi: () => {
					postMessage(message: unknown): void;
					getState(): unknown;
					setState(state: unknown): void;
				};
			}).acquireVsCodeApi = () => ({
				postMessage(message: unknown) {
					messages.push(message);
					if (
						typeof message === "object" &&
						message !== null &&
						(message as { type?: string }).type === "documentChanged"
					) {
						const edit = message as { editId: number; baseVersion: number };
						setTimeout(
							() =>
								window.dispatchEvent(
									new MessageEvent("message", {
										data: {
											type: "editAccepted",
											editId: edit.editId,
											version: edit.baseVersion + 1,
										},
									}),
								),
							0,
						);
					}
					if (
						typeof message === "object" &&
						message !== null &&
						(message as { type?: string }).type === "ready"
					) {
						setTimeout(() => {
							window.dispatchEvent(
								new MessageEvent("message", {
									data: {
										type: "initialize",
										algorithm: [
											{
												typeElement: "DictionnaireDonnee",
												types: {},
												signification: {},
											},
										],
										title: "lesson",
										version: 1,
										library: [],
										customLibrary: [],
									},
								}),
							);
						}, 0);
					}
				},
				getState: () => undefined,
				setState: () => undefined,
			});
		});
		await page.route("https://plausible.feror.fr/**", (route) => route.abort());
		await page.goto(`http://127.0.0.1:${server.port}/vscode`);
		await page.waitForFunction(
			() =>
				customElements.get("editeur-interface") !== undefined &&
				document.querySelector("#titreAlgo")?.textContent === "lesson",
		);

		expect(await page.locator("#titreAlgo").getAttribute("contenteditable")).toBe(
			"false",
		);
		expect(
			await page.locator("menu-compte-element").getAttribute("hidden"),
		).toBeNull();
		await page.locator("#MenuCompte").click();
		expect(await page.locator("select#theme").isVisible()).toBe(true);
		expect(await page.locator("select#theme").inputValue()).toBe("VS Code");
		await page.locator("select#theme").selectOption("Thème AlgoForge");
		await page.waitForFunction(() =>
			(globalThis as typeof globalThis & {
				__hostMessages: Array<{
					type?: string;
					name?: string;
					value?: unknown;
				}>;
			}).__hostMessages.some(
				(message) =>
					message.type === "preference" &&
					message.name === "theme" &&
					message.value === "Thème AlgoForge",
			),
		);
		await page.locator("select#theme").selectOption("VS Code");
		expect(await page.locator("#switchGlowDisplayer").evaluate((element) =>
			(element as HTMLElement).style.left,
		)).toBe("2px");
		await page.locator("#switchGlowContainer").click();
		expect(await page.locator("#switchGlowDisplayer").evaluate((element) =>
			(element as HTMLElement).style.right,
		)).toBe("2px");
		await page.locator("#switchGlowContainer").click();
		expect(await page.locator("#boutonConnexion").count()).toBe(0);
		await page.locator("#closeMenuBtn2").click();
		await page.locator("#boutonProbleme").click();
		await page.locator("#espacePrincipal").click({ position: { x: 300, y: 180 } });
		await page.waitForFunction(() =>
			(
				globalThis as typeof globalThis & {
					__hostMessages: Array<{ type?: string }>;
				}
			).__hostMessages.some((message) => message.type === "documentChanged"),
		);
		expect(await page.locator("probleme-element").count()).toBe(1);
		const commandCount = await page.evaluate(() =>
			(globalThis as typeof globalThis & {
				__hostMessages: Array<{ type?: string }>;
			}).__hostMessages.filter((message) => message.type === "command").length,
		);
		await page.locator("body").press("Control+z");
		await page.locator("body").press("Control+y");
		await page.locator("body").press("Control+s");
		expect(await page.locator("probleme-element").count()).toBe(1);
		expect(await page.evaluate(() =>
			(globalThis as typeof globalThis & {
				__hostMessages: Array<{ type?: string }>;
			}).__hostMessages.filter((message) => message.type === "command").length,
		)).toBe(commandCount);
		const rollbackResult = await page.evaluate(() => {
			const editor = document.querySelector("editeur-interface") as HTMLElement & {
				replaceDocument(algorithm: unknown[]): void;
			};
			try {
				editor.replaceDocument([{ typeElement: "Probleme" }]);
			} catch {
				return document.querySelectorAll("probleme-element").length;
			}
			return -1;
		});
		expect(rollbackResult).toBe(1);

		const renderingAndCleanup = await page.evaluate(() => {
			const editor = document.querySelector("editeur-interface") as HTMLElement & {
				replaceDocument(algorithm: unknown[]): void;
			};
			editor.replaceDocument([
				{
					typeElement: "StructureIterativeNonBornee",
					abscisse: "10vw",
					ordonnee: "10vw",
					enfants: [],
				},
				{
					typeElement: "ConditionSortie",
					abscisse: "20vw",
					ordonnee: "10vw",
				},
				{ typeElement: "DictionnaireDonnee", types: {}, signification: {} },
			]);
			const loop = document.querySelector(
				"structure-iterative-non-bornee-element > .boucleSVG",
			) as HTMLElement;
			const exit = document.querySelector("condition-sortie-element") as HTMLElement;
			const assets = {
				loop: getComputedStyle(loop).backgroundImage,
				exit: getComputedStyle(exit).backgroundImage,
			};

			editor.replaceDocument([
				{
					typeElement: "Probleme",
					abscisse: "10vw",
					ordonnee: "5vw",
					libelle: "parent",
					listeDonnes: [],
					listeResultats: [],
					enfants: [
						{
							typeElement: "Probleme",
							abscisse: "10vw",
							ordonnee: "15vw",
							libelle: "child",
							listeDonnes: [],
							listeResultats: [],
							enfants: [],
						},
					],
				},
				{ typeElement: "DictionnaireDonnee", types: {}, signification: {} },
			]);
			const linkedLines = document.querySelectorAll("ligne-element").length;
			editor.replaceDocument([
				{ typeElement: "DictionnaireDonnee", types: {}, signification: {} },
			]);
			return {
				...assets,
				linkedLines,
				orphanLines: document.querySelectorAll(
					"ligne-element, symbole-decomposition-element",
				).length,
			};
		});
		expect(renderingAndCleanup.loop).not.toBe("none");
		expect(renderingAndCleanup.exit).not.toBe("none");
		expect(renderingAndCleanup.linkedLines).toBeGreaterThan(0);
		expect(renderingAndCleanup.orphanLines).toBe(0);

		await page.evaluate(() => {
			document.documentElement.style.setProperty(
				"--vscode-editor-background",
				"#123456",
			);
			document.body.setAttribute("data-vscode-theme-id", "test-theme");
		});
		await page.waitForFunction(
			() => document.body.style.getPropertyValue("--bgColor") === "#123456",
		);
		expect(backendRequests).toEqual([]);
		await page.close();
	});

	test("applies exam runtime configuration from embedded JSON", async () => {
		const page = await browser.newPage();
		await page.route("https://plausible.feror.fr/**", (route) => route.abort());
		await page.goto(`http://127.0.0.1:${server.port}/exam`);
		await page.waitForFunction(
			() => customElements.get("editeur-interface") !== undefined,
		);

		expect(await page.locator("#titreAlgo").innerText()).toBe("Exam test");
		expect(
			await page.locator("menu-compte-element").evaluate(
				(element) => getComputedStyle(element).display,
			),
		).toBe("none");
		expect(await page.locator("#biblio_btn").count()).toBe(0);
		await page.close();
	});
});

function withRuntimeConfig(
	html: string,
	config: {
		initialAlgorithm: unknown | null;
		title: string | null;
		hostKind: "web" | "electron" | "vscode";
		isExam: boolean;
		prettifyInitialAlgorithm: boolean;
	},
): string {
	return html.replace(
		/{"initialAlgorithm":null,"title":null,"hostKind":"web","isExam":false,"prettifyInitialAlgorithm":false}/,
		JSON.stringify(config).replaceAll("<", "\\u003c"),
	);
}

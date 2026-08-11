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
				pathname === "/exam"
					? withRuntimeConfig(standaloneHtml, {
							initialAlgorithm: null,
							title: "Exam test",
							isElectron: false,
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
		isElectron: boolean;
		isExam: boolean;
		prettifyInitialAlgorithm: boolean;
	},
): string {
	return html.replace(
		/{"initialAlgorithm":null,"title":null,"isElectron":false,"isExam":false,"prettifyInitialAlgorithm":false}/,
		JSON.stringify(config).replaceAll("<", "\\u003c"),
	);
}

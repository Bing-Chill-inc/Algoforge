import {
	createImportedDocument,
	hostReady,
	initializeDocumentController,
	isVsCodeHost,
	onHostMessage,
	openExternal,
	reportHostError,
} from "./host";
import { editeur, preferences, titreAlgo } from "./runtime";

export function initializeVsCodeIntegration(): void {
	if (!isVsCodeHost()) return;

	titreAlgo.contentEditable = "false";
	titreAlgo.nextElementSibling?.setAttribute("hidden", "true");
	const preferencesMenu = document.querySelector<HTMLElement>(
		"menu-compte-element",
	);
	preferencesMenu?.setAttribute("title", "Editor preferences");
	preferencesMenu?.setAttribute("aria-label", "Editor preferences");
	document.querySelector<HTMLElement>(".zoneActionsCloud")?.setAttribute(
		"hidden",
		"true",
	);
	const documentController = initializeDocumentController(() =>
		editeur.serializeDocument(),
	);
	new MutationObserver(() => {
		const selectedTheme = editeur._themeSelect?.selectedOptions?.[0];
		if (selectedTheme?.nom === "VS Code") selectedTheme.appliquer();
	}).observe(document.body, {
		attributes: true,
		attributeFilter: ["class", "data-vscode-theme-id", "data-vscode-theme-kind"],
	});

	onHostMessage((message) => {
		try {
			if (message.type === "initialize" || message.type === "replaceDocument") {
				titreAlgo.innerText = message.title;
				document.title = `AlgoForge - ${message.title}`;
				documentController.replaceAuthoritative(message.version, () =>
					editeur.replaceDocument(message.algorithm),
				);
				if (message.type === "initialize") {
					editeur._bibliotheque.initializeHostData(
						message.library ?? [],
						message.customLibrary ?? [],
					);
					const savedTheme = message.preferences?.theme;
					if (
						savedTheme &&
						Array.from(editeur._themeSelect.options).some(
							(option: HTMLOptionElement) => option.value === savedTheme,
						)
					) {
						editeur._themeSelect.value = savedTheme;
						editeur._themeSelect.selectedOptions[0].appliquer();
					}
					if (typeof message.preferences?.glow === "boolean") {
						preferences.glow = message.preferences.glow;
						const displayer = document.querySelector<HTMLElement>(
							"#switchGlowDisplayer",
						);
						const container = document.querySelector<HTMLElement>(
							"#switchGlowContainer",
						);
						if (displayer && container) {
							displayer.style.left = preferences.glow ? "auto" : "2px";
							displayer.style.right = preferences.glow ? "2px" : "auto";
							container.style.backgroundColor = preferences.glow
								? "var(--titleColor)"
								: "var(--fgColorSemiTransparent)";
						}
					}
				}
			}
			if (message.type === "editAccepted") {
				documentController.accept(message.editId, message.version);
			}
			if (message.type === "editRejected") {
				titreAlgo.innerText = message.title;
				documentController.replaceAuthoritative(message.version, () =>
					editeur.replaceDocument(message.algorithm),
				);
				if (message.error) reportHostError(message.error);
			}
			if (message.type === "importSource") {
				const imported = editeur.interpreterFichierAlgorithme(
					message.name,
					message.content,
				);
				createImportedDocument(
					imported.nomAlgo || editeur.retirerExtensionNomFichier(message.name),
					imported.algo,
				);
			}
		} catch (error) {
			reportHostError(
				error instanceof Error ? error.message : "Unable to update the editor.",
			);
		}
	});

	document.addEventListener("click", (event) => {
		const anchor =
			event.target instanceof Element ? event.target.closest("a[href]") : null;
		if (!(anchor instanceof HTMLAnchorElement)) return;
		const href = anchor.href;
		if (!href.startsWith("http://") && !href.startsWith("https://")) return;
		event.preventDefault();
		openExternal(href);
	});

	hostReady();
}

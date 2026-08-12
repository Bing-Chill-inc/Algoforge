import type { Editeur } from "../PartieEditeur/Editeur";
import type { EditorHostKind, EditorRuntimeConfig } from "./config";

export interface EditorPreferences {
	glow: boolean;
	dockEffect: boolean;
	renderScale: number;
}

export const verbose = false;
export const preferences: EditorPreferences = {
	glow: false,
	dockEffect: true,
	renderScale: 4,
};

export let hostKind: EditorHostKind = "web";
export let isExam = false;
export let editeur: Editeur;
export let titreAlgo: HTMLElement;

export function initializeRuntime(config: EditorRuntimeConfig): void {
	hostKind = config.hostKind;
	isExam = config.isExam;
	editeur = requiredElement<Editeur>("editeur-interface");
	titreAlgo = requiredElement<HTMLElement>("#titreAlgo");
}

export function requiredElement<T extends Element>(selector: string): T {
	const element = document.querySelector<T>(selector);
	if (!element) throw new Error(`Required editor element not found: ${selector}`);
	return element;
}

export function readFromClipboard(): string {
	const legacyGlobal = globalThis as typeof globalThis & {
		readFromClipboard?: () => string;
	};
	return legacyGlobal.readFromClipboard?.() ?? "";
}

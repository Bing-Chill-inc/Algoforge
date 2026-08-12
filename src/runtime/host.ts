import { hostKind } from "./runtime";
import {
	EditorDocumentController,
	type DocumentChangeMessage,
} from "./documentController";

export const EMPTY_ALGORITHM = [
	{
		typeElement: "DictionnaireDonnee",
		types: {},
		signification: {},
	},
] as const;

export interface LibraryEntry {
	nom?: string;
	nomCourt?: string;
	descriptif?: string;
	algo?: string;
	path?: string;
}

export interface LibraryCategory {
	nom: string;
	nomCourt?: string;
	contenu: LibraryEntry[];
}

export type VsCodeCommand =
	| "new"
	| "open"
	| "save"
	| "saveAs"
	| "undo"
	| "redo"
	| "import";

type VsCodeApi = {
	postMessage(message: unknown): void;
	getState(): unknown;
	setState(state: unknown): void;
};

export type HostMessage =
	| {
			type: "initialize" | "replaceDocument";
			algorithm: unknown[];
			title: string;
			version: number;
			library?: LibraryCategory[];
			customLibrary?: unknown[];
			preferences?: { theme?: string; glow?: boolean };
	  }
	| {
			type: "editRejected";
			algorithm: unknown[];
			title: string;
			version: number;
			error?: string;
	  }
	| { type: "editAccepted"; editId: number; version: number }
	| { type: "clipboardResult"; requestId: number; text: string }
	| { type: "importSource"; name: string; content: string };

const globalWithVsCode = globalThis as typeof globalThis & {
	acquireVsCodeApi?: () => VsCodeApi;
};

let vscodeApi: VsCodeApi | undefined;
let requestId = 0;
let library: LibraryCategory[] = [];
let customLibrary: unknown[] = [];
const clipboardRequests = new Map<number, (text: string) => void>();
const messageListeners = new Set<(message: HostMessage) => void>();
let documentController: EditorDocumentController | undefined;
let hostPreferencesReady = false;

export function initializeHost(): void {
	if (hostKind !== "vscode" || vscodeApi) return;
	vscodeApi = globalWithVsCode.acquireVsCodeApi?.();
	window.addEventListener("message", (event: MessageEvent<HostMessage>) => {
		const message = event.data;
		if (!message || typeof message !== "object" || !("type" in message)) return;
		if (message.type === "initialize" || message.type === "replaceDocument") {
			if (message.library) library = message.library;
			if (message.customLibrary) customLibrary = message.customLibrary;
		}
		if (message.type === "clipboardResult") {
			clipboardRequests.get(message.requestId)?.(message.text);
			clipboardRequests.delete(message.requestId);
		}
		for (const listener of messageListeners) listener(message);
		if (message.type === "initialize") hostPreferencesReady = true;
	});
}

export function onHostMessage(listener: (message: HostMessage) => void): () => void {
	messageListeners.add(listener);
	return () => messageListeners.delete(listener);
}

export function isVsCodeHost(): boolean {
	return hostKind === "vscode";
}

export function hostReady(): void {
	vscodeApi?.postMessage({ type: "ready" });
}

export function initializeDocumentController(
	serialize: () => unknown[],
): EditorDocumentController {
	documentController = new EditorDocumentController(
		serialize,
		(message: DocumentChangeMessage) => vscodeApi?.postMessage(message),
	);
	return documentController;
}

export function commitDocumentChange(): void {
	documentController?.commit();
}

export function updateHostPreference(
	name: "theme" | "glow",
	value: string | boolean,
): void {
	if (hostPreferencesReady) {
		vscodeApi?.postMessage({ type: "preference", name, value });
	}
}

export function executeHostCommand(command: VsCodeCommand): void {
	vscodeApi?.postMessage({ type: "command", command });
}

export async function readHostClipboard(): Promise<string> {
	if (!isVsCodeHost()) return navigator.clipboard.readText();
	const currentRequestId = ++requestId;
	return new Promise((resolve) => {
		clipboardRequests.set(currentRequestId, resolve);
		vscodeApi?.postMessage({ type: "clipboardRead", requestId: currentRequestId });
	});
}

export async function writeHostClipboard(text: string): Promise<void> {
	if (!isVsCodeHost()) {
		await navigator.clipboard.writeText(text);
		return;
	}
	vscodeApi?.postMessage({ type: "clipboardWrite", text });
}

export function saveHostFile(
	suggestedName: string,
	mimeType: string,
	content: string,
	encoding: "utf8" | "data-url" = "utf8",
): boolean {
	if (!isVsCodeHost()) return false;
	vscodeApi?.postMessage({
		type: "exportFile",
		suggestedName,
		mimeType,
		content,
		encoding,
	});
	return true;
}

export function createImportedDocument(name: string, algorithm: unknown[]): void {
	vscodeApi?.postMessage({ type: "createImportedDocument", name, algorithm });
}

export function openExternal(href: string): void {
	if (isVsCodeHost()) vscodeApi?.postMessage({ type: "openExternal", href });
	else window.open(href, "_blank", "noopener,noreferrer");
}

export function getBuiltInLibrary(): LibraryCategory[] {
	return library;
}

export function getCustomLibrary(): unknown[] {
	return customLibrary;
}

export function updateCustomLibrary(value: unknown[]): void {
	customLibrary = value;
	if (isVsCodeHost()) vscodeApi?.postMessage({ type: "customLibrary", value });
}

export function reportHostError(message: string): void {
	vscodeApi?.postMessage({ type: "error", message });
}

export interface EditorRuntimeConfig {
	initialAlgorithm: unknown | null;
	title: string | null;
	hostKind: EditorHostKind;
	isExam: boolean;
	prettifyInitialAlgorithm: boolean;
}

export type EditorHostKind = "web" | "electron" | "vscode";

const defaultConfig: EditorRuntimeConfig = {
	initialAlgorithm: null,
	title: null,
	hostKind: "web",
	isExam: false,
	prettifyInitialAlgorithm: false,
};

export function readRuntimeConfig(): EditorRuntimeConfig {
	const element = document.querySelector<HTMLScriptElement>(
		"#algoforge-runtime-config",
	);
	if (!element?.textContent) return defaultConfig;

	try {
		const value: unknown = JSON.parse(element.textContent);
		if (!isRuntimeConfig(value)) {
			console.error("Ignoring an invalid AlgoForge runtime configuration.");
			return defaultConfig;
		}
		return value;
	} catch (error) {
		console.error("Unable to parse the AlgoForge runtime configuration.", error);
		return defaultConfig;
	}
}

function isRuntimeConfig(value: unknown): value is EditorRuntimeConfig {
	if (typeof value !== "object" || value === null) return false;
	const config = value as Record<string, unknown>;
	return (
		(config.title === null || typeof config.title === "string") &&
		(config.hostKind === "web" ||
			config.hostKind === "electron" ||
			config.hostKind === "vscode") &&
		typeof config.isExam === "boolean" &&
		typeof config.prettifyInitialAlgorithm === "boolean" &&
		"initialAlgorithm" in config
	);
}

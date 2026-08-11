export interface EditorRuntimeConfig {
	initialAlgorithm: unknown | null;
	title: string | null;
	isElectron: boolean;
	isExam: boolean;
	prettifyInitialAlgorithm: boolean;
}

const defaultConfig: EditorRuntimeConfig = {
	initialAlgorithm: null,
	title: null,
	isElectron: false,
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
		typeof config.isElectron === "boolean" &&
		typeof config.isExam === "boolean" &&
		typeof config.prettifyInitialAlgorithm === "boolean" &&
		"initialAlgorithm" in config
	);
}

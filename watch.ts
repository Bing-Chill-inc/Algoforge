import { watch } from "node:fs";
import { join } from "node:path";
import { buildEditor } from "./build";

const sourceDirectory = join(import.meta.dir, "src");
let buildInProgress = false;
let rebuildRequested = false;
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

async function rebuild(): Promise<void> {
	if (buildInProgress) {
		rebuildRequested = true;
		return;
	}

	buildInProgress = true;
	try {
		await buildEditor({ development: true });
	} catch (error) {
		console.error(error);
	} finally {
		buildInProgress = false;
		if (rebuildRequested) {
			rebuildRequested = false;
			await rebuild();
		}
	}
}

await rebuild();

watch(sourceDirectory, { recursive: true }, () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => void rebuild(), 75);
});

console.log(`Watching ${sourceDirectory} for editor changes.`);

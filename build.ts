import { rename, rm } from "node:fs/promises";
import { basename, join } from "node:path";

const projectRoot = import.meta.dir;
const sourceEntry = join(projectRoot, "src", "index.html");
const outputDirectory = join(projectRoot, "out");
const nextOutputDirectory = join(projectRoot, ".out-next");

export interface EditorBuildOptions {
	development?: boolean;
}

export async function buildEditor({
	development = false,
}: EditorBuildOptions = {}): Promise<void> {
	await rm(nextOutputDirectory, { recursive: true, force: true });

	const result = await Bun.build({
		entrypoints: [sourceEntry],
		compile: true,
		target: "browser",
		outdir: nextOutputDirectory,
		minify: !development,
		sourcemap: development ? "inline" : "none",
	});

	if (!result.success) {
		for (const log of result.logs) console.error(log);
		throw new Error("The editor bundle could not be built.");
	}

	if (
		result.outputs.length !== 1 ||
		basename(result.outputs[0].path) !== "index.html"
	) {
		throw new Error(
			`Expected one index.html output, received: ${result.outputs
				.map((output) => output.path)
				.join(", ")}`,
		);
	}

	const outputSize = result.outputs[0].size;
	await rm(outputDirectory, { recursive: true, force: true });
	await rename(nextOutputDirectory, outputDirectory);

	console.log(
		`Built ${join(outputDirectory, "index.html")} (${outputSize} bytes).`,
	);
}

if (import.meta.main) {
	await buildEditor({ development: process.argv.includes("--development") });
}

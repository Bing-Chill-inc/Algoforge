import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

const projectRoot = import.meta.dir;
const sourceEntry = join(projectRoot, "src", "index.html");

export type EditorBuildTarget = "standalone" | "webview";

export interface EditorBuildOptions {
	development?: boolean;
	target?: EditorBuildTarget;
	outputDirectory?: string;
}

export async function buildEditor({
	development = false,
	target = "standalone",
	outputDirectory = join(projectRoot, "out"),
}: EditorBuildOptions = {}): Promise<void> {
	const nextOutputDirectory = join(
		dirname(outputDirectory),
		`.${basename(outputDirectory)}-next`,
	);
	await rm(nextOutputDirectory, { recursive: true, force: true });

	const result = await Bun.build({
		entrypoints: [sourceEntry],
		compile: target === "standalone",
		target: "browser",
		outdir: nextOutputDirectory,
		minify: !development,
		sourcemap: development ? "inline" : "none",
	});

	if (!result.success) {
		for (const log of result.logs) console.error(log);
		throw new Error("The editor bundle could not be built.");
	}

	const htmlOutput = result.outputs.find(
		(output) => basename(output.path) === "index.html",
	);
	if (!htmlOutput) {
		throw new Error(
			`Expected an index.html output, received: ${result.outputs
				.map((output) => output.path)
				.join(", ")}`,
		);
	}
	if (target === "standalone" && result.outputs.length !== 1) {
		throw new Error(
			`Expected one standalone index.html output, received ${result.outputs.length} outputs.`,
		);
	}

	if (target === "webview") {
		const htmlPath = join(nextOutputDirectory, "index.html");
		const html = await readFile(htmlPath, "utf8");
		await writeFile(
			htmlPath,
			html.replace(
				/\s*<script\s+defer\s+data-domain="algoforge\.fr"\s+src="https:\/\/plausible\.feror\.fr\/js\/script\.js"\s*><\/script>/,
				"",
			),
			"utf8",
		);
	}

	const outputSize = result.outputs.reduce(
		(total, output) => total + output.size,
		0,
	);
	await rm(outputDirectory, { recursive: true, force: true });
	await rename(nextOutputDirectory, outputDirectory);

	console.log(
		`Built ${target} editor in ${outputDirectory} (${outputSize} bytes).`,
	);
}

if (import.meta.main) {
	await buildEditor({
		development: process.argv.includes("--development"),
		target: process.argv.includes("--webview") ? "webview" : "standalone",
	});
}

import { readFileSync } from "fs";
import { join } from "path";
import {
	writeFileSync,
	copyFileSync,
	readdirSync,
	existsSync,
	mkdirSync,
} from "fs";
import { build } from "bun";

const filePath = join(__dirname, "src/index.html");
const fileContent = readFileSync(filePath, "utf-8");

const scriptSrcs: string[] = [];
const scriptTagRegex =
	/<script\s+[^>]*src="(?!https?:\/\/)([^"]+)"[^>]*><\/script>/g;
let match: string[] | null;

while ((match = scriptTagRegex.exec(fileContent)) !== null) {
	scriptSrcs.push(match[1]);
}

console.log(scriptSrcs);

const localScriptSrcs = scriptSrcs.filter((src) => !/^https?:\/\//.test(src));
console.log(localScriptSrcs);
const concatenatedScripts = localScriptSrcs
	.map((src) => readFileSync(join(__dirname, "src", src), "utf-8"))
	.join("\n");

// Create the 'out' directory if it doesn't exist
const outDir = join(__dirname, "out");
if (!existsSync(outDir)) {
	mkdirSync(outDir);
}

// Copy all CSS files to the 'out' directory
const cssFiles = readdirSync(join(__dirname, "src")).filter((file) =>
	file.endsWith(".css"),
);
await Promise.all(
	cssFiles.map(async (cssFile) => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				await build({
					entrypoints: [join(__dirname, "src", cssFile)],
					outdir: outDir,
					minify: true,
					naming: cssFile,
					target: "browser", // default
				});
				resolve();
			} catch (error) {
				console.log(error, "Copying instead");
				copyFileSync(
					join(__dirname, "src", cssFile),
					join(outDir, cssFile),
				);
				resolve();
			}
		});
	}),
);

// Copy the "modales" directory to the 'out' directory
const modalesDir = join(outDir, "modales");
if (!existsSync(modalesDir)) {
	mkdirSync(modalesDir);
}
const modalesFiles = readdirSync(join(__dirname, "src", "modales"));
modalesFiles.forEach((modalesFile) => {
	copyFileSync(
		join(__dirname, "src", "modales", modalesFile),
		join(modalesDir, modalesFile),
	);
});

// Copy 'index.html' to the 'out' directory and update it
const indexPath = join(__dirname, "src/index.html");
let indexContent = readFileSync(indexPath, "utf-8");

// Remove the old script tags
indexContent = indexContent.replace(scriptTagRegex, "");

// Inject the concatenated scripts directly into 'index.html'
indexContent = indexContent.replace(
	"</body>",
	`<script>${concatenatedScripts}</script></body>`,
);

// Replace the style.css link tag with the minified CSS file
indexContent = indexContent.replace(
	'<link rel="stylesheet" href="style.css" />',
	`<style>${readFileSync(join(outDir, "style.css"), "utf-8")}</style>`,
);

// Write the updated 'index.html' to the 'out' directory
const outIndexPath = join(outDir, "index.html");
writeFileSync(outIndexPath, indexContent, "utf-8");

import { readFileSync } from "fs";
import { join } from "path";
import {
	writeFileSync,
	copyFileSync,
	readdirSync,
	existsSync,
	mkdirSync,
} from "fs";

const filePath = join(__dirname, "src/index.html");
const fileContent = readFileSync(filePath, "utf-8");

const scriptSrcs: string[] = [];
const scriptTagRegex = /<script\s+[^>]*src="([^"]+)"[^>]*><\/script>/g;
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

console.log(concatenatedScripts);

// Create the 'out' directory if it doesn't exist
const outDir = join(__dirname, "out");
if (!existsSync(outDir)) {
	mkdirSync(outDir);
}

// // Write the concatenated scripts to 'main.js' in the 'out' directory
// const mainJsPath = join(outDir, "main.js");
// writeFileSync(mainJsPath, concatenatedScripts, "utf-8");

// Copy all CSS files to the 'out' directory
const cssFiles = readdirSync(join(__dirname, "src")).filter((file) =>
	file.endsWith(".css"),
);
cssFiles.forEach((cssFile) => {
	copyFileSync(join(__dirname, "src", cssFile), join(outDir, cssFile));
});

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

// // Add the new script tag for 'main.js'
// indexContent = indexContent.replace(
// 	"</body>",
// 	`<script src="main.js"></script></body>`,
// );

// Write the updated 'index.html' to the 'out' directory
const outIndexPath = join(outDir, "index.html");
writeFileSync(outIndexPath, indexContent, "utf-8");

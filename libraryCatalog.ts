import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
export interface LibraryCategory {
	nom: string;
	nomCourt?: string;
	contenu: Array<{ nom?: string; nomCourt?: string; descriptif?: string; algo?: string; path?: string }>;
}

async function readOptional(path: string): Promise<string> {
	try {
		return await readFile(path, "utf8");
	} catch {
		return "";
	}
}

export async function buildLibraryCatalog(
	libraryRoot = join(import.meta.dir, "src", "Bibliotheque"),
): Promise<LibraryCategory[]> {
	const categories: LibraryCategory[] = [];
	const categoryNames = (await readdir(libraryRoot)).sort((a, b) =>
		a.localeCompare(b),
	);

	for (const categoryName of categoryNames) {
		const categoryPath = join(libraryRoot, categoryName);
		if (!(await stat(categoryPath)).isDirectory()) continue;
		const category: LibraryCategory = {
			nom: await readOptional(join(categoryPath, "nom.txt")),
			nomCourt:
				(await readOptional(join(categoryPath, "nomCourt.txt"))) ||
				(await readOptional(join(categoryPath, "noCourt.txt"))),
			contenu: [],
		};

		const entryNames = (await readdir(categoryPath)).sort((a, b) =>
			a.localeCompare(b),
		);
		for (const entryName of entryNames) {
			const entryPath = join(categoryPath, entryName);
			if (!(await stat(entryPath)).isDirectory()) continue;
			category.contenu.push({
				nom: (await readOptional(join(entryPath, "nom.txt"))) || entryName,
				nomCourt: await readOptional(join(entryPath, "nomCourt.txt")),
				descriptif: await readOptional(join(entryPath, "descriptif.html")),
				algo: await readOptional(join(entryPath, "algo.json")),
				path: relative(libraryRoot, entryPath),
			});
		}
		categories.push(category);
	}
	return categories;
}

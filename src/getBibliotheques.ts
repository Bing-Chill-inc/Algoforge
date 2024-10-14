import type RouteHandler from "./types/RouteHandler";
import fs from "fs";
import path from "path";
import { URL } from "url";

const lireContenuFichier = (chemin: string) => {
	return fs.existsSync(chemin) ? fs.readFileSync(chemin, "utf8") : "";
};

const explorerDossier = (dossier: string) => {
	const resultat: Array<{
		nom: string;
		contenu: {
			nom?: string;
			descriptif?: string;
			algo?: string;
			path?: string;
		}[];
	}> = [];
	const sousDossiers = fs.readdirSync(dossier).filter((nom) => {
		const cheminComplet = path.join(dossier, nom);
		return fs.statSync(cheminComplet).isDirectory();
	});

	sousDossiers.forEach((nomDossier) => {
		const cheminDossier = path.join(dossier, nomDossier);
		const structureDossier = {
			nom: lireContenuFichier(path.join(cheminDossier, "nom.txt")),
			contenu: [],
		} as {
			nom: string;
			contenu: {
				nom?: string;
				descriptif?: string;
				algo?: string;
				path?: string;
			}[];
		};

		const fichiers = fs.readdirSync(cheminDossier);
		fichiers.forEach((nomFichier) => {
			const cheminComplet = path.join(cheminDossier, nomFichier);
			if (fs.statSync(cheminComplet).isDirectory()) {
				const structureFichier = {
					nom: lireContenuFichier(path.join(cheminComplet, "nom.txt")) || nomFichier,
					descriptif: lireContenuFichier(path.join(cheminComplet, "descriptif.html")) || "",
					algo: lireContenuFichier(path.join(cheminComplet, "algo.json")) || "",
					path: cheminComplet.substring(dossier.length + 1),
				};
				structureDossier.contenu.push(structureFichier);
			}
		});

		resultat.push(structureDossier);
	});

	return resultat;
};

const routeHandler: RouteHandler = {
	route: "/Bibliotheque/getStructure",
	callback: (req, res) => {
		// Replace this with the actual path to the root of your library
		const cheminBibliotheque = path.join(__dirname, "public/edit/Bibliotheque");
		const arborescence = explorerDossier(cheminBibliotheque);

		res.setHeader("Content-Type", "application/json");
		res.send(JSON.stringify(arborescence, null, 2));
	},
};

const iconHandler: RouteHandler = {
	route: "/edit/Bibliotheque/**/**/icone.svg",
	callback: (req, res) => {
		const cheminIcone = path.join(__dirname, "public", new URL(req.url, "http://localhost").pathname);

		let fileContent = lireContenuFichier(cheminIcone);

		// On remplace les instances de "#<?php echo $_GET[<<nom>>] ?>" par la valeur de la variable correspondante
		const regex = /<\?php echo \$_GET\[[^\]]+\] \?>/g;

		const matches = fileContent.match(regex);

		console.log(matches);
		console.log(req.query);

		if (matches) {
			matches.forEach((match: string) => {
				try {
					const variableRegex = /\$_GET\['([^\]]+)'\]/g;
					const variableObj = variableRegex.exec(match);
					console.log(variableObj);
					const variable = variableObj![1];
					const valeur = req.query[variable];
					console.log(variable, valeur);
					fileContent = fileContent.replace(match, valeur);
				} catch (e) {
					console.error(e);
				}
			});
		}

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(fileContent);
	},
};

export default routeHandler;

export { iconHandler };

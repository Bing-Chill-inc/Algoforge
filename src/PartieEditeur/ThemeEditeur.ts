import { resolveDynamicAssetUrl } from "../runtime/dynamicAssets";
import { editeur, isExam } from "../runtime/runtime";

/**
 * @classdesc Classe ThemeEditeur, représente un thème pour l'éditeur.
 * @description Crée une instance de ThemeEditeur.
 * @class ThemeEditeur
 * @extends {HTMLOptionElement}
 */
export class ThemeEditeur extends HTMLOptionElement {
	nom;
	bgColor;
	bgColorSecondary;
	borderColor;
	fgColor;
	fgColorSemiTransparent;
	fgColorTransparent;
	fgColorForward;
	goodColor;
	goodColorTransparent;
	errorColor;
	warningColor;
	titleColor;
	fontFamily;
	glowColor;
	baseGlowColor;

	_logoAlgoForge = document.querySelector("#logoAlgoForge");

	_editeur = editeur; // Editeur
borderColor2: any;
bgColorTertiary: any;
fgColorHover: any;
fgColorDisabled: any;

	/**
	 * @constructor
	 * @param {string} nom - Le nom du thème.
	 * @param {string} bgColor - La couleur de fond principale.
	 * @param {string} bgColorSecondary - La couleur de fond secondaire.
	 * @param {string} borderColor - La couleur de la bordure.
	 * @param {string} fgColor - La couleur de premier plan.
	 * @param {string} fgColorSemiTransparent - La couleur de premier plan semi-transparente.
	 * @param {string} fgColorTransparent - La couleur de premier plan transparente.
	 * @param {string} fgColorForward - La couleur de premier plan avancée.
	 * @param {string} goodColor - La couleur pour les éléments corrects.
	 * @param {string} goodColorTransparent - La couleur transparente pour les éléments corrects.
	 * @param {string} errorColor - La couleur pour les erreurs.
	 * @param {string} warningColor - La couleur pour les avertissements.
	 * @param {string} titleColor - La couleur des titres.
	 * @param {string} fontFamily - La famille de polices.
	 * @param {string} glowColor - La couleur de l'effet de lueur.
	 * @param {string} borderColor2 - La deuxième couleur de bordure.
	 * @param {string} bgColorTertiary - La couleur de fond tertiaire.
	 * @param {string} fgColorHover - La couleur de premier plan au survol.
	 * @param {string} fgColorDisabled - La couleur de premier plan désactivée.
	 * @param {number} baseGlowColor - La couleur de base de l'effet de lueur.
	 */
	constructor(
		nom: any,
		bgColor: any,
		bgColorSecondary: any,
		borderColor: any,
		fgColor: any,
		fgColorSemiTransparent: any,
		fgColorTransparent: any,
		fgColorForward: any,
		goodColor: any,
		goodColorTransparent: any,
		errorColor: any,
		warningColor: any,
		titleColor: any,
		fontFamily: any,
		glowColor: string,
		borderColor2: any,
		bgColorTertiary: any,
		fgColorHover: any,
		fgColorDisabled: any,
		baseGlowColor: any,
	) {
		super();
		this.nom = nom;
		this.bgColor = bgColor;
		this.bgColorSecondary = bgColorSecondary;
		this.borderColor = borderColor;
		this.fgColor = fgColor;
		this.fgColorSemiTransparent = fgColorSemiTransparent;
		this.fgColorTransparent = fgColorTransparent;
		this.fgColorForward = fgColorForward;
		this.goodColor = goodColor;
		this.goodColorTransparent = goodColorTransparent;
		this.errorColor = errorColor;
		this.warningColor = warningColor;
		this.titleColor = titleColor;
		this.fontFamily = fontFamily;
		this.glowColor = glowColor || "#00000000";
		this.borderColor2 = borderColor2;
		this.bgColorTertiary = bgColorTertiary;
		this.fgColorHover = fgColorHover;
		this.fgColorDisabled = fgColorDisabled;
		this.baseGlowColor = baseGlowColor;

		this.innerText = this.nom;
	}

	/**
	 * Applique le thème à l'éditeur.
	 */
	appliquer() {
		if (this.nom === "VS Code") this.#resolveVsCodePalette();
		document.body.style.setProperty("--bgColor", this.bgColor);
		document.body.style.setProperty(
			"--bgColorSecondary",
			this.bgColorSecondary,
		);
		document.body.style.setProperty("--borderColor", this.borderColor);
		document.body.style.setProperty("--fgColor", this.fgColor);
		document.body.style.setProperty(
			"--fgColorSemiTransparent",
			this.fgColorSemiTransparent,
		);
		document.body.style.setProperty(
			"--fgColorTransparent",
			this.fgColorTransparent,
		);
		document.body.style.setProperty(
			"--fgColorForward",
			this.fgColorForward,
		);
		document.body.style.setProperty("--goodColor", this.goodColor);
		document.body.style.setProperty(
			"--goodColorTransparent",
			this.goodColorTransparent,
		);
		document.body.style.setProperty("--errorColor", this.errorColor);
		document.body.style.setProperty("--warningColor", this.warningColor);
		document.body.style.setProperty("--titleColor", this.titleColor);
		document.body.style.setProperty("--glowColor", this.glowColor);
		document.body.style.setProperty("--baseGlowColor", this.baseGlowColor);
		document.body.style.setProperty("--borderColor2", this.borderColor2);
		document.body.style.setProperty(
			"--bgColorTertiary",
			this.bgColorTertiary,
		);
		document.body.style.setProperty("--fgColorHover", this.fgColorHover);
		document.body.style.setProperty(
			"--fgColorDisabled",
			this.fgColorDisabled,
		);
		document.body.style.fontFamily = this.fontFamily;

		const asset = resolveDynamicAssetUrl;
		const cssAsset = (value: string) => "url(\"" + asset(value) + "\")";
		const fg = this.fgColor.substring(1);
		const bg = this.bgColor.substring(1);
		const rootStyle = document.body.style;
		rootStyle.setProperty(
			"--assetBibliotheque",
			cssAsset(`assetsDynamiques/BibliothequeAlgo.svg?fgColor=${fg}`),
		);
		rootStyle.setProperty(
			"--assetBoucle",
			cssAsset(`assetsDynamiques/boucle.svg?fgColor=${fg}&bgColor=${bg}`),
		);
		rootStyle.setProperty(
			"--assetConditionSortie",
			cssAsset(`assetsDynamiques/conditionSortie.svg?fgColor=${fg}`),
		);
		rootStyle.setProperty(
			"--assetDictionnaire",
			cssAsset(`assetsDynamiques/DictionnaireDonnees.svg?fgColor=${fg}`),
		);
		rootStyle.setProperty(
			"--assetErreurs",
			cssAsset(`assetsDynamiques/erreurs.svg?fgColor=${fg}`),
		);

		const setSvgSource = (selector: string, value: string) => {
			const element = document.querySelector<SVGElement>(selector);
			if (element) element.dataset.assetUrl = value;
		};
		setSvgSource("#dico_btn > svg", `assetsDynamiques/DictionnaireDonnees.svg?fgColor=${fg}`);
		if (!isExam) {
			setSvgSource("#biblio_btn > svg", `assetsDynamiques/BibliothequeAlgo.svg?fgColor=${fg}`);
		}
		setSvgSource("#boutonPointeur", `assetsDynamiques/mini/pointeur.svg?fgColor=${fg}&bgColor=${bg}`);
		setSvgSource("#boutonProbleme", `assetsDynamiques/mini/probleme.svg?fgColor=${fg}`);
		setSvgSource("#boutonProcedure", `assetsDynamiques/mini/procedure.svg?fgColor=${fg}`);
		setSvgSource("#boutonStructureSi", `assetsDynamiques/mini/structureSi.svg?fgColor=${fg}`);
		setSvgSource("#boutonStructureSwitch", `assetsDynamiques/mini/structureSwitch.svg?fgColor=${fg}`);
		setSvgSource("#boutonStructureIterative", `assetsDynamiques/mini/structureIterative.svg?fgColor=${fg}&bgColor=${bg}`);
		setSvgSource("#boutonConditionSortie", `assetsDynamiques/mini/conditionSortie.svg?fgColor=${fg}`);
		setSvgSource("#boutonLien", `assetsDynamiques/mini/lien.svg?fgColor=${fg}`);
		setSvgSource("#boutonStructureIterativeBornee", `assetsDynamiques/mini/structureIterativeBornee.svg?fgColor=${fg}&bgColor=${bg}`);
		setSvgSource("#boutonUndo", `assetsDynamiques/mini/undo.svg?fgColor=${fg}`);
		setSvgSource("#boutonRedo", `assetsDynamiques/mini/redo.svg?fgColor=${fg}`);
		this._logoAlgoForge!.src = asset(
			`assetsDynamiques/${isExam ? "AlgoForgeExamEdition" : "AlgoForge"}.svg?fgColor=${fg}`,
		);

		this._editeur._bibliotheque.update();

		this._editeur.setCookie("theme", this.nom, 365);

		this._editeur.selectTool(this._editeur._currentTool);
	}

	#resolveVsCodePalette() {
		const color = (name: string, fallback: string) =>
			normalizeColor(
				getComputedStyle(document.documentElement).getPropertyValue(name),
				fallback,
			);
		this.bgColor = color("--vscode-editor-background", "#1e1e1e");
		this.bgColorSecondary = color("--vscode-sideBar-background", this.bgColor);
		this.borderColor = color("--vscode-panel-border", "#3c3c3c");
		this.fgColor = color("--vscode-editor-foreground", "#cccccc");
		this.fgColorSemiTransparent = `${this.fgColor}55`;
		this.fgColorTransparent = `${this.fgColor}11`;
		this.fgColorForward = color(
			"--vscode-descriptionForeground",
			this.fgColor,
		);
		this.goodColor = color("--vscode-testing-iconPassed", "#89d185");
		this.goodColorTransparent = `${this.goodColor}99`;
		this.errorColor = color("--vscode-editorError-foreground", "#f48771");
		this.warningColor = color(
			"--vscode-editorWarning-foreground",
			"#cca700",
		);
		this.titleColor = color("--vscode-textLink-foreground", "#3794ff");
		this.borderColor2 = color("--vscode-focusBorder", this.borderColor);
		this.bgColorTertiary = color(
			"--vscode-editorWidget-background",
			this.bgColorSecondary,
		);
		this.fgColorHover = color(
			"--vscode-list-hoverForeground",
			this.fgColor,
		);
		this.fgColorDisabled = color(
			"--vscode-disabledForeground",
			this.fgColorForward,
		);
		this.fontFamily = "var(--vscode-font-family, sans-serif)";
	}
}

function normalizeColor(value: string, fallback: string): string {
	const trimmed = value.trim();
	const shortHex = /^#([0-9a-f]{3})$/i.exec(trimmed);
	if (shortHex) {
		return `#${[...shortHex[1]].map((digit) => digit + digit).join("")}`;
	}
	if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed;
	const rgb = /^rgba?\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)/i.exec(trimmed);
	if (!rgb) return fallback;
	return `#${rgb
		.slice(1, 4)
		.map((part) => Math.min(255, Number(part)).toString(16).padStart(2, "0"))
		.join("")}`;
}

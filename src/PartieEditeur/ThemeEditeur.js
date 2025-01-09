class ThemeEditeur extends HTMLOptionElement {
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

	_editeur = document.querySelector("editeur-interface"); // Editeur

	constructor(
		nom,
		bgColor,
		bgColorSecondary,
		borderColor,
		fgColor,
		fgColorSemiTransparent,
		fgColorTransparent,
		fgColorForward,
		goodColor,
		goodColorTransparent,
		errorColor,
		warningColor,
		titleColor,
		fontFamily,
		glowColor,
		borderColor2,
		bgColorTertiary,
		fgColorHover,
		fgColorDisabled,
		baseGlowColor,
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

	appliquer() {
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

		const sheet = document.styleSheets[0];

		let ruleToEdit;
		const ruleSelectorBibliotheque = "bibliotheque-algorithmique > div.img";
		const ruleSelectorBoucle =
			"structure-iterative-non-bornee-element > div.boucleSVG";
		const ruleSelectorBoucle2 =
			"structure-iterative-bornee-element > div.boucleSVG";
		const ruleSelectorSortie = "condition-sortie-element";
		const ruleSelectorDico = "dictionnaire-donnee > div.img";
		const ruleSelectorErreur = "affichage-erreur-element > div.img";
		const ruleSelectorMenuCompte = "menu-compte-element > div.img";

		for (let i = 0; i < sheet.cssRules.length; i++) {
			if (sheet.cssRules[i].selectorText === ruleSelectorBibliotheque) {
				ruleToEdit = sheet.cssRules[i];
				ruleToEdit.style.backgroundImage = `url(assetsDynamiques/BibliothequeAlgo.svg?fgColor=${this.fgColor.substring(
					1,
				)})`;
			}
			if (sheet.cssRules[i].selectorText === ruleSelectorBoucle) {
				ruleToEdit = sheet.cssRules[i];
				ruleToEdit.style.backgroundImage = `url(assetsDynamiques/boucle.svg?fgColor=${this.fgColor.substring(
					1,
				)}&bgColor=${this.bgColor.substring(1)}`;
			}
			if (sheet.cssRules[i].selectorText === ruleSelectorBoucle2) {
				ruleToEdit = sheet.cssRules[i];
				ruleToEdit.style.backgroundImage = `url(assetsDynamiques/boucle.svg?fgColor=${this.fgColor.substring(
					1,
				)}&bgColor=${this.bgColor.substring(1)}`;
			}
			if (sheet.cssRules[i].selectorText === ruleSelectorSortie) {
				ruleToEdit = sheet.cssRules[i];
				ruleToEdit.style.backgroundImage = `url(assetsDynamiques/conditionSortie.svg?fgColor=${this.fgColor.substring(
					1,
				)})`;
			}
			if (sheet.cssRules[i].selectorText === ruleSelectorDico) {
				ruleToEdit = sheet.cssRules[i];
				ruleToEdit.style.backgroundImage = `url(assetsDynamiques/DictionnaireDonnees.svg?fgColor=${this.fgColor.substring(
					1,
				)})`;
			}
			if (sheet.cssRules[i].selectorText === ruleSelectorErreur) {
				ruleToEdit = sheet.cssRules[i];
				ruleToEdit.style.backgroundImage = `url(assetsDynamiques/erreurs.svg?fgColor=${this.fgColor.substring(
					1,
				)})`;
			}
			if (sheet.cssRules[i].selectorText === ruleSelectorMenuCompte) {
				ruleToEdit = sheet.cssRules[i];
				ruleToEdit.style.backgroundImage = `url(assetsDynamiques/erreurs.svg?fgColor=${this.fgColor.substring(
					1,
				)})`;
			}
		}

		document.querySelector(
			"#dico_btn > svg",
		).src = `assetsDynamiques/DictionnaireDonnees.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		document.querySelector(
			"#biblio_btn > svg",
		).src = `assetsDynamiques/BibliothequeAlgo.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		document.querySelector(
			"#boutonPointeur",
		).src = `assetsDynamiques/mini/pointeur.svg?fgColor=${this.fgColor.substring(
			1,
		)}&bgColor=${this.bgColor.substring(1)}`;

		document.querySelector(
			"#boutonProbleme",
		).src = `assetsDynamiques/mini/probleme.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		document.querySelector(
			"#boutonProcedure",
		).src = `assetsDynamiques/mini/procedure.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		document.querySelector(
			"#boutonStructureSi",
		).src = `assetsDynamiques/mini/structureSi.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		document.querySelector(
			"#boutonStructureSwitch",
		).src = `assetsDynamiques/mini/structureSwitch.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		document.querySelector(
			"#boutonStructureIterative",
		).src = `assetsDynamiques/mini/structureIterative.svg?fgColor=${this.fgColor.substring(
			1,
		)}&bgColor=${this.bgColor.substring(1)}`;

		document.querySelector(
			"#boutonConditionSortie",
		).src = `assetsDynamiques/mini/conditionSortie.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		document.querySelector(
			"#boutonLien",
		).src = `assetsDynamiques/mini/lien.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		document.querySelector(
			"#boutonStructureIterativeBornee",
		).src = `assetsDynamiques/mini/structureIterativeBornee.svg?fgColor=${this.fgColor.substring(
			1,
		)}&bgColor=${this.bgColor.substring(1)}`;

		document.querySelector(
			"#boutonUndo",
		).src = `assetsDynamiques/mini/undo.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		document.querySelector(
			"#boutonRedo",
		).src = `assetsDynamiques/mini/redo.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		this._logoAlgoForge.src = `assetsDynamiques/AlgoForge.svg?fgColor=${this.fgColor.substring(
			1,
		)}`;

		this._editeur._bibliotheque.update();

		this._editeur.setCookie("theme", this.nom, 365);

		this._editeur.selectTool(this._editeur._currentTool);
	}
}
window.customElements.define("theme-editeur", ThemeEditeur, {
	extends: "option",
});

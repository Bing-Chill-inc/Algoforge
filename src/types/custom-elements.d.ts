import type { DictionnaireDonnee } from "../PartieEditeur/DictionnaireDonnee";
import type { AffichageErreur } from "../PartieErreur/AffichageErreur";
import type { PlanTravail } from "../PartieEditeur/PlanTravail";
import type { SousPlanTravail } from "../PartieEditeur/SousPlanTravail";
import type { Probleme } from "../PartieEditeur/Probleme";
import type { InviteBornesPourSI } from "../PartieEditeur/InviteBornesPourSI";
import type { ConditionSortie } from "../PartieEditeur/ConditionSortie";
import type { Procedure } from "../PartieEditeur/Procedure";
import type { Condition } from "../PartieEditeur/Condition";
import type { StructureSi } from "../PartieEditeur/StructureSi";
import type { StructureSwitch } from "../PartieEditeur/StructureSwitch";
import type { StructureIterativeBornee } from "../PartieEditeur/StructureIterativeBornee";
import type { StructureIterativeNonBornee } from "../PartieEditeur/StructureIterativeNonBornee";
import type { Ligne } from "../PartieEditeur/Ligne";
import type { SymboleDecomposition } from "../PartieEditeur/SymboleDecomposition";
import type { Selection } from "../PartieEditeur/Selection";
import type { RepresentationSelectionSimple } from "../PartieEditeur/RepresentationSelectionSimple";
import type { SelectionRectangle } from "../PartieEditeur/SelectionRectangle";
import type { MenuDeroulant } from "../PartieEditeur/MenuDeroulant";
import type { ElementMenu } from "../PartieEditeur/ElementMenu";
import type { ElementMenuCompose } from "../PartieEditeur/ElementMenuCompose";
import type { ElementMenuKeyboardTip } from "../PartieEditeur/ElementMenuKeyboardTip";
import type { ThemeEditeur } from "../PartieEditeur/ThemeEditeur";
import type { IndicateurZoom } from "../PartieEditeur/IndicateurZoom";
import type { MenuContextuel } from "../PartieEditeur/MenuContextuel";
import type { Bibliotheque } from "../PartieEditeur/Bilbiotheque";
import type { InviteNouvelleBibliotheque } from "../PartieEditeur/InviteNouvelleBibliotheque";
import type { FenetreModale } from "../PartieEditeur/FenetreModale";
import type { MenuCompte } from "../PartieEditeur/MenuCompte";
import type { Editeur } from "../PartieEditeur/Editeur";

declare global {
	interface HTMLElementTagNameMap {
		"dictionnaire-donnee": DictionnaireDonnee;
		"affichage-erreur-element": AffichageErreur;
		"plan-travail": PlanTravail;
		"sous-plan-travail": SousPlanTravail;
		"probleme-element": Probleme;
		"invite-bornes-pour-si": InviteBornesPourSI;
		"condition-sortie-element": ConditionSortie;
		"procedure-element": Procedure;
		"condition-element": Condition;
		"structure-si-element": StructureSi;
		"structure-switch-element": StructureSwitch;
		"structure-iterative-bornee-element": StructureIterativeBornee;
		"structure-iterative-non-bornee-element": StructureIterativeNonBornee;
		"ligne-element": Ligne;
		"symbole-decomposition-element": SymboleDecomposition;
		"selection-editeur": Selection;
		"selection-simple": RepresentationSelectionSimple;
		"selection-rectangle": SelectionRectangle;
		"menu-deroulant": MenuDeroulant;
		"element-menu": ElementMenu;
		"element-menu-compose": ElementMenuCompose;
		"element-menu-keyboard-tip": ElementMenuKeyboardTip;
		"theme-editeur": ThemeEditeur;
		"indicateur-zoom": IndicateurZoom;
		"menu-contextuel": MenuContextuel;
		"bibliotheque-algorithmique": Bibliotheque;
		"invite-nouvelle-bibliotheque": InviteNouvelleBibliotheque;
		"fenetre-modale": FenetreModale;
		"menu-compte-element": MenuCompte;
		"editeur-interface": Editeur;
	}
}

export {};

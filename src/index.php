<!DOCTYPE html>
<html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AlgoForge</title>
        <link rel="stylesheet" href="style.css">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
            rel="stylesheet">
    </head>

    <body>
        <editeur-interface>
            <header>
                <img alt="Logo AlgoForge" id="logoAlgoForge">
                <div class="titreEtMenu">
                    <h1><span contenteditable="true" id="titreAlgo">Titre de l'algorithme</span><span class="crayon">
                            ✎</span></h1>
                    <div class="menuButtons">
                        <button>
                            <span>Fichier</span>
                            <menu-deroulant id="menuDeroulantFichier">

                            </menu-deroulant>
                        </button>
                        <button>
                            <span>Édition</span>
                            <menu-deroulant id="menuDeroulantEdition">

                            </menu-deroulant>
                        </button>
                        <button>
                            <span>Aide</span>
                            <menu-deroulant id="menuDeroulantAide">

                            </menu-deroulant>
                        </button>
                    </div>
                </div>
                <div class="zonePartage">
                    <button class="partage">Partager</button>
                </div>
                <affichage-erreur-element>
                </affichage-erreur-element>
                <select id="theme">

                </select>
            </header>
            <div class="barreOutilsHorizontale">
                <img src="assets/mini/pointeur.svg" id="boutonPointeur" class="selected" title="Sélectionner">
                <img src="assets/mini/probleme.svg" id="boutonProbleme" title="Créer un Problème">
                <img src="assets/mini/procedure.svg" id="boutonProcedure" title="Créer une Procédure">
                <img src="assets/mini/structureSi.svg" id="boutonStructureSi" title="Créer un 'SI'">
                <img src="assets/mini/structureSwitch.svg" id="boutonStructureSwitch" title="Créer un 'SWITCH'">
                <img src="assets/mini/structureIterative.svg" id="boutonStructureIterative"
                    title="Créer une Structure Itérative">
                <img src="assets/mini/structureIterativeBornee.svg" id="boutonStructureIterativeBornee" title="Créer une
                    Structure Itérative Bornee">
                <img src="assetsDynamiques/mini/conditionSortie.php" id="boutonConditionSortie"
                    title="Créer une action d'arrêt">
                <img src="assets/mini/lien.svg" id="boutonLien" title="Lier des éléments">
                <div class="undoRedo">
                    <img src="assets/mini/undo.svg" id="boutonUndo" title="Annuler">
                    <img src="assets/mini/redo.svg" id="boutonRedo" title="Refaire">
                </div>
            </div>
            <plan-travail id="espacePrincipal">

            </plan-travail>
        </editeur-interface>
        <form id="transferForm" method="post" target="_blank">
            <input type="hidden" name="corpAlgo" id="corpAlgo">
            <input type="hidden" name="nomFichier" id="nomFichier">
        </form>
    </body>
    <!-- Externes -->
    <script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
    <!-- Pour la lecture et l'écriture de fichiers Excel -->

    <!-- Dictionnaire des données-->
    <script src="PartieEditeur/Type.js"></script>
    <script src="PartieEditeur/Information.js"></script>
    <script src="PartieEditeur/DictionnaireDonnee.js"></script>

    <!--Gestion des anomalies conceptuelles-->
    <script src="PartieErreur/AnomalieConceptuelle.js"></script>
    <script src="PartieErreur/ErreurConceptuelle.js"></script>
    <script src="PartieErreur/AvertissementConceptuel.js"></script>
    <script src="PartieErreur/AvertissementDonneeDynamiquementTypee.js"></script>
    <script src="PartieErreur/AvertissementInformationsInconsistantesSi.js"></script>
    <script src="PartieErreur/AvertissementPlanTropGrand.js"></script>
    <script src="PartieErreur/AvertissementSProblemeJamaisExecute.js"></script>
    <script src="PartieErreur/AvertissementStructureInoptimale.js"></script>
    <script src="PartieErreur/AvertissementTropDeSousElements.js"></script>
    <script src="PartieErreur/ErreurArretHorsIteratif.js"></script>
    <script src="PartieErreur/ErreurArretIteratifBornee.js"></script>
    <script src="PartieErreur/ErreurBoucleBorneeSansFin.js"></script>
    <script src="PartieErreur/ErreurBoucleSansSortie.js"></script>
    <script src="PartieErreur/ErreurComparaisonSwitch.js"></script>
    <script src="PartieErreur/ErreurDonneeInutilisee.js"></script>
    <script src="PartieErreur/ErreurDonneeMagique.js"></script>
    <script src="PartieErreur/ErreurResultatInutilisee.js"></script>
    <script src="PartieErreur/ErreurSyntaxeAssignation.js"></script>
    <script src="PartieErreur/ErreurSyntaxeComparaison.js"></script>
    <script src="PartieErreur/ErreurTypesInconsistantsAlternatif.js"></script>
    <script src="PartieErreur/ErreurVariableMagique.js"></script>
    <script src="PartieErreur/AffichageErreur.js"></script>

    <!--Éléments utilisés par l'éditeur-->
    <script src="PartieEditeur/PlanTravail.js"></script>
    <script src="PartieEditeur/SousPlanTravail.js"></script>
    <script src="PartieEditeur/ElementGraphique.js"></script>
    <script src="PartieEditeur/Probleme.js"></script>
    <script src="PartieEditeur/StructureAlternative.js"></script>
    <script src="PartieEditeur/StructureIterative.js"></script>
    <script src="PartieEditeur/InviteBornesPourSI.js"></script>
    <script src="PartieEditeur/ConditionSortie.js"></script>
    <script src="PartieEditeur/Procedure.js"></script>
    <script src="PartieEditeur/Condition.js"></script>
    <script src="PartieEditeur/StructureSi.js"></script>
    <script src="PartieEditeur/StructureSwitch.js"></script>
    <script src="PartieEditeur/StructureIterativeBornee.js"></script>
    <script src="PartieEditeur/StructureIterativeNonBornee.js"></script>
    <script src="PartieEditeur/ElementParent.js"></script>
    <script src="PartieEditeur/Ligne.js"></script>
    <script src="PartieEditeur/Lien.js"></script>
    <script src="PartieEditeur/LienDroit.js"></script>
    <script src="PartieEditeur/LienCompositionProbleme.js"></script>
    <script src="PartieEditeur/LienTriple.js"></script>
    <script src="PartieEditeur/SymboleDecomposition.js"></script>

    <script src="PartieEditeur/Selection.js"></script>
    <script src="PartieEditeur/RepresentationSelectionSimple.js"></script>
    <script src="PartieEditeur/SelectionRectangle.js"></script>

    <script src="PartieEditeur/MenuDeroulant.js"></script>
    <script src="PartieEditeur/ElementMenu.js"></script>
    <script src="PartieEditeur/ElementMenuCompose.js"></script>
    <script src="PartieEditeur/ElementMenuKeyboardTip.js"></script>

    <script src="PartieEditeur/ThemeEditeur.js"></script>
    <script src="PartieEditeur/IndicateurZoom.js"></script>
    <script src="PartieEditeur/MenuContextuel.js"></script>
    <script src="PartieEditeur/Bilbiotheque.js"></script>
    <script src="PartieEditeur/InviteNouvelleBibliotheque.js"></script>

    <!--Gestion des évenement de l'éditeur-->
    <script src="PartieEditeur/EvenementEdition/EvenementEdition.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementCreationElement.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementSuppressionElement.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementLiaison.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementSuppressionLiaison.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementDeplacementElement.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementDeplacementElementMultiples.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementDeplacementCondition.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementEditionTexte.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementEditionLibelleProbleme.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementEditionDonneesProbleme.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementEditionResultatsProbleme.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementEditionLibelleCondition.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementEditionExpressionSwitch.js"></script>
    <script src="PartieEditeur/EvenementEdition/EvenementEditionStructureIterative.js"></script>

    <script src="PartieEditeur/Editeur.js"></script>
    <script>
        const editeur = document.querySelector("editeur-interface");
        const verbose = false;
        let titreAlgo = document.getElementById("titreAlgo");

        <?php
        if (isset($_POST['corpAlgo'])) {
            echo 'editeur._espacePrincipal.chargerDepuisJSON(JSON.parse(' . $_POST['corpAlgo'] . '));';
        }

        if (isset($_POST['nomFichier'])) {
            echo "titreAlgo.innerText = '" . addslashes($_POST['nomFichier']) . "';";
            echo "document.title = 'Algoforge - ' + titreAlgo.innerText;";
        }
        ?>
    </script>

</html>
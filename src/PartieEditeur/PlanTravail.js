/**
 * @classdesc Le plan de travail pour éditer les algorithmes
 * @description Crée une instance de PlanTravail.
 * @class PlanTravail
 * @extends {HTMLElement}
 */
class PlanTravail extends HTMLElement {
    // ATTRIBUTS -non-
    leDictionnaireDesDonnees = new DictionnaireDonnee(); // Dictionnaire de donnée
    // CONSTRUCTEUR
    /**
     * @constructor
     */
    constructor() {
        super();
        // this.addEventListener("paste", (event) => {
        //     event.preventDefault();
        //     let texte = event.clipboardData.getData("text/plain");
        //     this.chargerFichier(texte);
        // });

        this.addEventListener('dragover', (event) => {
            event.preventDefault(); // Necessary to allow a drop
        });

        this.addEventListener('drop', (event) => {
            event.preventDefault();
        
            // Get the id of the dragged element
            const data = event.dataTransfer.getData('text/plain');
            if (verbose) console.log('Dropped:', data);
        
            // Get the X and Y coordinates
            const x = event.layerX;
            const y = event.layerY;
        
            if (verbose) console.log('Dropped at coordinates:', x, y);
            if (verbose) console.log('eval(data) = ' + eval(data));
            this.ajouterElement(eval(data), x, y, false);
        });
    }

    // ENCAPSULATION -non-

    // METHODES
    /**
     * @description Retourne le premier Problème du plant de travail
     *
     * @type {Probleme}
     * @returns {Probleme} Le premier problème du plan de travail
     */
    getProblemePrincipal() {
        return this.children[0];
    }
    
    /**
     * Recherche les erreurs dans le plan de travail<br>
     * 
     * Liste des erreurs :<br>
     * 
     * 13 : Algorithme trop grand 
     *
     * @returns {Array<AnomalieConceptuelle>} La liste des problèmes de plan de travail (actuellement qu'une erreur)
     */
    rechercherAnomalies() {
        let listeAnomalies = [];
        if(AvertissementPlanTropGrand.detecterAnomalie(this)) {
            listeAnomalies.push(new AvertissementPlanTropGrand(this));
        }
        listeAnomalies = [...listeAnomalies, ...this.getProblemePrincipal().rechercherAnomalies()];
        console.log(listeAnomalies);
        return listeAnomalies;
    }

    /**
     * @description Renvoie une liste contenant les éléments ElementGraphique du type donné
     *
     * @static
     * @param {Array<ElementGraphique>} listeElementGraphique La listes de tous les ElementsGraphiques
     * @param {ElementGraphique} typeRechercher le type de l'ElementGraphique à rechercher dans la liste
     * @returns {Array<ElementGraphique>} La liste de tous les ElementGraphique du type rechercher
     */
    static FiltrerElementsGraphique(listeElementGraphique, typeRechercher) {
        let nouvelleListe = [];
        for(let element of listeElementGraphique) {
            if(element instanceof typeRechercher) {
                nouvelleListe.push(element);
            }
        }
        return nouvelleListe;
    }

    /**
     * @description Renvoie les informations de l'instance du PlanTravail sous forme JSON
     *
     * @returns {{}}
     */
    exporterEnJSON() {
        let listeElementsSansParents = [];
        for (let element of this.children) {
            if (element._parent == null && element instanceof ElementGraphique) {
                listeElementsSansParents.push(element);
            }
        }

        let corpsJSON = [];
        listeElementsSansParents.forEach((element) => {
            corpsJSON.push(element.toJSON());
        });
        return corpsJSON;
    }

    /**
     * @description Lis un fichier json et le charge en mémoire. Vérifi également si le fichier est bien un JSON
     *
     * @param {string} fichier Le fichier json à charger en mémoire
     */
    chargerFichier(fichier) {
        try {
            var parsedData = JSON.parse(fichier)
            this.chargerDepuisJSON(parsedData);
        } catch (error) {
            console.error("Le fichier n'est pas au format JSON.");
        }
    }

    /**
     * @description Charge le corpsJSON donnée pour charger l'algorithme contenu à l'intérieur sur le plan de travail
     *
     * @param {JSON} corpsJSON le corps JSON à charger sur le plan de travail
     * @returns {Array<ElementGraphique>} La liste des ElementGraphique chargés
     */
    chargerDepuisJSON(corpsJSON) {
        if (corpsJSON == undefined) {
            return [];
        }
        let listeElems = [];
        for (let element of corpsJSON) {
            switch (element.typeElement) {
                case "Probleme":
                    let probleme = new Probleme(element.abscisse, element.ordonnee, element.libelle);
                    for (let donnee of element.listeDonnes) {
                        probleme._listeDonnes.push(new Information(donnee));
                    }
                    for (let resultat of element.listeResultats) {
                        probleme._listeResultats.push(new Information(resultat));
                    }
                    this.appendChild(probleme);
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        probleme._elemParent.lierEnfant(enfant);
                    }
                    probleme.afficher();
                    probleme.setPosition();
                    listeElems.push(probleme);
                    break;
                case "Procedure":
                    let procedure = new Procedure(element.abscisse, element.ordonnee, element.libelle);
                    for (let donnee of element.listeDonnes) {
                        procedure._listeDonnes.push(new Information(donnee.nom, donnee.type, donnee.signification));
                    }
                    for (let resultat of element.listeResultats) {
                        procedure._listeResultats.push(new Information(resultat.nom, resultat.type, resultat.signification));
                    }
                    this.appendChild(procedure);
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        procedure._elemParent.lierEnfant(enfant);
                    }
                    procedure.afficher();
                    procedure.setPosition();
                    listeElems.push(procedure);
                    break;
                case "StructureSi":
                    let listeConditionsSi = [];
                    for (let condition of this.chargerDepuisJSON(element.conditions)) {
                        listeConditionsSi.push(condition);
                    }
                    let structureSi = new StructureSi(element.abscisse, element.ordonnee, listeConditionsSi);
                    structureSi.afficher();
                    structureSi.setPosition();
                    this.appendChild(structureSi);
                    listeElems.push(structureSi);
                    break;
                case "StructureSwitch":
                    let listeConditionsSwitch = [];
                    for (let condition of this.chargerDepuisJSON(element.conditions)) {
                        listeConditionsSwitch.push(condition);
                    }
                    let structureSwitch = new StructureSwitch(element.abscisse, element.ordonnee, listeConditionsSwitch ,element.expressionATester);
                    structureSwitch.afficher();
                    structureSwitch.setPosition();
                    for (let condition of this.chargerDepuisJSON(element.conditions)) {
                        structureSwitch.ajouterCondition(condition);
                    }
                    this.appendChild(structureSwitch);
                    listeElems.push(structureSwitch);
                    break;
                case "Condition":
                    let condition = new Condition(element.libelle);
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        condition._elemParent.lierEnfant(enfant);
                    }
                    condition.afficher();
                    listeElems.push(condition);
                    break;
                case "StructureIterativeNonBornee":
                    let structureIterativeNonBornee = new StructureIterativeNonBornee(element.abscisse, element.ordonnee);
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        structureIterativeNonBornee._elemParent.lierEnfant(enfant);
                    }
                    this.appendChild(structureIterativeNonBornee);
                    structureIterativeNonBornee.afficher();
                    structureIterativeNonBornee.setPosition();
                    listeElems.push(structureIterativeNonBornee);
                    break;
                case "StructureIterativeBornee":
                    let structureIterativeBornee = new StructureIterativeBornee(element.abscisse, element.ordonnee, element.variableAIterer, element.borneInferieure, element.borneSuperieure, element.pas);
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        structureIterativeBornee._elemParent.lierEnfant(enfant);
                    }
                    this.appendChild(structureIterativeBornee);
                    structureIterativeBornee.afficher();
                    structureIterativeBornee.setPosition();
                    listeElems.push(structureIterativeBornee);
                    break;
                case "ConditionSortie":
                    let conditionSortie = new ConditionSortie(element.abscisse, element.ordonnee);
                    this.appendChild(conditionSortie);
                    conditionSortie.afficher();
                    conditionSortie.setPosition();
                    listeElems.push(conditionSortie);
                    break;
                default:
                    break;
            }
        }
        return listeElems;
    }

    // Effectue le dictionnaire des données
    /**
     * @description Recherche toutes les variables à l'intérieur du PlanTravail et les donne au dictionnaire de donnée
     */
    effectuerDictionnaireDesDonnee() {
        // Suppression de toutes les Informations ayant comme type undefined
        this.leDictionnaireDesDonnees.suppressionDonneeInutiliser()

        //Ajout des Informations
        let lesInformations = [];
        for(let courantObjetGraphique of this.children)
        {
            lesInformations = [...lesInformations, ...courantObjetGraphique.extraireInformation()];
        }
        for(let uneInformation of lesInformations)
        {
            this.leDictionnaireDesDonnees.AjouterUneVariable(uneInformation);
        }
    }    
    trouverToutLesElementsGraphiques() {
        return this.children;
    }    
    renameInformation(ancienNom, nouveauNom) {
        for(let enfantGraphique of this.trouverToutLesElementsGraphiques())
        {
            enfantGraphique.renameInformation(ancienNom, nouveauNom);
        }
    }

    ajouterElement(element, abscisse, ordonnee, estEnVW) {
        if (element == null) {
            return;
        }
        if (!estEnVW) {
            // Conversion des coordonnées en vw
            abscisse = abscisse / window.innerWidth * 100;
            ordonnee = ordonnee / window.innerWidth * 100;
        }
        let newElement = new element(abscisse + 'vw', ordonnee + 'vw')
        newElement.afficher();

        // Adapter les coordonnées de l'élément pour le placer centré sur le curseur
        let largeurElement = newElement.getTailleAbscisse();
        let hauteurElement = newElement.getTailleOrdonnee();
        if (verbose) console.log('largeurElement = ' + largeurElement + ' et hauteurElement = ' + hauteurElement);
        newElement._abscisse = parseFloat(newElement._abscisse) - largeurElement / 2 + 'vw';
        newElement._ordonnee = parseFloat(newElement._ordonnee) - hauteurElement / 2 + 'vw';
        newElement.setPosition();
        this.appendChild(newElement);

    }
}
window.customElements.define("plan-travail", PlanTravail);
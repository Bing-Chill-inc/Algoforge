class PlanTravail extends HTMLElement {
    // ATTRIBUTS -non-
    leDictionnaireDesDonnees = new DictionnaireDonnee(); // Dictionnaire de donnée
    // CONSTRUCTEUR
    constructor() {
        super();
        this.addEventListener("paste", (event) => {
            event.preventDefault();
            let texte = event.clipboardData.getData("text/plain");
            this.chargerFichier(texte);
        });
    }

    // ENCAPSULATION -non-

    // METHODES

    rechercherAnomalies() {
        let listeAnomalies = [];
        if(AvertissementPlanTropGrand.detecterAnomalie(this)) {
            listeAnomalies.push(new AvertissementPlanTropGrand(this));
        }
        return listeAnomalies;
    }

    static FiltrerElementsGraphique(listeElementGraphique, typeRechercher)
    {
        let nouvelleListe = [];
        for(let element of listeElementGraphique) {
            if(element instanceof typeRechercher) {
                nouvelleListe.push(element);
            }
        }
        return nouvelleListe;
    }

    exporterEnJSON() {
        let listeElementsSansParents = [];
        for (let element of this.children) {
            if (element._parent == null) {
                listeElementsSansParents.push(element);
            }
        }

        let corpsJSON = [];
        listeElementsSansParents.forEach((element) => {
            corpsJSON.push(element.toJSON());
        });
        return corpsJSON;
    }

    chargerFichier(fichier) {
        try {
            var parsedData = JSON.parse(fichier)
            this.chargerDepuisJSON(parsedData);
        } catch (error) {
            console.error("Le fichier n'est pas au format JSON.");
        }
    }

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
                        probleme._listeDonnes.push(new Information(donnee.nom, donnee.type, donnee.signification));
                    }
                    for (let resultat of element.listeResultats) {
                        probleme._listeResultats.push(new Information(resultat.nom, resultat.type, resultat.signification));
                    }
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        probleme._elemParent.lierEnfant(enfant);
                    }
                    this.appendChild(probleme);
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
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        procedure._elemParent.lierEnfant(enfant);
                    }
                    this.appendChild(procedure);
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
    effectuerDictionnaireDesDonnee()
    {
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
        console.log(this.leDictionnaireDesDonnees);
    }

}
window.customElements.define("plan-travail", PlanTravail);
/**
 * @class StructureSi
 * @classdesc La StructureSi qui permet de vérifier une ou plusieurs conditions donnée
 * @description Crée une instance de StructureSi
 * @extends {StructureAlternative}
 */
class StructureSi extends StructureAlternative {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    /**
     * 
     * @constructor
     * @param {string|number} abscisse 
     * @param {string|number} ordonnee 
     * @param {Array<Condition>} listeConditions 
     */
    constructor(abscisse, ordonnee, listeConditions = []) {
        super(abscisse, ordonnee, listeConditions);
    }

    // ENCAPSULATION -non-

    // METHODES
    /**
     * @description Affiche la StructureSi sur le plan de travail
     */
    afficher() {
        let divTriangleGauche = document.createElement("div");
        divTriangleGauche.className = "triangleGauche";
        this.appendChild(divTriangleGauche);

        let divConditionContainer = document.createElement("div");
        divConditionContainer.className = "conditionContainer";
        this.appendChild(divConditionContainer);

        for (let i = 0; i < this._listeConditions.length; i++) {
            divConditionContainer.appendChild(this._listeConditions[i]);
        }
        
        this._listeConditions = divConditionContainer;

        let divTriangleDroit = document.createElement("div");
        divTriangleDroit.className = "triangleDroit";
        this.appendChild(divTriangleDroit);
    }

    /**
     * @description Renvoie le corp JSON des information contenu dans la StructureSi
     * 
     * @returns {JSON} le corps json de la StructureSi
     * @property {ElementGraphique} typeElement Le type de la StructureSi (qui est StructureSwitch)
     * @property {string|number} abscisse l'abscisse
     * @property {string|number} ordonee l'ordonnée
     * @property {Array<Condition>} conditions la liste des conditions actuelle dans la StructureSi
     */
    toJSON() {
        let conditions = [];
        for (let condition of this._listeConditions.children) {
            conditions.push(condition.toJSON());
        }
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            conditions: conditions
        };
    }
    /**
     * @deprecated
     * @returns {}
     */
    extraireInformation()
    {
        // A faire condition doit pouvoir dire la variable ou le type
        return [];
    }
    /**
     * @description Récupère la liste actuelles des anomalies detecté et ajoute ces propres anomalies détecté à celle ci<br>
     * Liste des Erreurs :<br>
     * 8 : Pas double égal dans une condition mais un égal <br>
     * 12 : Plus de sept actions à la suite <br>
     * 15 : Informations dans une condition non consistante avec les autres conditions de la structure<br>
     * 17 : Utilisation à mauvais escient d’une structure conditionnel
     * 
     * @param {Array<AnomalieConceptuelle>} listeAnomaliesPrecedent La liste des anomalies déjà présentes
     * @returns {Array<AnomalieConceptuelle>} La liste des anomalies déjà présentes + celle ajouté par la StructureSi
     */
    rechercherAnomalies(listeAnomaliesPrecedent = []) {
        let listeAnomalies = listeAnomaliesPrecedent;
        //8
        if(ErreurSyntaxeComparaison.detecterAnomalie(this)) {
            listeAnomalies.push(new ErreurSyntaxeComparaison(this));
        }
        //12
        let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
        if(tropDeSousElements[0]) {
            listeAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
        }
        //15
        let informationsInconsistantesSi = AvertissementInformationsInconsistantesSi.detecterAnomalie(this);
        if(informationsInconsistantesSi[0]){
            listeAnomalies.push(new AvertissementInformationsInconsistantesSi(this, informationsInconsistantesSi[1]));
        }
        //17
        let structureInoptimale = AvertissementStructureInoptimale.detecterAnomalie(this);
        if(structureInoptimale[0]){
            listeAnomalies.push(new AvertissementStructureInoptimale(this, structureInoptimale[1], structureInoptimale[2]));
        }
        if(!informationsInconsistantesSi[0]){
            let typesInconsistantsAlternatif = ErreurTypesInconsistantsAlternatif.detecterAnomalie(this);
            if(typesInconsistantsAlternatif[0]){
                listeAnomalies.push(new ErreurTypesInconsistantsAlternatif(this, typesInconsistantsAlternatif[1], typesInconsistantsAlternatif[2]));
            }
        }
        super.rechercherAnomalies(listeAnomalies);
        return listeAnomalies;
    }
     


} window.customElements.define("structure-si-element", StructureSi);
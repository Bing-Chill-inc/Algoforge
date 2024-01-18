class StructureSi extends StructureAlternative {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, listeConditions = []) {
        super(abscisse, ordonnee, listeConditions);
    }

    // ENCAPSULATION -non-

    // METHODES
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
    extraireInformation()
    {
        // A faire condition doit pouvoir dire la variable ou le type
        return [];
    }
    rechercherAnomalies() {
        let mesAnomalies = [];/*
        //8
        if(ErreurSyntaxeComparaison.detecterAnomalie(this)) {
            mesAnomalies.push(new ErreurSyntaxeComparaison(this));
        }
        //12
        let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
        if(tropDeSousElements[0]) {
            mesAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
        }
        //15
        let informationsInconsistantesSi = AvertissementInformationsInconsistantesSi.detecterAnomalie(this);
        if(informationsInconsistantesSi[0]){
            mesAnomalies.push(new AvertissementInformationsInconsistantesSi(this, informationsInconsistantesSi[1]));
        }
        //17
        let structureInoptimale = AvertissementStructureInoptimale.detecterAnomalie(this);
        if(structureInoptimale[0]){
            mesAnomalies.push(new AvertissementStructureInoptimale(this, structureInoptimale[1], structureInoptimale[2]));
        }
        if(!informationsInconsistantesSi[0]){
            let typesInconsistantsAlternatif = ErreurTypesInconsistantsAlternatif.detecterAnomalie(this);
            if(typesInconsistantsAlternatif[0]){
                mesAnomalies.push(new ErreurTypesInconsistantsAlternatif(this, typesInconsistantsAlternatif[1], typesInconsistantsAlternatif[2]));
            }
        }*/
        return super.rechercherAnomalies(mesAnomalies);
    }
     


} window.customElements.define("structure-si-element", StructureSi);
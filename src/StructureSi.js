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
        
        this._listeConditions = divConditionContainer

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
} window.customElements.define("structure-si-element", StructureSi);
export default StructureSi;
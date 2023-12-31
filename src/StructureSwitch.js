class StructureSwitch extends StructureAlternative {
    // ATTRIBUTS
    _expressionATester; // String

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, listeConditions = [], expressionATester = "") {
        super(abscisse, ordonnee, listeConditions);
        this._expressionATester = expressionATester;
    }

    // ENCAPSULATION
    get _expressionATester() {
        return this._expressionATester;
    }

    set _expressionATester(value) {
        this._expressionATester = value;
    }

    // METHODES
    afficher() {
        let divTriangleGauche = document.createElement("div");
        divTriangleGauche.className = "triangleGauche";
        this.appendChild(divTriangleGauche);

        let divExpressionATester = document.createElement("div");
        divExpressionATester.className = "expressionATester";
        divExpressionATester.contentEditable = "true";
        this.appendChild(divExpressionATester);

        let hrDiviseurGauche = document.createElement("hr");
        hrDiviseurGauche.className = "diviseurGauche";
        this.appendChild(hrDiviseurGauche);

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

        let hrDiviseurDroit = document.createElement("hr");
        hrDiviseurDroit.className = "diviseurDroit";
        this.appendChild(hrDiviseurDroit);
    }

    toJSON() {
        let conditions = [];
        this._listeConditions.forEach((condition) => {
            conditions.push(condition.toJSON());
        });
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            expressionATester: this._expressionATester,
            conditions: conditions
        };
    }
} window.customElements.define("structure-switch-element", StructureSwitch);
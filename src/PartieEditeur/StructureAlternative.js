class StructureAlternative extends ElementGraphique {
    // ATTRIBUTS 
    _listeConditions; // HTML Collection de Condition•s

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, listeConditions = []) {
        super(abscisse, ordonnee);
        this._listeConditions = listeConditions;
        if (this._listeConditions.length == 0) {
            this._listeConditions.push(new Condition());
            this._listeConditions[0]._structure = this;
        }
    }

    // ENCAPSULATION
    get _listeConditions() {
        return this._listeConditions;
    }

    set _listeConditions(value) {
        this._listeConditions = value;
    }

    // METHODES
    afficher() {
        console.log(`Abscisse : ${this._abscisse} Ordonnée : ${this._ordonnee}`);
        console.log("Conditions :");
        this._listeConditions.forEach((condition) => {
            condition.afficher();
        });
    }
    getEnfants(typeRechercher = ElementGraphique)
    {
        let listeEnfants = [];
        for(let condition of this._listeConditions.children)
        {
            for(let elem of condition._elemParent._listeElementsEnfants)
            {
                listeEnfants.appendChild(elem.element);
            }
        }
        listeEnfants = PlanTravail.FiltrerElementsGraphique(listeEnfants, typeRechercher);
        return listeEnfants.sort((a, b) => a._abscisse - b._abscisse);
    }

    ajouterCondition(condition = new Condition()) {
        this._listeConditions.appendChild(condition);
    }

    supprimerCondition(condition) {
        this._listeConditions.removeChild(condition);
    }
}
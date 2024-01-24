/**
 * @class StructureAlternative
 * @classdesc Représente les différentes structure de contrôle
 * @description Est utilisé par les différentes structure de contrôle pour les instancier
 * @extends {ElementGraphique}
 */
class StructureAlternative extends ElementGraphique {
    // ATTRIBUTS 
    _listeConditions; // HTML Collection de Condition•s

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {string|number} abscisse l'abscisse
     * @param {string|number} ordonnee 
     * @param {Array<Condition>} listeConditions 
     */
    constructor(abscisse, ordonnee, listeConditions = []) {
        super(abscisse, ordonnee);
        this._listeConditions = listeConditions;
        if (this._listeConditions.length == 0) {
            this._listeConditions.push(new Condition());
            this._listeConditions[0]._structure = this;
        }

        this.addEventListener('mousemove', function(e) {
            // update les liens vers les enfants
            for (let condition of this._listeConditions.children) {
                condition._elemParent._listeElementsEnfants.forEach((lien) => {
                    lien.ligne.update();
                });
            }
        });
    }

    // ENCAPSULATION
    /**
     * @description Renvoie la liste des conditions
     * @returns {Array<Condition>} La liste des conditions
     */
    get _listeConditions() {
        return this._listeConditions;
    }

    /**
     * @description Définie la liste de conditions
     * @param {Array<Condition>} value La liste des conditions
     */
    set _listeConditions(value) {
        this._listeConditions = value;
    }

    // METHODES
    /**
     * @description affiche la structure alternative
     */
    afficher() {
        console.log(`Abscisse : ${this._abscisse} Ordonnée : ${this._ordonnee}`);
        console.log("Conditions :");
        this._listeConditions.forEach((condition) => {
            condition.afficher();
        });
    }
    /**
     * @description récupère les enfant de la structure alternative
     * 
     * @param {ElementGraphique} typeRechercher Le type d'ElementGraphique rechercher
     * @returns {Array<ElementGraphique>} la liste des ElementGraphique correspondant au type rechercher
     */
    getEnfants(typeRechercher = ElementGraphique)
    {
        let listeEnfants = [];
        for(let condition of this._listeConditions.children)
        {
            for(let elem of condition._elemParent._listeElementsEnfants)
            {
                listeEnfants.push(elem.element);
            }
        }
        listeEnfants = PlanTravail.FiltrerElementsGraphique(listeEnfants, typeRechercher);
        return listeEnfants.sort((a, b) => a._abscisse - b._abscisse);
    }

    /**
     * @description Ajoute une condition à la structure alternative
     * 
     * @param {Condition} condition la condition ajouter
     */
    ajouterCondition(condition = new Condition()) {
        this._listeConditions.appendChild(condition);
    }

    /**
     * @description Retire une condition de la structure alternative
     * 
     * @param {Condition} condition 
     */
    supprimerCondition(condition) {
        this._listeConditions.removeChild(condition);
    }
}
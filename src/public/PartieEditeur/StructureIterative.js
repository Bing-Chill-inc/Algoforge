/**
 * @class StructureIterative
 * @classdesc Représente les différentes structure itérative
 * @description Est utilisé par les différentes structure itérative pour les instancier
 * @extends {ElementGraphique}
 */
class StructureIterative extends ElementGraphique {
    // ATTRIBUTS
    _elemParent; // ElementParent (liste des enfants)

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {number|string} abscisse l'abscisse 
     * @param {number|string} ordonnee l'ordonnée 
     * @param {ElementParent} elemParent l'element parent à la structure itérative
     */
    constructor(abscisse, ordonnee, elemParent = new ElementParent()) {
        super(abscisse, ordonnee);
        this._elemParent = elemParent;
        if (this._elemParent != null) {
            elemParent._proprietaire = this;
        }
    }

    // ENCAPSULATION -non-

    // METHODES
    /**
     * @description Affiche la StructureIterative sur le plan de travail
     */
    afficher() {
        let imgBoucleSVG = document.createElement("img");
        imgBoucleSVG.className = "boucleSVG";
        imgBoucleSVG.src = "assets/boucle.svg";
        this.appendChild(imgBoucleSVG);
    }
    /**
     * @description Renvoie une liste des enfants de la StructureIterative du type donnée
     * 
     * @param {ElementGraphique} typeRechercher le type d'ElementGraphique rechercher
     * @returns {Array<ElementGraphique>} la liste des enfants du type donné
     */
    getEnfants(typeRechercher = ElementGraphique)
    {
        let listeDesEnfants = [];
        for(let enfant of this._elemParent._listeElementsEnfants)
        {
            listeDesEnfants.push(enfant.element);
        }
        listeDesEnfants = PlanTravail.FiltrerElementsGraphique(listeDesEnfants, typeRechercher);
        return listeDesEnfants.sort((a, b) => a._abscisse - b._abscisse);
    }
}
/**
 * @class StructureIterativeNonBornee
 * @classdesc Structure itérative non bornée qui boucle tant qu'une conditions n'est pas remplis
 * @description Crée une instance de StructureIterativeNonBornee
 * @extends {StructureIterative}
 */
class StructureIterativeNonBornee extends StructureIterative {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {string|number} abscisse 
     * @param {string|number} ordonnee 
     */
    constructor(abscisse, ordonnee) {
        super(abscisse, ordonnee);
    }

    // ENCAPSULATION -non-

    // METHODES
    /**
     * @description Affiche sur le plan de travail la StructureIterativeNonBornée
     */
    afficher() {
        super.afficher(); // Affichage de la boucle seule
    }

    /**
     * @description Recherche et renvoie la listes des anomalies de la boucle iterative bornée<br>
     * Liste des Erreurs :<br>
     * 
     * 10 : Boucle infinie, on vérifie que la boucle contient une sortie<br>  
     * 12 : On vérifie que la boucle contient pas 7 sous-éléments ou plus
     * 
     * @param {Array<AnomalieConceptuelle>} listeAnomaliesPrecedent la liste des anomalies récupéré par les enfants
     * @returns {Array<AnomalieConceptuelle>} la liste des anomalies précédante+ celle trouvé par la structure
     */
    rechercherAnomalies() {
        let mesAnomalies = [];
        // 10
        if(ErreurBoucleSansSortie.detecterAnomalie(this)) {
            mesAnomalies.push(new ErreurBoucleSansSortie(this));
        }
        // 12
        let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
        if(tropDeSousElements[0]) {
            mesAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
        }
        return super.rechercherAnomalies(mesAnomalies);
    }

    /**
     * @description Renvoie le corp JSON de l'instance de la StructureItérative
     * 
     * @returns {JSON} Le corps JSON de la StructureIterativeNonBornee
     * @type {ElementGraphique}
     * @property {ElementGraphique} typeElement Le type de la StructureIterativeNonBornee
     * @property {string|number} abscisse l'abscisse
     * @property {string|number} ordonnee l'ordonnée
     * @property {JSON} enfants les enfants de la structure itérative
     */
    toJSON() {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            enfants: this._elemParent.toJSON()
        };
    } 
    
    toJSONspecifier(listeElemEnfantsAConcerver) {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            enfants: this._elemParent.toJSONspecifier(listeElemEnfantsAConcerver)
        };
    }
} window.customElements.define("structure-iterative-non-bornee-element", StructureIterativeNonBornee);

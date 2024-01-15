/**
 * La classe ElementGraphique est la base de tous les éléments de l'éditeur d'algorithmes 
 *
 * @class ElementGraphique
 * @typedef {ElementGraphique}
 * @extends {HTMLElement}
 */
class ElementGraphique extends HTMLElement {
    // ATTRIBUTS
    _abscisse; // Entier 
    _ordonnee; // Entier
    _parent; // ElementParent
    //_couleurPrimaire = "black"; // Couleur premiere
    //_etat= "Defaut"; // Etat de l'element graphique

    // CONSTRUCTEUR
    /**
     * Crée une instance de ElementGraphique.
     * 
     * Par défaut la position à la création de l'instance est à (0,0)
     *
     * @constructor
     * @param {number} [abscisse=0]
     * @param {number} [ordonnee=0]
     * @param {*} [parent=null]
     */
    constructor(abscisse = 0, ordonnee = 0, parent = null) {
        super();
        this._abscisse = abscisse;
        this._ordonnee = ordonnee;
        this._parent = parent;
        this.setPosition(abscisse, ordonnee);
    }

    // ENCAPSULATION
    /**
     * Renvoie la valeur de l'abscisse de l'ElementGraphique
     *
     * @type {number}
     */
    get _abscisse() {
        return this._abscisse;
    }

    /**
     * Définit la valeur de l'abscisse de l'ElementGraphique
     */
    set _abscisse(value) {
        this._abscisse = value;
    }

    /**
     * Renvoie la valeur de l'ordonnée de l'ElementGraphique
     *
     * @type {number}
     */
    get _ordonnee() {
        return this._ordonnee;
    }

    /**
     * Définit la valeur de l'ordonnée de l'ElementGraphique
     */
    set _ordonnee(value) {
        this._ordonnee = value;
    }

    /**
     * Renvoie le parent de l'ElementGraphique
     *
     * @type {*}
     */
    get _parent() {
        return this._parent;
    }

    /**
     * Définit le parent de l'ElementGraphique
     */
    set _parent(value) {
        this._parent = value;
    }

    // ENCAPSULATION

    /**
     * Définit la positon de l'ElementGraphique
     * 
     * Si aucune valeur n'est définit la position ne change pas. Sinon la nouvelle valeur est donné à l'ElementGraphique
     *
     * @param {number} [abscisse=-1]
     * @param {number} [ordonnee=-1]
     */
    setPosition(abscisse = -1, ordonnee = -1) {
        if (abscisse == -1 && ordonnee == -1) {
            this.style.left = "calc(var(--sizeModifier) * " + this._abscisse + ")";
            this.style.top = "calc(var(--sizeModifier) * " + this._ordonnee + ")";
        } else {
            this.style.left = "calc(var(--sizeModifier) * " + abscisse + ")";
            this.style.top = "calc(var(--sizeModifier) * " + ordonnee + ")";
        }
    }

    /**
     * Renvoie la position de l'ElementGraphique sous forme de dictionnaire
     *
     * @returns {{ abscisse: any; ordonnee: any; }}
     */
    getPosition() {
        return {abscisse: this.style.left, ordonnee: this.style.top};
    }

    // METHODES
    /**
     * Affiche dans la console la position de l'ElementGraphique
     */
    afficher() {
        console.log(`Abscisse : ${this._abscisse} Ordonnée : ${this._ordonnee}`);
    }
    
    extraireInformation() {
        console.log("Extraire J'ai pas été initialisé abcisse " + this._abscisse +" ordonee " + this._ordonnee);
        return [];
    }

    /**
     * Comportement naïf de la méthode getEnfants ne renvoie rien
     *
     * @param {typeof ElementGraphique} [typeRechercher=ElementGraphique]
     * @returns {{}}
     */
    getEnfants(typeRechercher = ElementGraphique)
    {
        return [];
    }

    getDescendants(typeRechercher = ElementGraphique) {
        const listeDeMesEnfants = this.getEnfants();
        let listeDeMesDescendants = listeDeMesEnfants;
        for(let enfant of listeDeMesEnfants)
        {
            listeDeMesDescendants = [...listeDeMesDescendants, ...enfant.getDescendants()];
        }
        return PlanTravail.FiltrerElementsGraphique(listeDeMesDescendants, typeRechercher);
    }

    getParent(typeRechercher = ElementGraphique) {
        if(this._parent)
        {
            return this._parent._proprietaire instanceof typeRechercher ? this._parent._proprietaire:null;
        }
        return null;
    }

    getAntescedants(typeRechercher = ElementGraphique) {
        const parent = this.getParent();
        let listeDeMesAntescedants = [];
        if(parent !== null)
        {
            listeDeMesAntescedants.push(parent);
            listeDeMesAntescedants = [...listeDeMesAntescedants, ...parent.getAntescedants()];
        }
        return PlanTravail.FiltrerElementsGraphique(listeDeMesAntescedants, typeRechercher);
        
    }

    include(nameInformation) {
        console.log("Include J'ai pas été initialisé je suis "  + this._abscisse +" ordonee " + this._ordonnee);
        return false;
    }
    getInformationResultat() {
        console.log("get Information Resultat non défini dans ma classe abscisse"  + this._abscisse +" ordonee " + this._ordonnee)
        return [];
    }
    getInformationDonnee() {
        console.log("get Information Donnée non défini dans ma classe je suis " + this._abscisse +" ordonee " + this._ordonnee)
        return [];
    }
    rechercherAnomalies(listeAnomaliesPrecedent = []) {
        let enfants = this.getEnfants();
        for(let enfant of enfants)
        {
            enfant.rechercherAnomalies(listeAnomaliesPrecedent);
        }
    }
    colorierElement() {
        console.log(`Coloriage Couleur primaire: ${this._couleurPrimaire}`);
    }
    signalerErreur() {
        this._etat = "Erreur"
        this._couleurPrimaire = "red";
        this.colorierElement();
    }
    signalerAvertissement() {
        this._etat = "Avertissement"
        this._couleurPrimaire = "yellow";
        this.colorierElement();
    }
    effacerSignalement() {
        this._etat = "Defaut"
        this._couleurPrimaire = "black";
        this.colorierElement();
    }
    
}
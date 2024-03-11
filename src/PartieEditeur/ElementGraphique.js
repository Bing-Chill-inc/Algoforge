/**
 * @class ElementGraphique
 * @classdesc La classe ElementGraphique est la base de tous les éléments de l'éditeur d'algorithmes . <br>Chaque Element Descent de ElementGraphique Lorsque la valeur par défaut est ElementGraphique chacun des types héritant de celui-ci peuvent être utilisé
 * @description Est utilisé pour instancier les héritier de la classe ElementGraphique.<br>
 * Par défaut la position à la création de l'instance est à (0,0)
 * @extends {HTMLElement}
 */
class ElementGraphique extends HTMLElement {
    // ATTRIBUTS
    _abscisse; // Entier
    _ordonnee; // Entier
    _parent; // ElementParent
    _listeAnomalie; //List<AnomalieConceptuelle>
    _elementGraphique;
    //_couleurPrimaire = "black"; // Couleur premiere
    //_etat= "Defaut"; // Etat de l'element graphique

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {number} [abscisse=0] l'abscisse de l'ElementGraphique
     * @param {number} [ordonnee=0] l'ordonnée de l'ElementGraphique
     * @param {ElementParent} [parent=null] le père de l'Elementgraphique par défaut n'a pas de père
     */
    constructor(abscisse = 0, ordonnee = 0, parent = null) {
        super();
        this._abscisse = abscisse;
        this._ordonnee = ordonnee;
        this._parent = parent;
        this._elementGraphique = this;
        this.setPosition(abscisse, ordonnee);
    }

    // ENCAPSULATION
    /**
     * @description Renvoie la valeur de l'abscisse de l'ElementGraphique
     *
     * @returns {number} l'abscisse
     */
    get _abscisse() {
        return this._abscisse;
    }

    /**
     * @description Définit la valeur de l'abscisse de l'ElementGraphique
     */
    set _abscisse(value) {
        this._abscisse = value;
    }

    /**
     * @description Renvoie la valeur de l'ordonnée de l'ElementGraphique
     *
     * @returns {number} l'ordonnée
     */
    get _ordonnee() {
        return this._ordonnee;
    }

    /**
     * @description Définit la valeur de l'ordonnée de l'ElementGraphique
     */
    set _ordonnee(value) {
        this._ordonnee = value;
    }

    /**
     * @description Renvoie le parent de l'ElementGraphique
     *
     * @type {ElementGraphique}
     * @returns {ElementGraphique} Le père de l'ElementGraphique
     */
    get _parent() {
        return this._parent;
    }

    /**
     * @description Définit le parent de l'ElementGraphique
     */
    set _parent(value) {
        this._parent = value;
    }

    get espaceTravail() {
        return this.parentNode;
    }

    get selectAnchor() {
        let anchor = { x: 0, y: 0 };
        anchor.x = parseFloat(this._abscisse) + this.getTailleAbscisse() / 2;
        anchor.y = parseFloat(this._ordonnee) + this.getTailleOrdonnee() / 2;
        return anchor;
    }

    // ENCAPSULATION
    getTailleAbscisse() {
        let rect = this.getBoundingClientRect();

        // Calculez la largeur en unité vw
        let largeurEnVw = ((rect.right - rect.left) / window.innerWidth) * 100;
        return largeurEnVw;
    }
    getTailleOrdonnee() {
        let rect = this.getBoundingClientRect();

        // Calculez la hauteur en unité vh
        let hauteurEnVh = ((rect.bottom - rect.top) / window.innerHeight) * 100;
        return hauteurEnVh;
    }

    getCentre() {
        return {
            x: parseFloat(this._abscisse) + this.getTailleAbscisse() / 2,
            y: parseFloat(this._ordonnee) + this.getTailleOrdonnee() / 2,
        };
    }

    /**
     * @description Définit la positon de l'ElementGraphique<br>
     * Si aucune valeur n'est définit la position ne change pas. Sinon la nouvelle valeur est donné à l'ElementGraphique
     * @param {number} [abscisse=-1] l'abscisse
     * @param {number} [ordonnee=-1] l'ordonnée
     */
    setPosition(abscisse = -1, ordonnee = -1) {
        if (abscisse == -1 && ordonnee == -1) {
            this.style.left =
                "calc(var(--sizeModifier) * " + this._abscisse + ")";
            this.style.top =
                "calc(var(--sizeModifier) * " + this._ordonnee + ")";
        } else {
            this.style.left = "calc(var(--sizeModifier) * " + abscisse + ")";
            this.style.top = "calc(var(--sizeModifier) * " + ordonnee + ")";
        }
    }

    /**
     * @description Renvoie la position de l'ElementGraphique sous forme de dictionnaire
     *
     * @returns {message} Un message contenant l'abscisse et l'ordonnée de l'ElementGraphique
     * @property {number|string} abscisse l'abscisse
     * @property {number|string} ordonee l'ordonnée
     */
    getPosition() {
        return { abscisse: this.style.left, ordonnee: this.style.top };
    }

    // METHODES
    /**
     * @description Affiche dans la console la position de l'ElementGraphique
     */
    afficher() {
        console.log(
            `Abscisse : ${this._abscisse} Ordonnée : ${this._ordonnee}`
        );
    }

    /**
     * @description Comportement natif de getEnfants(), affiche dans la console une erreur d'initialisement et ça position<br>
     * <br>Est étendu dans les sous classes
     *
     * @returns {Array<Information>} Une liste de classe Informations
     */
    extraireInformation() {
        console.log(
            "Extraire J'ai pas été initialisé abcisse " +
                this._abscisse +
                " ordonee " +
                this._ordonnee
        );
        return [];
    }

    /**
     * @description Comportement natif de getEnfants(), ne renvoie rien<br>
     * <br>Est étendu dans les sous classes
     * @type {ElementGraphique}
     * @param {ElementGraphique} [typeRechercher=ElementGraphique] Le type demandé
     * @returns {typeRechercher} La liste des enfants du type rechercher
     */
    getEnfants(typeRechercher = ElementGraphique) {
        return [];
    }

    /**
     * @description Renvoie l'arbre des descendants contenant les descendants des descendants
     *
     * @type {ElementGraphique}
     * @param {ElementGraphique} [typeRechercher=ElementGraphique] Le type rechercher
     * @returns {Array<ElementGraphique>} L'arbre des déscendants de l'ElementGraphique
     */
    getDescendants(typeRechercher = ElementGraphique) {
        const listeDeMesEnfants = this.getEnfants();
        let listeDeMesDescendants = listeDeMesEnfants;
        for (let enfant of listeDeMesEnfants) {
            listeDeMesDescendants = [
                ...listeDeMesDescendants,
                ...enfant.getDescendants(),
            ];
        }
        return PlanTravail.FiltrerElementsGraphique(
            listeDeMesDescendants,
            typeRechercher
        );
    }

    /**
     * @description Renvoie le parent de l'ElementGraphique du type rechercher
     *
     * @type {ElementGraphique}
     * @param {ElementGraphique} [typeRechercher=ElementGraphique] Le parent de l'ElementGraphique du type rechercher
     * @returns {ElementGraphique} le parent
     */
    getParent(typeRechercher = ElementGraphique) {
        if(this._parent)
        {
            return this._parent._proprietaire._elementGraphique instanceof typeRechercher ? this._parent._proprietaire._elementGraphique:null;
        }
        return null;
    }

    /**
     * @description Renvoie la liste des antécédant d'ElementGraphique en fonction du type rechercher
     *
     * @param {ElementGraphique} [typeRechercher=ElementGraphique] La type rechercher
     * @returns {Array<typeRechercher>} L'arbre des antécédants de l'élément graphique
     */
    getAntescedants(typeRechercher = ElementGraphique) {
        const parent = this.getParent();
        let listeDeMesAntescedants = [];
        if (parent !== null) {
            listeDeMesAntescedants.push(parent);
            listeDeMesAntescedants = [
                ...listeDeMesAntescedants,
                ...parent.getAntescedants(),
            ];
        }
        return PlanTravail.FiltrerElementsGraphique(
            listeDeMesAntescedants,
            typeRechercher
        );
    }

    /**
     * @description Comportement natif de include(), affiche dans la console une erreur d'initialisement et ça position
     *
     * <br>Est étendu dans les sous classes
     *
     * @param {string} nameInformation Les information rechercher
     * @returns {boolean} Renvoie false par défaut
     */
    include(nameInformation) {
        console.log(
            "Include J'ai pas été initialisé je suis " +
                this._abscisse +
                " ordonee " +
                this._ordonnee
        );
        return false;
    }

    /**
     * @description Comportement natif de getPlanTravail(), Retourne le plan de travail
     * 
     * <br>Est étendu dans les sous classes
     *
     * @returns {PlanTravail} Le Plan Travail appartenant au résultat défini, dans Probleme
     */
    getPlanTravail()
    {
        return this.parentElement;
    }

    /**
     * @description Comportement natif de getInformationResultat(), affiche dans la console une erreur d'initialisement et ça position
     *
     * <br>Est étendu dans les sous classes
     *
     * @returns {Array<Information>} Les information contenu dans résultat défini, dans Probleme
     */
    getInformationResultat() {
        console.log(
            "get Information Resultat non défini dans ma classe abscisse" +
                this._abscisse +
                " ordonee " +
                this._ordonnee
        );
        return [];
    }

    /**
     * @description Comportement natif de getInformationResultat(), affiche dans la console une erreur d'initialisement et ça position
     *
     * <br>Est étendu dans les sous classes
     *
     * @returns {Array<Information>} Les informations contenu dans données défini, dans Probleme
     */
    getInformationDonnee() {
        console.log(
            "get Information Donnée non défini dans ma classe je suis " +
                this._abscisse +
                " ordonee " +
                this._ordonnee
        );
        return [];
    }
    rechercherAnomalies(mesAnomalies) {
        this._listeAnomalie = mesAnomalies;
        let anomalieDeMesEnfantsEtLesMiennes = [];
        let enfants = this.getEnfants();
        for (let enfant of enfants) {
            anomalieDeMesEnfantsEtLesMiennes = [
                ...anomalieDeMesEnfantsEtLesMiennes,
                ...enfant.rechercherAnomalies(),
            ];
        }
        anomalieDeMesEnfantsEtLesMiennes = [...anomalieDeMesEnfantsEtLesMiennes, ...mesAnomalies];
        return anomalieDeMesEnfantsEtLesMiennes;
    }
    /* Partie Affichage */
    colorierElement() {
        //console.log(`Coloriage Couleur primaire: ${this._couleurPrimaire}`);
    }
    renameInformation(ancienNom, nouveauNom) {
        
    }

    getAncreDecomposition() {
        let abscisse =
            parseFloat(this._abscisse) + this.getTailleAbscisse() / 2;
        let ordonnee = parseFloat(this._ordonnee) + this.getTailleOrdonnee();
        return { abscisse: abscisse, ordonnee: ordonnee - 0.7 };
    }

    getAncreComposition() {
        let abscisse =
            parseFloat(this._abscisse) + this.getTailleAbscisse() / 2;
        let ordonnee = parseFloat(this._ordonnee);
        return { abscisse: abscisse, ordonnee: ordonnee };
    }

    peutEtreDecompose() {
        return false;
    }

    supprimer() {
        if (this._parent != null) this._parent.delierEnfant(this);
        this.remove();
    }

    genererOptionsContextuelles(editeur) {
        let lesOptions = [];
        if (this.peutEtreDecompose()) {
            lesOptions.push(
                new ElementMenu("Décomposer", () => {
                    editeur.selectTool(6); // Outil de liaison
                    editeur._pointePrecedementLien = this;
                    this.classList.add("pointePourLien");
                })
            );
            if (this._elemParent.nombreEnfants != 0) {
                lesOptions.push(
                    new ElementMenu("Délier tous les enfants", () => {
                        this._elemParent.delierTousLesEnfants();
                    })
                );
            }
        }
        if (this._parent != null) {
            lesOptions.push(
                new ElementMenu("Délier du parent", () => {
                    this._parent.delierEnfant(this);
                })
            );
        }
        return lesOptions;
    }
}

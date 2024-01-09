class ElementGraphique extends HTMLElement {
    // ATTRIBUTS
    _abscisse; // Entier 
    _ordonnee; // Entier
    _parent; // ElementParent


    // CONSTRUCTEUR
    constructor(abscisse = 0, ordonnee = 0, parent = null) {
        super();
        this._abscisse = abscisse;
        this._ordonnee = ordonnee;
        this._parent = parent;
        this.setPosition(abscisse, ordonnee);
    }

    // ENCAPSULATION
    get _abscisse() {
        return this._abscisse;
    }

    set _abscisse(value) {
        this._abscisse = value;
    }

    get _ordonnee() {
        return this._ordonnee;
    }

    set _ordonnee(value) {
        this._ordonnee = value;
    }

    get _parent() {
        return this._parent;
    }

    set _parent(value) {
        this._parent = value;
    }

    // ENCAPSULATION
    setPosition(abscisse = -1, ordonnee = -1) {
        if (abscisse == -1 && ordonnee == -1) {
            this.style.left = "calc(var(--sizeModifier) * " + this._abscisse + ")";
            this.style.top = "calc(var(--sizeModifier) * " + this._ordonnee + ")";
        } else {
            this.style.left = "calc(var(--sizeModifier) * " + abscisse + ")";
            this.style.top = "calc(var(--sizeModifier) * " + ordonnee + ")";
        }
    }

    getPosition() {
        return {abscisse: this.style.left, ordonnee: this.style.top};
    }

    // METHODES
    afficher() {
        console.log(`Abscisse : ${this._abscisse} Ordonnée : ${this._ordonnee}`);
    }
    
    extraireInformation()
    {
        console.log("Extraire J'ai pas été initialisé abcisse " + this._abscisse +" ordonee " + this._ordonnee);
        return [];
    }

    getEnfants(typeRechercher = ElementGraphique)
    {
        return [];
    }

    getDescendants(typeRechercher = ElementGraphique)
    {
        const listeDeMesEnfants = this.getEnfants();
        let listeDeMesDescendants = listeDeMesEnfants;
        for(let enfant of listeDeMesEnfants)
        {
            listeDeMesDescendants = [...listeDeMesDescendants, ...enfant.getDescendants()];
        }
        return PlanTravail.FiltrerElementsGraphique(listeDeMesDescendants, typeRechercher);
    }

    getParent(typeRechercher = ElementGraphique)
    {
        if(this._parent)
        {
            return this._parent._proprietaire instanceof typeRechercher ? this._parent._proprietaire:null;
        }
        return null;
    }

    getAntescedants(typeRechercher = ElementGraphique)
    {
        const parent = this.getParent();
        let listeDeMesAntescedants = [];
        if(parent !== null)
        {
            listeDeMesAntescedants.push(parent);
            listeDeMesAntescedants = [...listeDeMesAntescedants, ...parent.getAntescedants()];
        }
        return PlanTravail.FiltrerElementsGraphique(listeDeMesAntescedants, typeRechercher);
        
    }

    include(nameInformation)
    {
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
    
}
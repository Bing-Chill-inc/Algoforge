/**
 * Classe Probleme
 *
 * @class Probleme
 * @typedef {Probleme}
 * @extends {ElementGraphique}
 */
class Probleme extends ElementGraphique {
    // ATTRIBUTS
    _libelle; // String
    _listeDonnes; // Liste d'Information
    _listeResultats; // Liste d'Information
    _elemParent; // ElementParent (liste des enfants)

    // CONSTRUCTEUR
    /**
     * Crée une instance de Probleme.
     *
     * @constructor
     * @param {number} [abscisse=0]
     * @param {number} [ordonnee=0]
     * @param {string} [libelle=""]
     * @param {{}} [listeDonnes=[]]
     * @param {{}} [listeResultats=[]]
     * @param {*} [elemParent=new ElementParent()]
     */
    constructor(abscisse = 0, ordonnee = 0, libelle = "", listeDonnes = [], listeResultats = [], elemParent = new ElementParent()) {
        super(abscisse, ordonnee);
        this._libelle = libelle;
        this._listeDonnes = listeDonnes;
        this._listeResultats = listeResultats;
        this._elemParent = elemParent;
        if (this._elemParent != null) {
            elemParent._proprietaire = this;
        }
    }

    // ENCAPSULATION
    /**
     * Renvoie la valeur de la variable _libelle
     *
     * @type {string}
     */
    get _libelle() {
        return this._libelle;
    }

    /**
     * Définie la valeur de la variable _libelle par la valeur donné
     */
    set _libelle(value) {
        this._libelle = value;
    }

    /**
     * Renvoie la valeur de la variable _listeDonnes
     *
     * @type {{}}
     */
    get _listeDonnes() {
        return this._listeDonnes;
    }

    /**
     * Définie la valeur de la variable _listeDonnes par la valeur donné
     */
    set _listeDonnes(value) {
        this._listeDonnes = value;
    }

    /**
     * Renvoie la valeur de la variable _listeResultats
     *
     * @type {{}}
     */
    get _listeResultats() {
        return this._listeResultats;
    }

    /**
     * Définie la valeur de la variable _listeResultats par la valeur donné
     */
    set _listeResultats(value) {
        this._listeResultats = value;
    }

    /**
     * Renvoie la valeur de la variable _elemParent
     *
     * @type {*}
     */
    get _elemParent() {
        return this._elemParent;
    }

    /**
     * Définie la valeur de la variable _libelle par la valeur donné
     */
    set _elemParent(value) {
        this._elemParent = value;
    }
    
    /**
     * Retourne le contenu du probleme Texte Principale
     *
     * @returns {string}
     */
    getTexte() {
        return this.querySelector(".nom").textContent;
    }

    /**
     * Retourne les données du Problème
     *
     * @returns {string}
     */
    getDonnee() {
        return this.querySelector(".donneesEditable").textContent;
    }

    /**
     * Retourne les résultats
     *
     * @returns {string}
     */
    getResultat() {
        return this.querySelector(".resultatEditable").textContent;
    }

    // METHODES
    
    /**
     * Affiche le Problème à l'écran
     */
    afficher() {
        let divContainerDPR = document.createElement("div");
        divContainerDPR.className = "containerDPR";
        this.appendChild(divContainerDPR);

            let divDonnees = document.createElement("div");
            divDonnees.className = "donnees";
            divContainerDPR.appendChild(divDonnees);

                let labelAccoladesGDonnes = document.createElement("label");
                labelAccoladesGDonnes.className = "accolades";
                labelAccoladesGDonnes.innerHTML = "{";
                divDonnees.appendChild(labelAccoladesGDonnes);

                let divDonneesEditable = document.createElement("div");
                divDonneesEditable.className = "donneesEditable";
                divDonneesEditable.contentEditable = "true";
                let donneesAAjouter = "";
                this._listeDonnes.forEach((donnee) => {
                    donneesAAjouter += donnee._nom + "<br>";
                });
                divDonneesEditable.innerHTML = donneesAAjouter;
                divDonnees.appendChild(divDonneesEditable);

                let labelAccoladesDDonnes = document.createElement("label");
                labelAccoladesDDonnes.className = "accolades";
                labelAccoladesDDonnes.innerHTML = "}";
                divDonnees.appendChild(labelAccoladesDDonnes);

            let divNom = document.createElement("div");
            divNom.className = "nom";
            divNom.contentEditable = "true";
            divNom.innerHTML = this._libelle;
            divContainerDPR.appendChild(divNom);

            let divResultat = document.createElement("div");
            divResultat.className = "resultat";
            divContainerDPR.appendChild(divResultat);

                let labelAccoladesGResultats = document.createElement("label");
                labelAccoladesGResultats.className = "accolades";
                labelAccoladesGResultats.innerHTML = "{";
                divResultat.appendChild(labelAccoladesGResultats);

                let divResultatsEditable = document.createElement("div");
                divResultatsEditable.className = "resultatEditable";
                divResultatsEditable.contentEditable = "true";
                let resultatsAAjouter = "";
                this._listeResultats.forEach((resultat) => {
                    resultatsAAjouter += resultat._nom + "<br>";
                });
                divResultatsEditable.innerHTML = resultatsAAjouter;
                divResultat.appendChild(divResultatsEditable);

                let labelAccoladesDResultats = document.createElement("label");
                labelAccoladesDResultats.className = "accolades";
                labelAccoladesDResultats.innerHTML = "}";
                divResultat.appendChild(labelAccoladesDResultats);

        let divDecomposition = document.createElement("div");
        divDecomposition.className = "decomposition";
        this.appendChild(divDecomposition);
    }

    /**
     * Renvoie les informations de l'instance du Probleme sous forme JSON
     *
     * @returns {{ typeElement: any; abscisse: any; ordonnee: any; libelle: string; listeDonnes: {}; listeResultats: {}; enfants: any; }}
     */
    toJSON() {
        let lstDonnees = [];
        this._listeDonnes.forEach((donnee) => {
            lstDonnees.push(donnee.toJSON());
        });

        let lstResultats = [];
        this._listeResultats.forEach((resultat) => {
            lstResultats.push(resultat.toJSON());
        });
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            libelle: this._libelle,
            listeDonnes: lstDonnees,
            listeResultats: lstResultats,
            enfants: this._elemParent.toJSON()
        };
    }

    // Retournes les enfants par ordre
    /**
     * Renvoie l'arbres des enfants du Probleme
     *
     * @param {*} [typeRechercher=ElementGraphique]
     * @returns {*}
     */
    getEnfants(typeRechercher = ElementGraphique) {
        let listeDesEnfants = [];
        for(let enfant of this._elemParent._listeElementsEnfants)
        {
            listeDesEnfants.push(enfant.element);
        }
        listeDesEnfants = PlanTravail.FiltrerElementsGraphique(listeDesEnfants, typeRechercher);
        return listeDesEnfants.sort((a, b) => a._abscisse - b._abscisse);
    }

    /**
     * Méthodes principales qui recherchent les erreurs dans l'instance de Problème
     * 
     * Liste des Erreurs :
     * 
     * 1 : Sous-problème avec données magique 
     * 2 : Données uniquement sur les problèmes 
     * 3 : Résultat non utilisé dans la suite de l’algorithme
     * 9 : Pas un égal pour l’assignation mais une flèche
     * 12 : Plus de sept actions à la suite
     * 18 : Variable dynamique
     * @param {*} listeAnomaliesPrecedent
     * @returns {{}}
     */
    rechercherAnomalies(listeAnomaliesPrecedent = []) {
        let listeAnomalies = listeAnomaliesPrecedent;
        // 1
        let donneesMagiques = ErreurDonneeMagique.detecterAnomalie(this);
        if(donneesMagiques[0]) {
            listeAnomalies.push(new ErreurDonneeMagique(this, donneesMagiques[1]));
        }
        
        // 2
        let donneesInutilisees = ErreurDonneeInutilisee.detecterAnomalie(this);
        if(donneesInutilisees[0]) {
            listeAnomalies.push(new ErreurDonneeInutilisee(this, donneesInutilisees[1]));
        }
        
        // 3
        let resultatsInutilisees = ErreurResultatInutilisee.detecterAnomalie(this);
        if(resultatsInutilisees[0]) {
            listeAnomalies.push(new ErreurResultatInutilisee(this, resultatsInutilisees[1]));
        }
        
        // 9
        if(ErreurSyntaxeAssignation.detecterAnomalie(this)) {
            listeAnomalies.push(new ErreurSyntaxeAssignation(this));
        }
    
        // 12
        let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
        if(tropDeSousElements[0]) {
            listeAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
        }
    
        // 18
        let donneesDynamiqumentTypee = AvertissementDonneeDynamiquementTypee.detecterAnomalie(this);
        if(donneesDynamiqumentTypee[0]) {
            listeAnomalies.push(new AvertissementDonneeDynamiquementTypee(this, donneesDynamiqumentTypee[1]));
        }
        super.rechercherAnomalies(listeAnomalies);
        return listeAnomalies;
    }

    /**
     * Retourne les Donnees sous Formes d'informations
     *
     * @returns {{}}
     */
    getInformationDonnee() {
        let listeDonnee = this.getDonnee().trim().split(",");
        let listeDonneeInformation = [];
        for(let Donnee of listeDonnee)
        {
            if(Donnee == "")
            {
                continue;
            }
            let i = new Information();
            i._nom = Donnee.trim();
            listeDonneeInformation.push(i);    
        }
        return listeDonneeInformation;
    }

    /**
     * Retourne les Resultat sous Formes d'informations
     *
     * @returns {{}}
     */
    getInformationResultat() {
        let listeDonnee = this.getResultat().trim().split(",");
        let listeDonneeInformation = [];
        for(let Donnee of listeDonnee)
        {
            if(Donnee == "")
            {
                continue;
            }
            let i = new Information();
            i._nom = Donnee;
            listeDonneeInformation.push(i);    
        }
        return listeDonneeInformation;
    }

    /**
     * Retourne les variables du textes sous forme de string
     *
     * @returns {string}
     */
    extraireInformationTextes() {
        let i = new Information();
        i._nom = "";
        const contenue = this.getTexte(); //' aa -> " a a " ';
        if(contenue == "")
        {
            return null;
        }
        if(contenue.includes("<-"))
        {
            let nomDeVariable = contenue.split("<-")[0].trim();
            let contenueVariable = contenue.split("<-")[1].trim();
            i._nom = nomDeVariable;
            i._type = Type.DetecterLeType(contenueVariable);
        }else
        {
            i._nom= contenue.split(".")[0];
        }
        return i;
    }
    // Retourne les variables 
    /**
     * Retourne les variables sous forme de liste
     *
     * @returns {{}}
     */
    extraireInformation() {
        let listeInformation = [];
        if(this.extraireInformationTextes())
        {
            listeInformation.push(this.extraireInformationTextes());
        }
        listeInformation = [...listeInformation,  ...this.getInformationDonnee()]; 
        listeInformation = [...listeInformation, ...this.getInformationResultat()];
        return listeInformation;
    }
    /**
     * Description placeholder
     *
     * @param {string} nameInformation
     * @returns {boolean}
     */
    include(nameInformation)
    {
        return this.getTexte().includes(nameInformation) || this.getDonnee().includes(nameInformation) || this.getResultat().includes(nameInformation);
    }


} window.customElements.define("probleme-element", Probleme);
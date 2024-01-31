/**
 * @classdesc Classe Probleme l'élément de base d'un algorithme
 * @description Crée une instance de Probleme.
 * @class Probleme
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
     * @constructor
     * @type {Information}
     * @type {ElementParent}
     * @param {number} [abscisse=0] l'abscisse
     * @param {number} [ordonnee=0] l'ordonnée
     * @param {string} [libelle=""] le libéllé du Problem
     * @param {Array<Information>} [listeDonnes=[]] Pas Utilisé
     * @param {Array<Information>} [listeResultats=[]] Pas Utilisé
     * @param {ElementParent} [elemParent=new ElementParent()] L'ElementParent du Probleme
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

        this.addEventListener('mousemove', function(e) {
            // update les liens vers les enfants
            this._elemParent._listeElementsEnfants.forEach((lien) => {
                lien.ligne.update();
            });
        });
    }

    // ENCAPSULATION
    /**
     * @description Renvoie la valeur de la variable _libelle
     *
     * @type {string}
     */
    get libelle() {
        return this.divNom.textContent;
    }

    /**
     * @description Définie la valeur de la variable _libelle par la valeur donné
     */
    set libelle(value) {
        this._libelle = value;
    }

    /**
     * @description Renvoie la valeur de la variable _listeDonnes
     *
     * @deprecated
     */
    get listeDonnes() {
        return this.divDonneesEditable.innerText.split(",");
    }

    /**
     * @description Définie la valeur de la variable _listeDonnes par la valeur donné
     * 
     * @deprecated
     */
    set _listeDonnes(value) {
        this._listeDonnes = value;
    }

    /**
     * @description Renvoie la valeur de la variable _listeResultats
     *
     * @deprecated
     */
    get listeResultats() {
        return this.divResultatsEditable.innerText.split(",");
    }

    /**
     * @description Définie la valeur de la variable _listeResultats par la valeur donné
     * 
     * @deprecated
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
     * @description Définie la valeur de la variable _libelle par la valeur donné
     */
    set _elemParent(value) {
        this._elemParent = value;
    }
    
    /**
     * @description Retourne le contenu du probleme Texte Principale
     *
     * @returns {string} Les information de la boîte
     */
    
    getTexte() {
        return this.querySelector(".nom").textContent;
    }

    replaceTexte(chaineAChercher, chaineARemplacer) {
        this.querySelector(".nom").textContent = this.querySelector(".nom").textContent.replace(new RegExp('\\b' + chaineAChercher + '\\b', 'g'), chaineARemplacer);
    }

    /**
     * @description Retourne les données du Probleme
     *
     * @returns {string} Les informations des données
     */
    getDonnee() {
        return this.querySelector(".donneesEditable").textContent;
    }
    setDonnee(value) {
        this.querySelector(".donneesEditable").textContent = value;
    }
    replaceTexteDonnee(chaineAChercher, chaineARemplacer) {
        this.querySelector(".donneesEditable").textContent = this.querySelector(".donneesEditable").textContent.replace(new RegExp('\\b' + chaineAChercher + '\\b', 'g'), chaineARemplacer);
    }
    /**
     * @description Retourne les résultats du Probleme
     *
     * @returns {string} Les informations des résultats
     */
    getResultat() {
        return this.querySelector(".resultatEditable").textContent;
    }
    setResultat(value) {
       this.querySelector(".resultatEditable").textContent = value;
    }
    replaceTexteResultat(chaineAChercher, chaineARemplacer) {
        this.querySelector(".resultatEditable").textContent = this.querySelector(".resultatEditable").textContent.replace(new RegExp('\\b' + chaineAChercher + '\\b', 'g'), chaineARemplacer);
    }

    // METHODES
    
    /**
     * @description Affiche le Problème à l'écran
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
                labelAccoladesGDonnes.style.display = "none";
                divDonnees.appendChild(labelAccoladesGDonnes);

                this.divDonneesEditable = document.createElement("div");
                this.divDonneesEditable.className = "donneesEditable";
                this.divDonneesEditable.contentEditable = "true";
                let donneesAAjouter = "";
                this._listeDonnes.forEach((donnee) => {
                    if(!donneesAAjouter == "")
                    {
                        donneesAAjouter += ",";
                    }
                    donneesAAjouter += donnee._nom;
                });
                this.divDonneesEditable.innerHTML = donneesAAjouter;
                divDonnees.appendChild(this.divDonneesEditable);

                let labelAccoladesDDonnes = document.createElement("label");
                labelAccoladesDDonnes.className = "accolades";
                labelAccoladesDDonnes.innerHTML = "}";
                labelAccoladesDDonnes.style.display = "none";
                divDonnees.appendChild(labelAccoladesDDonnes);

                this.divDonneesEditable.addEventListener("input", (e) => {
                    if (verbose) console.log(e);
                    if (this.divDonneesEditable.textContent == "") {
                        for (let accolade of this.getElementsByClassName('donnees')[0].getElementsByClassName('accolades')) {
                            accolade.style.display = "none";
                            if (verbose) console.log("cacher les accolades");
                        }
                    } else {
                        for (let accolade of this.getElementsByClassName('donnees')[0].getElementsByClassName('accolades')) {
                            accolade.style.display = "";
                            if (verbose) console.log("afficher les accolades");
                        }
                    }
                });

            this.divNom = document.createElement("div");
            this.divNom.className = "nom";
            this.divNom.contentEditable = "true";
            this.divNom.innerHTML = this._libelle;
            divContainerDPR.appendChild(this.divNom);

            let divResultat = document.createElement("div");
            divResultat.className = "resultat";
            divContainerDPR.appendChild(divResultat);

                let labelAccoladesGResultats = document.createElement("label");
                labelAccoladesGResultats.className = "accolades";
                labelAccoladesGResultats.innerHTML = "{";
                labelAccoladesGResultats.style.display = "none";
                divResultat.appendChild(labelAccoladesGResultats);

                this.divResultatsEditable = document.createElement("div");
                this.divResultatsEditable.className = "resultatEditable";
                this.divResultatsEditable.contentEditable = "true";
                let resultatsAAjouter = "";
                this._listeResultats.forEach((resultat) => {
                    if(!resultatsAAjouter == "")
                    {
                        resultatsAAjouter += ",";
                    }
                    resultatsAAjouter += resultat._nom;
                });
                this.divResultatsEditable.innerHTML = resultatsAAjouter;
                divResultat.appendChild(this.divResultatsEditable);

                let labelAccoladesDResultats = document.createElement("label");
                labelAccoladesDResultats.className = "accolades";
                labelAccoladesDResultats.innerHTML = "}";
                labelAccoladesDResultats.style.display = "none";
                divResultat.appendChild(labelAccoladesDResultats);

                this.divResultatsEditable.addEventListener("input", (e) => {
                    if (verbose) console.log(e);
                    if (this.divResultatsEditable.textContent == "") {
                        for (let accolade of this.getElementsByClassName('resultat')[0].getElementsByClassName('accolades')) {
                            accolade.style.display = "none";
                            if (verbose) console.log("cacher les accolades");
                        }
                    } else {
                        for (let accolade of this.getElementsByClassName('resultat')[0].getElementsByClassName('accolades')) {
                            accolade.style.display = "";
                            if (verbose) console.log("afficher les accolades");
                        }
                    }
                });
    }

    /**
     * @description Renvoie les informations de l'instance du Probleme sous forme JSON
     *
     * @type {ElementGraphique}
     * @returns {JSON}
     * @property {*} typeElement le type de l'ElementGraphique
     * @property {number|string} abscisse l'abscisse
     * @property {number|string} ordonee l'ordonnée
     * @property {string} libelle Le libellée du Probleme
     * @property {Array} listeDonnee obselète
     * @property {Array} listeResultats obselète
     * @property {ElementGraphique} enfants la liste des enfants directes
     */
    toJSON() {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            libelle: this.libelle,
            listeDonnes: this.listeDonnes,
            listeResultats: this.listeResultats,
            enfants: this._elemParent.toJSON()
        };
    }

    /**
     * @description Renvoie l'arbres des enfants du Probleme par ordre
     *
     * @type {ElementGraphique}
     * @param {ElementGraphique} [typeRechercher=ElementGraphique] Le type d'ElementGraphique recherché
     * @returns {Array<typeRechercher>} La liste des enfants du type rechercher
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
     * @description Méthodes principales qui recherchent les erreurs dans l'instance de Problème<br>
     * Liste des Erreurs :<br>
     * 1 : Sous-problème avec données magique<br> 
     * 2 : Données uniquement sur les problèmes<br> 
     * 3 : Résultat non utilisé dans la suite de l’algorithme<br>
     * 9 : Pas un égal pour l’assignation mais une flèche<br>
     * 12 : Plus de sept actions à la suite<br>
     * 18 : Variable dynamique<br>
     * @param {Array<AnomalieConceptuelle>} listeAnomaliesPrecedent la liste des anomalies présent dans les ElementGraphique précédant
     * @returns {Array<AnomalieConceptuelle>} La liste précédante en rajoutant ce du Probleme actuelle
     */
    rechercherAnomalies() {
        let mesAnomalies = [];
        // 1
        let donneesMagiques = ErreurDonneeMagique.detecterAnomalie(this);
        if(donneesMagiques[0]) {
            mesAnomalies.push(new ErreurDonneeMagique(this, donneesMagiques[1]));
        }
        
        // 2
        let donneesInutilisees = ErreurDonneeInutilisee.detecterAnomalie(this);
        if(donneesInutilisees[0]) {
            mesAnomalies.push(new ErreurDonneeInutilisee(this, donneesInutilisees[1]));
        }
        
        // 3
        let resultatsInutilisees = ErreurResultatInutilisee.detecterAnomalie(this);
        if(resultatsInutilisees[0]) {
            mesAnomalies.push(new ErreurResultatInutilisee(this, resultatsInutilisees[1]));
        }
        
        // 9
        if(ErreurSyntaxeAssignation.detecterAnomalie(this)) {
            mesAnomalies.push(new ErreurSyntaxeAssignation(this));
        }
    
        // 12
        let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
        if(tropDeSousElements[0]) {
            mesAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
        }
    
        // 18
        let donneesDynamiqumentTypee = AvertissementDonneeDynamiquementTypee.detecterAnomalie(this);
        if(donneesDynamiqumentTypee[0]) {
            mesAnomalies.push(new AvertissementDonneeDynamiquementTypee(this, donneesDynamiqumentTypee[1]));
        }

        return super.rechercherAnomalies(mesAnomalies);
    }

    /**
     * @description Retourne les Donnees sous Formes d'informations
     *
     * @type {Information}
     * @returns {Array<Information>} La liste des données du problèmes du type Information
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
     * @description Retourne les Resultat sous Formes d'informations
     *
     * @type {Information}
     * @returns {Array<Information>} La liste des résultats du problème du type Information
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
     * @description Retourne les variables du textes sous forme de string
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
        }
        return i;
    }

    colorierElement() {
        this.querySelector(".donnees").style.color = this._couleurPrimaire;
        this.querySelector(".resultat").style.color = this._couleurPrimaire;
        this.querySelector(".nom").style.borderColor = this._couleurPrimaire;
    }

    // Retourne les variables 
    /**
     * @description Retourne les variables sous forme de liste
     *
     * @returns {Array} liste des variables
     */
    getTailleAbscisse()
    {
        return 30;
    }
    getTailleOrdonnee() {
        return 5;
    }
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
     * @description Regarde si la chaine donnée est dans le problème
     *
     * @param {string} nameInformation La chaine de caractère à chercher
     * @returns {boolean} true si trouvé faux sinon
     */
    include(nameInformation)
    {
        return this.getTexte().includes(nameInformation) || this.getDonnee().includes(nameInformation) || this.getResultat().includes(nameInformation);
    }
    renameInformation(ancienNom, nouveauNom)
    {
        this.replaceTexte(ancienNom, nouveauNom);
        this.replaceTexteDonnee(ancienNom, nouveauNom);
        this.replaceTexteResultat(ancienNom, nouveauNom);
    }

    peutEtreDecompose() {
        return true;
    }

} window.customElements.define("probleme-element", Probleme);
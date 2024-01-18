class StructureIterative extends ElementGraphique {
    // ATTRIBUTS
    _elemParent; // ElementParent (liste des enfants)

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, elemParent = new ElementParent()) {
        super(abscisse, ordonnee);
        this._elemParent = elemParent;
        if (this._elemParent != null) {
            elemParent._leProprietaire = this;
        }
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        let imgBoucleSVG = document.createElement("img");
        imgBoucleSVG.className = "boucleSVG";
        imgBoucleSVG.src = "assets/boucle.svg";
        this.appendChild(imgBoucleSVG);
    }
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

    getInformationResultat() {
        let listeDonnee = [];
        return listeDonnee;
    }
    getInformationDonnee() {
        let listeDonnee = [];
        if(this.getParent())
        {
            listeDonnee = [...listeDonnee, ...this.getParent().getInformationDonnee()];
            for(let enfant of this.getParent().getEnfants())
            {
                if(enfant === this)
                {
                    break;
                }
                listeDonnee = [...listeDonnee, ...enfant.getInformationResultat()];
            }
        }
        else{
            console.log("Boucle sans parents")
        }
        return listeDonnee;
    }
}
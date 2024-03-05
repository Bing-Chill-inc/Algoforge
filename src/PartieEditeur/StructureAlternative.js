/**
 * @class StructureAlternative
 * @classdesc Représente les différentes structure de contrôle
 * @description Est utilisé par les différentes structure de contrôle pour les instancier
 * @extends {ElementGraphique}
 */
class StructureAlternative extends ElementGraphique {
    // ATTRIBUTS 
    _listeConditions; // HTML Collection de Condition•s
    _editeur = document.querySelector("editeur-interface"); // Editeur

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
    getEnfants(typeRechercher = ElementGraphique) {
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
        condition._structure = this;
        this._listeConditions.appendChild(condition);
        this._editeur.ajouterEvenement(new EvenementCreationElement(condition, this._listeConditions));
    }

    /**
     * @description Retire une condition de la structure alternative
     * 
     * @param {Condition} condition 
     */
    supprimerCondition(condition = null) {
        if(this._listeConditions.children.length == 1) {
            return; // On ne peut pas supprimer la dernière condition
        }
        if (condition instanceof Condition) {
            this._editeur.ajouterEvenement(new EvenementSuppressionElement(condition));
            condition._elemParent.delierTousLesEnfants()
            this._listeConditions.removeChild(condition);
        } else {
            // Parcourons les conditions de la droite vers la gauche et retirons la première qui est vide
            for (let i = this._listeConditions.children.length - 1; i >= 0; i--) {
                if (this._listeConditions.children[i]._libelle == "") {
                    this._listeConditions.children[i]._elemParent.delierTousLesEnfants();
                    this._listeConditions.removeChild(this._listeConditions.children[i]);
                    break;
                }
            }
        }
    }

    getTailleAbscisse() {
        let rect = this.getBoundingClientRect();

        // Calculez la largeur en unité vw
        let largeurEnVw = ((rect.right - rect.left) / window.innerWidth * 100);
        return largeurEnVw;
    }
    getTailleOrdonnee() {
        return 4;
    }


    decalerCondition(pCondition, decalage, estAnnulation = false) {
        if (!estAnnulation) this._editeur.ajouterEvenement(new EvenementDeplacementCondition(pCondition, decalage));
        if(decalage == -1 && pCondition instanceof Condition) {
            // Décaler la condition vers la gauche
            let autreCondition = pCondition.previousElementSibling;
            if(autreCondition != null) {
                pCondition.style.animation = "jumpOverLeft var(--specialTransitionTime) ease-in-out";
                autreCondition.style.animation = "slideUnderRight var(--specialTransitionTime) ease-in-out";
                setTimeout(() => {
                    pCondition.parentElement.insertBefore(pCondition, autreCondition);
                    pCondition.style.animation = "";
                    autreCondition.style.animation = "";
                    // update les liens vers les enfants
                    pCondition._elemParent._listeElementsEnfants.forEach((lien) => {
                        lien.ligne.update();
                    });

                    autreCondition._elemParent._listeElementsEnfants.forEach((lien) => {
                        lien.ligne.update();
                    });
                }, parseFloat(document.body.style.getPropertyValue("--specialTransitionTime"))*1000);
            }
        } else if (decalage == 1 && pCondition instanceof Condition) {
            // Décaler la condition vers la droite
            let autreCondition = pCondition.nextElementSibling;
            if(autreCondition != null) {
                pCondition.style.animation = "jumpOverRight var(--specialTransitionTime) ease-in-out";
                autreCondition.style.animation = "slideUnderLeft var(--specialTransitionTime) ease-in-out";
                setTimeout(() => {
                    pCondition.parentElement.insertBefore(autreCondition, pCondition);
                    pCondition.style.animation = "";
                    autreCondition.style.animation = "";
                    pCondition._elemParent._listeElementsEnfants.forEach((lien) => {
                        lien.ligne.update();
                    });

                    autreCondition._elemParent._listeElementsEnfants.forEach((lien) => {
                        lien.ligne.update();
                    });
                }, parseFloat(document.body.style.getPropertyValue("--specialTransitionTime"))*1000);
            }
        }
    }

    ajouterConditionParRapportA(pCondition, decalage, estAnnulation = false) {
        if(decalage == -1 && pCondition instanceof Condition) {
            // Ajouter une condition à gauche
            let newCondition = new Condition();
            newCondition._structure = this;
            this._listeConditions.insertBefore(newCondition, pCondition);
            if (!estAnnulation) this._editeur.ajouterEvenement(new EvenementCreationElement(newCondition, this._listeConditions));
        } else if (decalage == 1 && pCondition instanceof Condition) {
            // Ajouter une condition à droite
            let newCondition = new Condition();
            newCondition._structure = this;
            this._listeConditions.insertBefore(newCondition, pCondition.nextElementSibling);
            if (!estAnnulation) this._editeur.ajouterEvenement(new EvenementCreationElement(newCondition, this._listeConditions));
        }
        setTimeout(() => {
            // update les liens vers les enfants
            pCondition._elemParent._listeElementsEnfants.forEach((lien) => {
                lien.ligne.update();
            });
        }, 200);
    }

    supprimer() {
        for (let condition of this._listeConditions.children) {
            condition._elemParent.delierTousLesEnfants();
        }
        if (this._parent != null) this._parent.delierEnfant(this);
        this.remove();
    }

    getEnfantsParCondition() {
        let listeEnfants = [];
        for(let condition of this._listeConditions.children)
        {
            for(let elem of condition._elemParent._listeElementsEnfants)
            {
                listeEnfants.push([condition, elem.element]);
            }
        }
        return listeEnfants;
    }
}
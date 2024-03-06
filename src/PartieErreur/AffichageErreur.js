class AffichageErreur extends HTMLElement {
    _boutton;
    _listeErreur;
    _courant;
    _divErreur;
    constructor() {
        super();
        this.afficherBoutton();
    }

    afficherBoutton() {
        // Création du bouton
        this._boutton = document.createElement('button');
        this._boutton.textContent = 'Afficher Erreur';
        
        // Ajout d'un écouteur d'événements au bouton
        this._boutton.addEventListener('click', () => {
            if (this._divErreur) {
                this.supprimerDivErreur();
            }else {
                this._listeErreur = document.querySelector("plan-travail").rechercherAnomalies();
                this.creerDivErreur();
            }

        });
        
        // Ajout du bouton à l'élément affichage-erreur-element
        this.appendChild(this._boutton);
    }

    creerDivErreur() {
        //Initialisation courant a 0
        this._courant = 0;
        // Création de la div pour afficher l'erreur
        this._divErreur = document.createElement('div');
        this._divErreur.classList.add('erreur-container');
        
        // Création de l'élément p pour afficher le texte d'erreur
        const texteErreur = document.createElement('p');
        texteErreur.textContent = 'Erreur: Ceci est un exemple d\'erreur.';
        
        // Création de la flèche gauche pour parcourir la liste des erreurs
        const flecheGauche = document.createElement('span');
        flecheGauche.textContent = '←';
        flecheGauche.classList.add('fleche');
        
        // Ajout d'un écouteur d'événements à la flèche
        flecheGauche.addEventListener('click', () => {
            // Action à effectuer lors du clic sur la flèche
            this._courant--;
            if(this._courant < 0)
            {
                this._courant = 0;
            }
            this.afficherSelectionErreur();
        });
        // Création de la flèche droite pour parcourir la liste des erreurs
        const flecheDroite = document.createElement('span');
        flecheDroite.textContent = '→';
        flecheDroite.classList.add('fleche');
        
        // Ajout d'un écouteur d'événements à la flèche
        flecheDroite.addEventListener('click', () => {
            this._courant++;
            if(this._courant >= this._listeErreur.length)
            {
                this._courant = this._listeErreur.length-1;
            }
            this.afficherSelectionErreur();
        });

        
        // Création du bouton pour supprimer la div d'erreur
        const bouttonSupprimer = document.createElement('button');
        bouttonSupprimer.textContent = 'Supprimer';
        bouttonSupprimer.classList.add('boutton-supprimer');
        bouttonSupprimer.addEventListener('click', () => {
            this.supprimerDivErreur();
        });
        
        // Ajout du texte, de la flèche et du bouton supprimer à la div d'erreur
        this._divErreur.appendChild(texteErreur);
        this._divErreur.appendChild(flecheGauche);
        this._divErreur.appendChild(flecheDroite);
        this._divErreur.appendChild(document.createElement('br'));
        this._divErreur.appendChild(bouttonSupprimer);
        
        // Ajout de la div d'erreur à l'élément affichage-erreur-element
        this.appendChild(this._divErreur);
        this.afficherSelectionErreur();
    }

    afficherSelectionErreur()
    {
        if(!this._listeErreur)
        {
            this.querySelector("p").textContent = "Aucune erreur trouvé";
            
        }
        else if(this._listeErreur.length == 0)
        {
            this.querySelector("p").textContent = "Aucune erreur trouvé";
        }
        else
        {
            this.querySelector("p").textContent = this._listeErreur[this._courant].toString();
        }
    }

    supprimerDivErreur() {
        if (this._divErreur) {
            this.removeChild(this._divErreur);
            this._divErreur = null;
        }
    }
}

window.customElements.define("affichage-erreur-element", AffichageErreur);
class MenuContextuel extends HTMLElement {
    // ATTRIBUTS
    _x; // Position x
    _y; // Position y
    _selection; // Selection
    _editeur = document.querySelector("editeur-interface"); // Editeur

    // CONSTRUCTEUR
    constructor(x, y, selection) {
        super();
        // Supprimer tout menu contextuel déjà ouvert
        let menuContextuel = document.querySelectorAll("menu-contextuel");
        for (let i = 0; i < menuContextuel.length; i++) {
            menuContextuel[i].remove();
        }
        this._x = x;
        this._y = y;

        if (x > 90) {
            x = 90; // Empêcher le menu de déborder à droite
        }

        this.style.left = `calc(var(--sizeModifier) * ${x}vw)`
        this.style.top = `calc(var(--sizeModifier) * ${y}vw)`
        this._selection = selection;
        this.genererOptions();
    }

    genererOptions() {
        /*
            Il y a 3 cas de figures:
            - Aucun élément n'est sélectionné, on affiche un menu pour ajouter un élément à l'espace de travail.
            - Un seul élément est sélectionné, on affiche un menu avec des options pour cet élément spécifique.
            - Plusieurs éléments sont sélectionnés, on affiche un menu avec des options pour ces éléments (donc des options communes).
        */
        if (this._selection.nbElementsSelectionnes == 0) {
            let ajouterElem = new ElementMenuCompose('Ajouter un élément', () => {
                console.log('Ajouter un élément');
            })
            this.appendChild(ajouterElem);

            ajouterElem.ajouterElementMenu(new ElementMenu('Problème', () => {
                console.log('Ajouter un Problème');
                this._editeur._espacePrincipal.ajouterElement(Probleme, this._x, this._y, true);
                this.remove();
            }));

            ajouterElem.ajouterElementMenu(new ElementMenu('Procédure', () => {
                console.log('Ajouter une Procédure');
                this._editeur._espacePrincipal.ajouterElement(Procedure, this._x, this._y, true);
                this.remove();
            }));

            ajouterElem.ajouterElementMenu(new ElementMenu('Structure \'SI\'', () => {
                console.log('Ajouter une Structure \'SI\'');
                this._editeur._espacePrincipal.ajouterElement(StructureSi, this._x, this._y, true);
                this.remove();
            }));

            ajouterElem.ajouterElementMenu(new ElementMenu('Structure \'SWITCH\'', () => {
                console.log('Ajouter une Structure \'SWITCH\'');
                this._editeur._espacePrincipal.ajouterElement(StructureSwitch, this._x, this._y, true);
                this.remove();
            }));

            ajouterElem.ajouterElementMenu(new ElementMenu('Structure itérative non bornée', () => {
                console.log('Ajouter une Structure itérative non bornée');
                this._editeur._espacePrincipal.ajouterElement(StructureIterativeNonBornee, this._x, this._y, true);
                this.remove();
            }));

            ajouterElem.ajouterElementMenu(new ElementMenu('Structure itérative bornée', () => {
                console.log('Ajouter une Structure itérative bornée');
                this._editeur._espacePrincipal.ajouterElement(StructureIterativeBornee, this._x, this._y, true);
                this.remove();
            }));

            ajouterElem.ajouterElementMenu(new ElementMenu('Instruction d\'arrêt', () => {
                console.log('Ajouter une Condition de sortie');
                this._editeur._espacePrincipal.ajouterElement(ConditionSortie, this._x, this._y, true);
                this.remove();
            }));
        } else if (this._selection.nbElementsSelectionnes == 1) {
            let elem = this._selection._listeElementsSelectionnes[0]._element;
            if (verbose) console.log(elem);
            for (let optionContextuelle of elem.genererOptionsContextuelles(this._selection)) {
                this.appendChild(optionContextuelle);
            }
        }

        if (this._selection.nbElementsSelectionnes >= 1) {
            this.appendChild(new ElementMenu('Supprimer', () => {
                console.log('Supprimer l\'élément');
                this._selection.supprimerTout();
                this.remove();
            }));
        }
    }
} window.customElements.define("menu-contextuel", MenuContextuel);
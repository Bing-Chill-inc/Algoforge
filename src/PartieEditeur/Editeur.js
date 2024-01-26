/**
 * @class Editeur
 * @classdesc La classe Editeur est l'interface de notre éditeur, elle permet de créer des éléments graphiques et de les manipuler.<br>
 * @description Est utilisé pour instancier l'Éditeur (il ne doit y en avoir qu'un).<br>
 * @extends {HTMLElement}
 */
class Editeur extends HTMLElement {
    // ATTRIBUTS
    _currentTool = null;
    _listeTools = [];
    _typesElements = [];
    _boutonPointeur = null;
    _undoButton = null;
    _redoButton = null;
    _pointePrecedementLien = null;

    constructor() {
        super();

        // Référencement des types d'éléments que l'on peut créer
        this._typesElements.push(Probleme);
        this._typesElements.push(Procedure);
        this._typesElements.push(StructureSi);
        this._typesElements.push(StructureSwitch);
        this._typesElements.push(StructureIterativeNonBornee);
        this._typesElements.push(ConditionSortie);

        // Référencement des éléments d'interface
        this._boutonPointeur = document.querySelector('#boutonPointeur');

        this._listeTools.push(document.querySelector('#boutonProbleme'));
        this._listeTools.push(document.querySelector('#boutonProcedure'));
        this._listeTools.push(document.querySelector('#boutonStructureSi'));
        this._listeTools.push(document.querySelector('#boutonStructureSwitch'));
        this._listeTools.push(document.querySelector('#boutonStructureIterative'));
        this._listeTools.push(document.querySelector('#boutonConditionSortie'));
        this._listeTools.push(document.querySelector('#boutonLien'));

        this._undoButton = document.querySelector('#boutonUndo');
        this._redoButton = document.querySelector('#boutonRedo');

        // Gestion des événements de l'interface
        this._listeTools.forEach((tool, index) => {
            tool.addEventListener('click', () => {
                this.selectTool(index);
            });

            tool.addEventListener('dragstart', (event) => {
                if (verbose) console.log(event);
                event.dataTransfer.setData('text/plain', this._typesElements[index].prototype.constructor.name);
            });
        });

        this._boutonPointeur.addEventListener('click', () => {
            this.selectTool(-1);
        });

        // Gestion des raccourcis clavier
        document.body.addEventListener('keydown', (e) => {
            if (verbose) console.log(e);
            if (e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
                // Raccourcis clavier en Ctrl + ...
                if (e.key === 'z') {
                    // Ctrl + Z
                    this.undo();
                }
                if (e.keyCode === 64) {
                    // Ctrl + # / ^2
                    this.selectTool(-1);
                }

                if (e.keyCode === 49) {
                    // Ctrl + 1
                    this.selectTool(0);
                }
                if (e.keyCode === 50) {
                    // Ctrl + 2
                    this.selectTool(1);
                }
                if (e.keyCode === 51) {
                    // Ctrl + 3
                    this.selectTool(2);
                }
                if (e.keyCode === 52) {
                    // Ctrl + 4
                    this.selectTool(3);
                }
                if (e.keyCode === 53) {
                    // Ctrl + 5
                    this.selectTool(4);
                }
                if (e.keyCode === 54) {
                    // Ctrl + 6
                    this.selectTool(5);
                }
                if (e.keyCode === 55) {
                    // Ctrl + 7
                    this.selectTool(6);
                }

                // Gestion du zoom
                if (e.key === '+' || e.key === '=') {
                    // Ctrl + +
                    document.body.style.setProperty('--sizeModifier', parseFloat(document.body.style.getPropertyValue('--sizeModifier')) + 0.1);
                }
                if (e.key === '-') {
                    // Ctrl + -
                    document.body.style.setProperty('--sizeModifier', parseFloat(document.body.style.getPropertyValue('--sizeModifier')) - 0.1);
                }
            }
        });

        // Gestion des clics sur l'éditeur
        this.addEventListener('click', (e) => {
            if (this._currentTool == null || this._currentTool === -1) {
                return;
            }
            if (verbose) console.log(e);
            // Remonter le DOM depuis e.target pour obtenir un élément utilisable
            let maTarget = e.target;
            while (!(maTarget instanceof ElementGraphique) && !(maTarget instanceof PlanTravail) && !(maTarget instanceof Condition) && maTarget !== null) {
                maTarget = maTarget.parentElement;
            }
            if (verbose) console.log(maTarget);
            if(maTarget instanceof PlanTravail) {
                console.log('Clic sur le plan de travail');
                if (verbose) console.log('currentTool = ' + this._currentTool + ' et typesElements.length = ' + this._typesElements.length);
                if (this._currentTool !== null && this._currentTool < this._typesElements.length) {
                    let element = this._typesElements[this._currentTool];
                    if (verbose) console.log('Création d\'un élément de type ' + element.name);
                    maTarget.ajouterElement(element, e.offsetX, e.offsetY, false);
                }
            } else if (maTarget instanceof ElementGraphique || maTarget instanceof Condition) {
                console.log('Clic sur un élément graphique');
                if (this._currentTool === 6) {
                    if (this._pointePrecedementLien === null) {
                        if (verbose) console.log('Premier clic sur un élément, on le pointe s\il peut être décomposé');
                        if (maTarget.peutEtreDecompose()) {
                            this._pointePrecedementLien = maTarget;
                            maTarget.classList.add('pointePourLien');
                            if (verbose) console.log('On pointe l\'élément ' + this._pointePrecedementLien.constructor.name);
                        }
                    } else {
                        if (this._pointePrecedementLien == maTarget) {
                            // Les éléments sont les mêmes, on ne fait rien
                            this._pointePrecedementLien.classList.remove('pointePourLien');
                            this._pointePrecedementLien = null;
                        } else {
                            // Les éléments sont différents, la connexion peut être faite
                            this._pointePrecedementLien.classList.remove('pointePourLien');
                            this._pointePrecedementLien._elemParent.lierEnfant(maTarget);
                            this._pointePrecedementLien = null;
                        }
                    }
                }
            }
        });
    }


    selectTool(idTool) {
        this._currentTool = idTool;
        this._listeTools.forEach((tool) => {
            tool.classList.remove('selected');
            this._boutonPointeur.classList.remove('selected');
        });
        if (idTool !== -1) {
            this._listeTools[idTool].classList.add('selected');
        } else {
            this._boutonPointeur.classList.add('selected');
        }

    }
} window.customElements.define('editeur-interface', Editeur);
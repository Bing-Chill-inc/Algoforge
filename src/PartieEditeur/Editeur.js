/**
 * @class Editeur
 * @classdesc La classe Editeur est l'interface de notre éditeur, elle permet de créer des éléments graphiques et de les manipuler.<br>
 * @description Est utilisé pour instancier l'Éditeur (il ne doit y en avoir qu'un).<br>
 * @extends {HTMLElement}
 */
class Editeur extends HTMLElement {
    // ATTRIBUTS
    _currentTool = -1;
    _listeTools = [];
    _typesElements = [];
    _boutonPointeur = null;
    _undoButton = null;
    _redoButton = null;
    _pointePrecedementLien = null;
    _menuDeroulantFichier = null;
    _menuDeroulantEdition = null;
    _menuDeroulantAide = null;
    _espacePrincipal = null;
    _selection = new Selection();
    _selectionRectangle = new SelectionRectangle();
    _coordonneesSelection = {x: 0, y:0}
    _isSelecting = false;
    _isDragging = false;
    _offsetX = 0;
    _offsetY = 0;
    _lastPosX = 0;
    _lastPosY = 0;

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
        this._espacePrincipal = document.querySelector('#espacePrincipal');
        this._espacePrincipal.appendChild(this._selection);
        this._espacePrincipal.appendChild(this._selectionRectangle);

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

        this._menuDeroulantFichier = document.querySelector('#menuDeroulantFichier');
        this._menuDeroulantEdition = document.querySelector('#menuDeroulantEdition');
        this._menuDeroulantAide = document.querySelector('#menuDeroulantAide');

        // Ajout des éléments de menu
        // Fichier
        this._menuDeroulantFichier.ajouterElementMenu(new ElementMenu('Nouveau', () => {
            console.log('Nouveau');
        }));
        this._menuDeroulantFichier.ajouterElementMenu(new ElementMenu('Créer une copie', () => {
            console.log('Créer une copie');
        }));
        this._menuDeroulantFichier.ajouterElementMenu(new ElementMenu('Partager', () => {
            console.log('Partager');
        }));
        this._menuDeroulantFichier.ajouterElementMenu(new ElementMenu('Renommer', () => {
            console.log('Renommer');
        }));
        let exporter = new ElementMenuCompose('Exporter', () => {
            console.log('Exporter');
        })
        this._menuDeroulantFichier.ajouterElementMenu(exporter);

        let sousTitreGénéral = document.createElement('h3');
        sousTitreGénéral.innerText = 'Tout';
        exporter.ajouterElementMenu(sousTitreGénéral);

        exporter.ajouterElementMenu(new ElementMenu('.json', () => {
            console.log('Exporter en .json');
            console.log(JSON.stringify(this._espacePrincipal.exporterEnJSON()));
        }));

        let sousTitreAlgorithme = document.createElement('h3');
        sousTitreAlgorithme.innerText = 'Algorithme';
        exporter.ajouterElementMenu(sousTitreAlgorithme);

        exporter.ajouterElementMenu(new ElementMenu('.png', () => {
            console.log('Exporter en .png');
        }));

        exporter.ajouterElementMenu(new ElementMenu('.jpg', () => {
            console.log('Exporter en .jpg');
        }));

        exporter.ajouterElementMenu(new ElementMenu('.svg', () => {
            console.log('Exporter en .svg');
        }));

        exporter.ajouterElementMenu(new ElementMenu('.pdf', () => {
            console.log('Exporter en .pdf');
        }));

        let sousTitreDictionnaire = document.createElement('h3');
        sousTitreDictionnaire.innerText = 'Dictionnaire';
        exporter.ajouterElementMenu(sousTitreDictionnaire);

        exporter.ajouterElementMenu(new ElementMenu('.xls', () => {
            console.log('Exporter en .xls');
        }));

        exporter.ajouterElementMenu(new ElementMenu('.csv', () => {
            console.log('Exporter en .csv');
        }));

        exporter.ajouterElementMenu(new ElementMenu('.md', () => {
            console.log('Exporter en .md');
        }));

        this._menuDeroulantFichier.ajouterElementMenu(new ElementMenu('Supprimer', () => {
            console.log('Supprimer');
        }));

        // Edition
        this._menuDeroulantEdition.ajouterElementMenu(new ElementMenuKeyboardTip('Annuler', () => {
            console.log('Annuler');
            this.undo();
        }, 'Ctrl + Z'));

        this._menuDeroulantEdition.ajouterElementMenu(new ElementMenuKeyboardTip('Rétablir', () => {
            console.log('Rétablir');
            this.redo();
        }, 'Ctrl + Y'));

        this._menuDeroulantEdition.ajouterElementMenu(new ElementMenuKeyboardTip('Couper', () => {
            console.log('Couper');
            this.cut();
        }, 'Ctrl + X'));

        this._menuDeroulantEdition.ajouterElementMenu(new ElementMenuKeyboardTip('Copier', () => {
            console.log('Copier');
            this.copy();
        }, 'Ctrl + C'));

        this._menuDeroulantEdition.ajouterElementMenu(new ElementMenuKeyboardTip('Coller', () => {
            console.log('Coller');
            this.paste();
        }, 'Ctrl + V'));

        this._menuDeroulantEdition.ajouterElementMenu(new ElementMenuKeyboardTip('Sélectionner tout', () => {
            console.log('Sélectionner tout');
            this.selectAll();
        }, 'Ctrl + A'));

        this._menuDeroulantEdition.ajouterElementMenu(new ElementMenuKeyboardTip('Supprimer', () => {
            console.log('Supprimer');
            this.delete();
        }, 'Suppr'));

        this._menuDeroulantEdition.ajouterElementMenu(new ElementMenuKeyboardTip('Rechercher', () => {
            console.log('Rechercher');
            this.search();
        }, 'Ctrl + F'));

        // Aide
        this._menuDeroulantAide.ajouterElementMenu(new ElementMenu('Tutoriels', () => {
            console.log('Tutoriels');
        }));

        this._menuDeroulantAide.ajouterElementMenu(new ElementMenu('Raccourcis clavier', () => {
            console.log('Raccourcis clavier');
        }));

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

        this._undoButton.addEventListener('click', () => {
            this.undo();
        });

        this._redoButton.addEventListener('click', () => {
            this.redo();
        });

        this._boutonPointeur.addEventListener('click', () => {
            this.selectTool(-1);
        });

        // Gestion des raccourcis clavier
        document.body.addEventListener('keydown', (e) => {
            if (verbose) console.log(e);
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
                // Raccourcis clavier en Ctrl + ... pour les outils
                if (e.keyCode === 64) {
                    // Ctrl + # / ^2
                    e.preventDefault();
                    this.selectTool(-1);
                }

                if (e.keyCode === 49) {
                    // Ctrl + 1
                    e.preventDefault();
                    this.selectTool(0);
                }
                if (e.keyCode === 50) {
                    // Ctrl + 2
                    e.preventDefault();
                    this.selectTool(1);
                }
                if (e.keyCode === 51) {
                    // Ctrl + 3
                    e.preventDefault();
                    this.selectTool(2);
                }
                if (e.keyCode === 52) {
                    // Ctrl + 4
                    e.preventDefault();
                    this.selectTool(3);
                }
                if (e.keyCode === 53) {
                    // Ctrl + 5
                    e.preventDefault();
                    this.selectTool(4);
                }
                if (e.keyCode === 54) {
                    // Ctrl + 6
                    e.preventDefault();
                    this.selectTool(5);
                }
                if (e.keyCode === 55) {
                    // Ctrl + 7
                    e.preventDefault();
                    this.selectTool(6);
                }
                // Raccourcis clavier en Ctrl + ... pour l'édition
                if (e.key.toLowerCase() === 'z') {
                    // Ctrl + Z
                    e.preventDefault();
                    this.undo();
                }
                if (e.key.toLowerCase() ==='y') {
                    // Ctrl + Y
                    e.preventDefault();
                    this.redo();
                }
                if (e.key.toLowerCase() === 'x') {
                    // Ctrl + X
                    e.preventDefault();
                    this.cut();
                }
                if (e.key.toLowerCase() === 'c') {
                    // Ctrl + C
                    e.preventDefault();
                    this.copy();
                }
                if (e.key.toLowerCase() === 'a') {
                    // Ctrl + A
                    e.preventDefault();
                    this.selectAll();
                }
                if (e.key === 'Backspace' || e.key === 'Delete') {
                    // Suppr
                    e.preventDefault();
                    this.delete();
                }
                if (e.key.toLowerCase() === 'f') {
                    // Ctrl + F
                    e.preventDefault();
                    this.search();
                }

                // Gestion du zoom
                if (e.key === '+' || e.key === '=') {
                    // Ctrl + +
                    e.preventDefault();
                    document.body.style.setProperty('--sizeModifier', parseFloat(document.body.style.getPropertyValue('--sizeModifier')) + 0.1);
                }
                if (e.key === '-') {
                    // Ctrl + -
                    e.preventDefault();
                    document.body.style.setProperty('--sizeModifier', parseFloat(document.body.style.getPropertyValue('--sizeModifier')) - 0.1);
                }
            }
        });

        this.addEventListener('paste', ((e) => {
            if (verbose) console.log(e);
            if (verbose) console.log(e.clipboardData.getData('text/plain'));
            try {
                var parsedData = JSON.parse(e.clipboardData.getData('text/plain'));
                this.chargerDepuisJSON(parsedData);
            } catch (error) {
                console.error("Le fichier n'a pas été chargé correctement.");
                console.error(error);
            }
        }));

        // Gestion des clics sur l'éditeur
        this.addEventListener('click', (e) => {
            if (this._currentTool == null) {
                return;
            }
            if (verbose) console.log(e);
            // Remonter le DOM depuis e.target pour obtenir un élément utilisable
            let maTarget = e.target;
            // Gestion des clics  sur des éléments qui ne doivent pas être ciblés
            if(e.target.classList.contains('nonCiblable')) {
                return;
            }
            while (!(maTarget instanceof ElementGraphique) && !(maTarget instanceof PlanTravail) && !(maTarget instanceof Condition) && maTarget !== null) {
                maTarget = maTarget.parentElement;
                if (maTarget === null) {
                    return;
                }
                // Gestion des clics  sur des éléments qui ne doivent pas être ciblés
                if (verbose) console.log(maTarget);
                if (verbose) console.log(maTarget.classList);
                if (verbose) console.log(maTarget.classList.contains('nonCiblable'));
                if(maTarget.classList.contains('nonCiblable')) {
                    return;
                }
            }
            if (verbose) console.log(maTarget);
            if(maTarget instanceof PlanTravail) {
                console.log('Clic sur le plan de travail');
                if (verbose) console.log('currentTool = ' + this._currentTool + ' et typesElements.length = ' + this._typesElements.length);
                if (this._currentTool !== null && this._currentTool < this._typesElements.length && this._currentTool >= 0) {
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
                            // Si l'élément pointé précédemment est au dessus de l'élément pointé actuellement, il sera père de la relation
                            if (verbose) console.log(`this._pointePrecedementLien._ordonnee=${this._pointePrecedementLien._ordonnee} et maTarget._ordonnee=${maTarget._ordonnee}`);
                            let parentRelation, enfantRelation;
                            if (parseFloat(this._pointePrecedementLien._ordonnee) < parseFloat(maTarget._ordonnee)) {
                                parentRelation = this._pointePrecedementLien;
                                enfantRelation = maTarget;
                            } else {
                                parentRelation = maTarget;
                                enfantRelation = this._pointePrecedementLien;
                            }

                            // On crée la relation
                            // Si le fils est une condition, le lien doit se faire avec sa structure
                            if (enfantRelation instanceof Condition) {
                                enfantRelation = enfantRelation._structure;
                            }

                            // On crée le lien
                            parentRelation._elemParent.lierEnfant(enfantRelation);

                            this._pointePrecedementLien = null;
                        }
                    }
                }
            }
        });

        this.addEventListener('mousedown', function (e) {
            let maTarget = e.target;
            while (!(maTarget instanceof ElementGraphique) && !(maTarget instanceof PlanTravail) && !(maTarget instanceof Condition) && maTarget !== null) {
                maTarget = maTarget.parentElement;
                if (maTarget === null) {
                    return;
                }
                // Gestion des clics sur des éléments qui ne doivent pas être ciblés
                if (verbose) console.log(maTarget);
                if (verbose) console.log(maTarget.classList);
                if (verbose) console.log(maTarget.classList.contains('nonCiblable'));
                if(maTarget.classList.contains('nonCiblable')) {
                    return;
                }
            }
            if (maTarget instanceof Condition) {
                maTarget = maTarget._structure;
            }

            if (!e.shiftKey && !this._selection.estSelectionne(maTarget)) {
                if (verbose) console.log('Pas de shift, on désélectionne tout');
                this._selection.deselectionnerTout();
            }

            if (maTarget instanceof ElementGraphique && !this._selection.estSelectionne(maTarget)) {
                if (verbose) console.log('Sélection d\'un élément graphique');
                this._selection.selectionnerElement(maTarget);
            } else if (e.shiftKey && this._selection.estSelectionne(maTarget)) {
                this._selection.deselectionnerElement(maTarget);
            }

            if (verbose) console.log(`this._currentTool = ${this._currentTool}`)

            if (maTarget instanceof PlanTravail && this._currentTool == -1) {
                this._isSelecting = true;
                this._coordonneesSelection.x = e.clientX;
                this._coordonneesSelection.y = e.clientY;
            } else {
                this._isDragging = true;
                this._lastPosX = e.clientX;
                this._lastPosY = e.clientY;
            }
        });
        this.addEventListener('mouseup', function() {
            this._isDragging = false;
            this._isSelecting = false;
            let listeElemsASelec = this._selectionRectangle.listerElementsGraphiques();
            for (let elem of listeElemsASelec) {
                this._selection.selectionnerElement(elem);
            }
            this._selectionRectangle.placer(0, 0, 0, 0);
        });
        this.addEventListener('mousemove', function(e) {
            if (verbose) console.log(`mousemove avec ${this._isDragging}`);
            if (this._isDragging) {
                let abscisseEnPx = e.clientX;
                let ordonneeEnPx = e.clientY;
                let decalageXEnPx = abscisseEnPx - this._lastPosX;
                let decalageYEnPx = ordonneeEnPx - this._lastPosY;
                let decalageXEnVw = decalageXEnPx / window.innerWidth * 100 / parseFloat(document.body.style.getPropertyValue('--sizeModifier'));
                let decalageYEnVw = decalageYEnPx / window.innerWidth * 100 / parseFloat(document.body.style.getPropertyValue('--sizeModifier'));
                this._selection.moveAllSelectedElements(decalageXEnVw, decalageYEnVw);
                if (verbose) console.log(`Déplacement de la sélection de ${decalageXEnVw}vw en abscisse et de ${decalageYEnVw}vw en ordonnée`);
                this._lastPosX = e.clientX;
                this._lastPosY = e.clientY;
            }
            if (this._isSelecting) {
                let abscisseEnPx = e.clientX - this._espacePrincipal.getBoundingClientRect().left;
                let ordonneeEnPx = e.clientY - this._espacePrincipal.getBoundingClientRect().top;
                let abscisseEnVw = abscisseEnPx / window.innerWidth * 100;
                let ordonneeEnVw = ordonneeEnPx / window.innerWidth * 100;
                let lastXenVw = (this._coordonneesSelection.x - this._espacePrincipal.getBoundingClientRect().left) / window.innerWidth * 100;
                let lastYenVw = (this._coordonneesSelection.y - this._espacePrincipal.getBoundingClientRect().top) / window.innerWidth * 100;
                this._selectionRectangle.placer(abscisseEnVw, ordonneeEnVw, lastXenVw, lastYenVw);
            }
        });
    }

    chargerDepuisJSON(json) {
        this._espacePrincipal.chargerDepuisJSON(json);
    }


    selectTool(idTool) {
        this._currentTool = idTool;
        this._listeTools.forEach((tool) => {
            tool.classList.remove('selected');
            this._boutonPointeur.classList.remove('selected');
        });
        if (idTool != -1) {
            this._listeTools[idTool].classList.add('selected');
        } else { // Pointeur
            this._boutonPointeur.classList.add('selected');
        }

        if(idTool != 7 && this._pointePrecedementLien != null) { // Tout autre outil que le lien, on enlève la pointe de l'élément précédemment pointé
            this._pointePrecedementLien.classList.remove('pointePourLien');
            this._pointePrecedementLien = null;
        }
    }


    // Outils d'édition
    undo() {
        console.log('undo');
    }
    redo() {
        console.log('redo');
    }
    cut() {
        console.log('cut');
    }
    copy() {
        console.log('copy'); 
    }
    paste() {
        console.log('paste');
        try {
            var parsedData = JSON.parse(readFromClipboard());
            this.chargerDepuisJSON(parsedData);
        } catch (error) {
            console.error("Le fichier n'est pas au format JSON.");
        }
    }
    selectAll() {
        console.log('selectAll');
        for (let elem of this._espacePrincipal.trouverToutLesElementsGraphiques()) {
            if (elem instanceof ElementGraphique) this._selection.selectionnerElement(elem);
        }
    }
    delete() {
        console.log('delete');
        this._selection.supprimerTout();
    }
    search() {
        console.log('search');
    }
} window.customElements.define('editeur-interface', Editeur);
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
            this.exporterJSON(JSON.stringify(this._espacePrincipal.exporterEnJSON()));
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
            this.exporterSVG(this._espacePrincipal);
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
        }, 'Ctrl + Suppr'));

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

    exporterJSON(jsonString) {
        // On crée un Blob avec le contenu JSON
        var blob = new Blob([jsonString], { type: 'application/json' });
    
        // On crée un URL pour le Blob
        var url = URL.createObjectURL(blob);
    
        // On crée un élément <a> pour télécharger le fichier
        var downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${this.querySelector('#titreAlgo').innerText}.json`;
    
        // Pour des raisons de compatibilité, on simule un clic sur le lien et on le supprime après
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    
        // On supprime le Blob et l'URL pour libérer de la mémoire
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }


    // Exports
    exporterSVG(nodeToCopy) {
        console.log('exporterSVG() appelé');
        // On crée une balise style pour embarquer le style dans le fichier SVG
        var styleElement = document.createElement("style");
        var cssStyles = `
        selection-editeur {
            display: none
        }
        
        selection-simple {
            display: none
        }
        
        selection-rectangle {
            display: none;
        }
        
        plan-travail {
            width: 100vw;
            height: 100vh;
            border: 0.1vw solid #000000;
            position: relative;
            overflow: scroll;
            background-color: #FFFFFF;
            --sizeModifier: 1;
            font-family: 'Roboto', sans-serif;
            background-color: #FFFFFF;
            color: #222222;
        }
        
        probleme-element {
            display: flex;
            width: calc(var(--sizeModifier) * 30vw);
            height: fit-content;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            transition: all var(--transitionTime) ease;
            z-index: 2;
        }
        
            probleme-element > div.containerDPR {
                width: 100%;
                height: calc(var(--sizeModifier) * 4vw);
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                column-gap: calc(var(--sizeModifier) * 0.2vw);
                place-items: center;
            }
        
                probleme-element > div.containerDPR > div.donnees {
                    width: 100%;
                    height: 100%;
                    display: grid;
                    grid-template-columns: 1fr 5fr 1fr;
                    grid-template-rows: 1fr;
                    column-gap: calc(var(--sizeModifier) * 0.2vw);
                    place-items: center;
                    grid-column: 1;
                }
        
                    probleme-element > div.containerDPR > div.donnees > label.accolades {
                        font-size: calc(var(--sizeModifier) * 4vw);
                        transform: scaleX(0.75);
                    }
        
                    probleme-element > div.containerDPR > div.donnees > div.donneesEditable {
                        width: calc(var(--sizeModifier) * 6.3vw);
                        height: 100%;
                        grid-column: 2;
                        resize: none;
                        border: none;
                        background: none;
                        font-size: calc(var(--sizeModifier) * 0.75vw);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        word-wrap: break-word;
                        overflow: hidden;
                    }
        
                probleme-element > div.containerDPR > div.nom {
                    width: calc(var(--sizeModifier) * 10vw);
                    height: 100%;
                    grid-column: 2;
                    border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    text-align: center;
                    font-size: calc(var(--sizeModifier) * 0.75vw);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    word-wrap: break-word;
                    overflow: hidden;
                    background-color: #FFFFFF;
                }
        
                probleme-element > div.containerDPR > div.resultat {
                    width: 100%;
                    height: 100%;
                    display: grid;
                    grid-template-columns: 1fr 5fr 1fr;
                    grid-template-rows: 1fr;
                    column-gap: calc(var(--sizeModifier) * 0.2vw);
                    place-items: center;
                    grid-column: 3;
                }
        
                    probleme-element > div.containerDPR > div.resultat > label.accolades {
                        font-size: calc(var(--sizeModifier) * 4vw);
                        transform: scaleX(0.75);
                    }
        
                    probleme-element > div.containerDPR > div.resultat > div.resultatEditable {
                        width: calc(var(--sizeModifier) * 6.3vw);
                        height: 100%;
                        grid-column: 2;
                        resize: none;
                        border: none;
                        background: none;
                        font-size: calc(var(--sizeModifier) * 0.75vw);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        word-wrap: break-word;
                        overflow: hidden;
                    }
        
        procedure-element {
            display: flex;
            width: calc(var(--sizeModifier) * 30vw);
            height: fit-content;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            transition: all var(--transitionTime) ease;
            z-index: 2;
        }
            
            procedure-element > div.containerDPR {
                width: 100%;
                height: calc(var(--sizeModifier) * 4vw);
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                column-gap: calc(var(--sizeModifier) * 0.2vw);
                place-items: center;
            }
        
                procedure-element > div.containerDPR > div.donnees {
                    width: 100%;
                    height: 100%;
                    display: grid;
                    grid-template-columns: 1fr 5fr 1fr;
                    grid-template-rows: 1fr;
                    column-gap: calc(var(--sizeModifier) * 0.2vw);
                    place-items: center;
                    grid-column: 1;
                }
        
                    procedure-element > div.containerDPR > div.donnees > label.accolades {
                        font-size: calc(var(--sizeModifier) * 4vw);
                        transform: scaleX(0.75);
                    }
        
                    procedure-element > div.containerDPR > div.donnees > div.donneesEditable {
                        width: calc(var(--sizeModifier) * 6.3vw);
                        height: 100%;
                        grid-column: 2;
                        resize: none;
                        border: none;
                        background: none;
                        font-size: calc(var(--sizeModifier) * 0.75vw);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        word-wrap: break-word;
                        overflow: hidden;
                    }
        
                procedure-element > div.containerDPR > div.nom {
                    width: calc(var(--sizeModifier) * 8vw);
                    height: 100%;
                    grid-column: 2;
                    border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    text-align: center;
                    font-size: calc(var(--sizeModifier) * 0.75vw);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    word-wrap: break-word;
                    overflow: hidden;
                    background-color: #FFFFFF;
                }
        
                procedure-element > div.containerDPR > div.nom::before {
                    position: absolute;
                    content: "";
                    transform: translateX(calc(var(--sizeModifier) *-4.5vw));
                    width: calc(var(--sizeModifier) * 0.8vw);
                    height: calc(var(--sizeModifier) * 4vw);
                    border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    border-right: none;
                    background-color: #FFFFFF;
                }
        
                procedure-element > div.containerDPR > div.nom::after {
                    position: absolute;
                    content: "";
                    transform: translateX(calc(var(--sizeModifier) *4.5vw));
                    width: calc(var(--sizeModifier) * 0.8vw);
                    height: calc(var(--sizeModifier) * 4vw);
                    border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    border-left: none;
                    background-color: #FFFFFF;
                }
        
                procedure-element > div.containerDPR > div.resultat {
                    width: 100%;
                    height: 100%;
                    display: grid;
                    grid-template-columns: 1fr 5fr 1fr;
                    grid-template-rows: 1fr;
                    column-gap: calc(var(--sizeModifier) * 0.2vw);
                    place-items: center;
                    grid-column: 3;
                }
        
                    procedure-element > div.containerDPR > div.resultat > label.accolades {
                        font-size: calc(var(--sizeModifier) * 4vw);
                        transform: scaleX(0.75);
                    }
        
                    procedure-element > div.containerDPR > div.resultat > div.resultatEditable {
                        width: calc(var(--sizeModifier) * 6.3vw);
                        height: 100%;
                        grid-column: 2;
                        resize: none;
                        border: none;
                        background: none;
                        font-size: calc(var(--sizeModifier) * 0.75vw);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        word-wrap: break-word;
                        overflow: hidden;
                    }
        
        symbole-decomposition-element {
            position: absolute;
            transition: all var(--transitionTime) ease;
            width: calc(var(--sizeModifier) * 1vw);
            height: calc(var(--sizeModifier) * 1.5vw);
            border-left: calc(var(--sizeModifier) * 0.1vw) solid #000000;
            border-right: calc(var(--sizeModifier) * 0.1vw) solid #000000;
            border-bottom: calc(var(--sizeModifier) * 0.1vw) solid #000000;
        }
        
        structure-si-element {
            display: grid;
            grid-template-columns: 0px 1fr 0px;
            grid-template-rows: 1fr;
            width: fit-content;
            height: calc(var(--sizeModifier) * 4vw);
            position: absolute;
            place-content: center;
            place-items: center;
            transition: all var(--transitionTime) ease;
            z-index: 2;
        }
        
        structure-si-element > div.triangle {
            color: #0000;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            font-size: 3vw;
            user-select: none;
            cursor: pointer;
        }
        
            structure-si-element > div.triangleGauche {
                width: calc(var(--sizeModifier) * 2.8284271247vw); /* 4 / sqrt(2), théorème de pythagore */
                height: calc(var(--sizeModifier) * 2.8284271247vw);
                border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                border-left: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                rotate: -45deg;
                grid-column: 1;
                background-color: #FFFFFF;
                transform: translate(-2%, 2%); /* Compenser l'imprecision du rotate */
            }
        
            structure-si-element > div.triangleGauche > span {
                rotate: 45deg;
                transform: translateX(-0.7vw);
            }
        
            structure-si-element > div.conditionContainer {
                display: flex;
                width: fit-content;
                height: 100%;   
                grid-column: 2;
                flex-direction: row;
            }
        
                structure-si-element > div.conditionContainer > condition-element {
                    width: calc(var(--sizeModifier) * 10vw);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #FFFFFF;
                    border-right: calc(var(--sizeModifier) * 0.05vw) solid #000000;
                    border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    border-bottom: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                }
        
            structure-si-element > div.triangleDroit {
                width: calc(var(--sizeModifier) * 2.8284271247vw); /* 4 / sqrt(2), théorème de pythagore */
                height: calc(var(--sizeModifier) * 2.8284271247vw);
                border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                border-right: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                rotate: 45deg;
                grid-column: 3;
                background-color: #FFFFFF;
                transform: translate(2%, 2%); /* Compenser l'imprecision du rotate */
            }
        
            structure-si-element > div.triangleDroit > span {
                rotate: -45deg;
                transform: translateX(0.7vw);
            }
        
        structure-switch-element {
            display: grid;
            grid-template-columns: 0px 1fr 0px;
            grid-template-rows: 1fr 1fr;
            width: fit-content;
            height: calc(var(--sizeModifier) * 4vw);
            position: absolute;
            place-content: center;
            place-items: center;
            transition: all var(--transitionTime) ease;
            background-color: #FFFFFF;
            z-index: 2;
        }
        
            structure-switch-element > div.triangle {
                color: #0000;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                font-size: 2vw;
                user-select: none;
                cursor: pointer;
            }
        
            structure-switch-element > div.triangleGauche {
                width: calc(var(--sizeModifier) * 2.8284271247vw); /* 4 / sqrt(2), théorème de pythagore */
                height: calc(var(--sizeModifier) * 2.8284271247vw);
                border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                border-left: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                rotate: -45deg;
                grid-column: 1;
                grid-row: 1/3;
                background-color: #FFFFFF;
                transform: translate(-2%, 2%); /* Compenser l'imprecision du rotate */
            }
        
            structure-switch-element > div.triangleGauche > span {
                rotate: 45deg;
                transform: translate(-0.7vw, 30%);
            }
        
            structure-switch-element > hr.diviseurGauche {
                width: calc(var(--sizeModifier) * 4vw);
                height: calc(var(--sizeModifier) * 0.05vw);
                grid-column: 1;
                grid-row: 1/3;
                background-color: #000000;
                z-index: 1;
                transform: translateX(-50%);
                border: 0;
            }
        
            structure-switch-element > div.expressionATester {
                width: 100%;
                height: 100%;
                grid-column: 2;
                grid-row: 1;
                resize: none;
                border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                border-left: 0;
                border-right: 0;
                text-align: center;
                font-size: calc(var(--sizeModifier) * 0.75vw);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                word-wrap: break-word;
                overflow: hidden;
                background-color: #FFFFFF;
                z-index: 10;
            }
        
            structure-switch-element > div.expressionATester:focus-visible {
                outline: none;
            }
        
            structure-switch-element > div.conditionContainer {
                display: flex;
                min-width: fit-content;
                width: 100%;
                height: calc(var(--sizeModifier) * 2vw);   
                grid-column: 2;
                grid-row: 2;
                flex-direction: row;
            }
        
                structure-switch-element > div.conditionContainer > condition-element {
                    min-width: calc(var(--sizeModifier) * 10vw);
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #FFFFFF;
                    border-right: calc(var(--sizeModifier) * 0.05vw) solid #000000;
                    border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    border-bottom: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                }
        
            structure-switch-element > div.triangleDroit {
            width: calc(var(--sizeModifier) * 2.8284271247vw); /* 4 / sqrt(2), théorème de pythagore */
            height: calc(var(--sizeModifier) * 2.8284271247vw);
            border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
            border-right: calc(var(--sizeModifier) * 0.1vw) solid #000000;
            rotate: 45deg;
            grid-column: 3;
            grid-row: 1/3;
            background-color: #FFFFFF;
            transform: translate(2%, 2%); /* Compenser l'imprecision du rotate */
            }
        
            structure-switch-element > div.triangleDroit > span {
                rotate: -45deg;
                transform: translate(0.7vw, 30%);
            }
        
            structure-switch-element > hr.diviseurDroit {
                width: calc(var(--sizeModifier) * 4vw);
                height: calc(var(--sizeModifier) * 0.05vw);
                grid-column: 3;
                grid-row: 1/3;
                background-color: #000000;
                z-index: 1;
                transform: translateX(-50%);
                border: 0;
            }
        
        condition-element {
            position: relative;
            transition: all 0.2s ease-in-out;
        }
        
        condition-element > div.libelle {
            width: calc(var(--sizeModifier) * 10vw);
            height: inherit;
            resize: none;
            border: none;
            background: none;
            text-align: center;
            font-size: calc(var(--sizeModifier) * 0.75vw);
            overflow: hidden;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            word-wrap: break-word;
            overflow: hidden;
            background-color: #FFFFFF;
        }
        
        condition-element > div.libelle:focus-visible {
            outline: none;
        }
        
        condition-element > button.supprimer {
            width: calc(var(--sizeModifier) * 2vw);
            height: calc(var(--sizeModifier) * 1vw);
            border: none;
            border-radius: 0 0 999em 999em;
            background-color: var(--warningColor);
            z-index: 3;
            transition: all var(--transitionTime) ease;
            font-size: calc(var(--sizeModifier) * 1vw);
            color: #FFFFFF;
            display: none;
            position: absolute;
            top: 0;
        }
        
        condition-element > div.arrowsWrapper {
            width: calc(var(--sizeModifier) * 6vw);
            height: calc(var(--sizeModifier) * 1vw);
            border: none;
            font-size: calc(var(--sizeModifier) * 1vw);
            text-align: center;
            position: absolute;
            bottom: -1.5vw;
            user-select: none;
            cursor: pointer;
            display: none;
            padding: 0 0.5vw 0.5vw 0.5vw;
        }
        
        condition-element > div.arrowsWrapper > span {
            padding: 0.5vw;
            border-radius: 0 0 999em 999em;
        }
        
        condition-element > div.ajouterAGauche {
            display: none;
        }
        
        condition-element > div.ajouterADroite {
            display: none;
        }
        
        invite-bornes-pour-si {
            display: none;
        }
        
        structure-iterative-non-bornee-element {
            display: flex;
            flex-direction: row;
            justify-content: center;
            place-items: center;
            width: fit-content;
            height: calc(var(--sizeModifier) * 4vw);
            position: absolute;
            transition: all var(--transitionTime) ease;
            z-index: 2;
        }
            structure-iterative-non-bornee-element > svg.boucleSVG {
                width: calc(var(--sizeModifier) * 4vw);
                height: calc(var(--sizeModifier) * 4vw);
            }
        
        structure-iterative-bornee-element {
            display: flex;
            flex-direction: row;
            justify-content: center;
            place-items: center;
            width: fit-content;
            height: calc(var(--sizeModifier) * 4vw);
            position: absolute;
            transition: all var(--transitionTime) ease;
            z-index: 2;
        }
            structure-iterative-bornee-element > svg.boucleSVG {
                width: calc(var(--sizeModifier) * 4vw);
                height: calc(var(--sizeModifier) * 4vw);
            }
        
            structure-iterative-bornee-element > div.informationsBornes {
                width: calc(var(--sizeModifier) * 8vw);
                height: 100%;
                font-size: calc(var(--sizeModifier) * 1vw);
            }
        
        condition-sortie-element {
            position: absolute;
            background-image: url("assets/conditionSortie.svg");
            height: calc(var(--sizeModifier) * 4vw);
            width: calc(var(--sizeModifier) * 4vw);
            transition: all var(--transitionTime) ease;
            z-index: 2;
        }
        
        ligne-element {
            position: absolute;
            transform-origin: 0% 50%;
            margin: 0;
            padding: 0;
            border: calc(var(--sizeModifier) * 0.05vw) solid #000000;
            z-index: 0;
        }
        `;

        // On assigne le contenu de la balise style
        styleElement.textContent = cssStyles;

        let planExport = new PlanTravail();

        planExport.style.setProperty('--sizeModifier', 1);
        planExport.insertBefore(styleElement, planExport.firstChild);

        document.body.appendChild(planExport);
        planExport.chargerDepuisJSON(nodeToCopy.exporterEnJSON());
        document.body.removeChild(planExport);

        for (let imgBoucle of planExport.querySelectorAll('img.boucleSVG')) {
            if (verbose) console.log(imgBoucle);
            let element = imgBoucle.parentElement;
            let svgBoucle = document.createElement('svg');
            element.insertBefore(svgBoucle, imgBoucle);
            element.removeChild(imgBoucle);
            svgBoucle.outerHTML = `<svg class="boucleSVG" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.51 386.63">
                <defs>
                    <style>
                        .cls-1 {
                            fill: #ffffff00;
                            stroke: #838787;
                            stroke-miterlimit: 10;
                            stroke-width: 10px;
                        }
                        .cls-2 {
                            fill: #222222;
                            stroke: #838787;
                            stroke-miterlimit: 10;
                            stroke-width: 10px;
                        }
                    </style>
                </defs>
                <circle class="cls-1 " cx="193.31" cy="193.31" r="190.81"/>
                <polygon class="cls-2" points="377.88 154.61 334.58 229.61 421.18 229.61 377.88 154.61"/>
            </svg>
            `;
        }

        for (let conditionSortie of planExport.querySelectorAll('condition-sortie-element')) {
            if (verbose) console.log(conditionSortie);
            let svgConditionSortie = document.createElement('svg');
            conditionSortie.appendChild(svgConditionSortie);
            svgConditionSortie.outerHTML = `<?xml version="1.0" encoding="utf-8"?>
            <!-- Generator: Adobe Illustrator 24.3.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
            <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 320.28 319.89" style="enable-background:new 0 0 320.28 319.89;" xml:space="preserve">
            <style type="text/css">
                .st0{fill:none;stroke:#838787;stroke-width:10;stroke-miterlimit:10;}
                .st1{fill:none;stroke:#838787;stroke-width:10;stroke-linecap:round;stroke-miterlimit:10;}
            </style>
            <path class="st0" d="M294.62,312.59H25.4c-9.88,0-17.89-8.01-17.89-17.89V25.48c0-9.88,8.01-17.89,17.89-17.89h269.22
                c9.88,0,17.89,8.01,17.89,17.89V294.7C312.51,304.58,304.5,312.59,294.62,312.59z"/>
            <line class="st1" x1="106.57" y1="204.62" x2="106.57" y2="7.62"/>
            <line class="st1" x1="212.57" y1="7.62" x2="212.57" y2="204.62"/>
            <path class="st1" d="M58.95,197.57"/>
            <path class="st1" d="M58.95,197.57c-4.7,0-6.49,6.14-2.53,8.66l101.49,64.73c1.54,0.98,3.51,0.98,5.05,0l101.49-64.73
                c3.96-2.53,2.17-8.66-2.53-8.66"/>
            </svg>
            `;
        }

        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(planExport);
        var blob = new Blob([svgString], { type: 'image/svg+xml' });
        var url = URL.createObjectURL(blob);
    
        var downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${this.querySelector('#titreAlgo').innerText}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
} window.customElements.define('editeur-interface', Editeur);
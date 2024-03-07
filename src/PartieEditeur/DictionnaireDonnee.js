class DictionnaireDonnee extends HTMLElement {
    // ATTRIBUTS
    _mesInformations; // Liste<Information> Liste de toutes les variables
    _dictionnaireDesConvertionTypes = {
        Char: "String",
        int: "double",
        "unsigned int": "int",
    };
    _estOuvert = false;

    _matchSignification = {};
    _matchType = {};

    VARIABLE_SUPPR = "*variable_supprimee*";

    // CONSTRUCTEUR
    constructor(listeVariable = []) {
        super();
        this._mesInformations = listeVariable;

        // Affichage
        let iconeDico = document.createElement("img");
        iconeDico.src = "assets/DictionnaireDonnees.svg";
        this.appendChild(iconeDico);

        this.addEventListener("click", () => {
            this.ouvrir();
        });
    }

    // ENCAPSULATION

    // METHODES
    ouvrir() {
        document.querySelector("plan-travail").effectuerDictionnaireDesDonnee();
        if (this._estOuvert) return;
        // Supprimer tout le contenu
        this.innerHTML = "";

        this.classList.add("ouvert");

        this.genererDictionnaire();

        // Ajout de la flèche de fermeture
        let flecheFermeture = document.createElement("span");
        flecheFermeture.innerHTML = "➔";
        flecheFermeture.classList.add("fermeture");
        flecheFermeture.addEventListener("click", (e) => {
            e.stopPropagation();
            this.fermer();
        });
        this.appendChild(flecheFermeture);
        this._estOuvert = true;

        // Ajout d'un bouton de raffraichissement
        let boutonRaffraichir = document.createElement("span");
        boutonRaffraichir.innerHTML = "⟳";
        boutonRaffraichir.classList.add("raffraichir");
        boutonRaffraichir.addEventListener("click", (e) => {
            e.stopPropagation();
            boutonRaffraichir.classList.add("rotation");
            setTimeout(() => {
                boutonRaffraichir.classList.remove("rotation");
                this.fermer();
                this.ouvrir();
            }, 200);
        });
        this.appendChild(boutonRaffraichir);
    }

    fermer() {
        // Supprimer tout le contenu
        this.innerHTML = "";

        this.classList.remove("ouvert");

        // Affichage de l'icone
        let iconeDico = document.createElement("img");
        iconeDico.src = "assets/DictionnaireDonnees.svg";
        this.appendChild(iconeDico);
        this._estOuvert = false;
    }

    genererDictionnaire() {
        let table = document.createElement("table");
        table.id = "tableDictionnaireDonnee";
        this.appendChild(table);

        // Entête
        let thEntete = document.createElement("th");
        table.appendChild(thEntete);

        let tdNom = document.createElement("td");
        tdNom.textContent = "Nom";
        thEntete.appendChild(tdNom);

        let tdType = document.createElement("td");
        tdType.textContent = "Type";
        thEntete.appendChild(tdType);

        let tdSignification = document.createElement("td");
        tdSignification.textContent = "Signification";
        thEntete.appendChild(tdSignification);

        // Contenu
        for (let info of this._mesInformations) {
            let trContent = document.createElement("tr");
            table.appendChild(trContent);

            let tdNom = document.createElement("td");
            tdNom.textContent = info._nom;
            tdNom.setAttribute("contenteditable", "true");
            trContent.append(tdNom);
            tdNom.addEventListener("keydown", (event) => {
                // On vérifie si la touche appuyée est "Entrée" ou "Espace"
                if (event.key === "Enter" || event.key === " ") {
                    // On l'empêche pour éviter le saut de ligne, qui casse le design
                    event.preventDefault();
                }
                // Demander confirmation pour la suppression si il ne reste qu'un caractère
                if (event.key === "Backspace" && tdNom.innerText.length == 1) {
                    if (
                        !confirm(
                            "Voulez-vous vraiment supprimer cette variable?"
                        )
                    ) {
                        event.preventDefault();
                    } else {
                        if (verbose) console.log(info);
                        document
                            .querySelector("plan-travail")
                            .renameInformation(info._nom, this.VARIABLE_SUPPR);
                        this._mesInformations.splice(
                            this._mesInformations.indexOf(info),
                            1
                        );
                        this.fermer();
                        this.ouvrir();
                    }
                }
            });

            tdNom.addEventListener("input", () => {
                this._mesInformations.forEach((element) => {
                    if (element._nom == info._nom) {
                        document
                            .querySelector("plan-travail")
                            .renameInformation(element._nom, tdNom.innerText);
                        this._matchSignification[tdNom.innerText] =
                            this._matchSignification[element._nom];
                        this._matchSignification[element._nom] = undefined;
                        element._nom = tdNom.innerText;
                    }
                });
            });

            let tdType = document.createElement("td");
            let selectType = document.createElement("select");
            selectType.classList.add("selectType");
            tdType.appendChild(selectType);

            let auto = document.createElement("option");
            auto.value = "automatique";
            auto.textContent = "automatique";
            selectType.appendChild(auto);

            auto.addEventListener("click", () => {
                this._matchType[info._nom] = undefined;
                // selectType.value = info._type; // Pour recharger automatiquement le type
            });

            for (let type of Type.allTypes) {
                let option = document.createElement("option");
                option.value = type;
                option.textContent = type;
                selectType.appendChild(option);
                option.addEventListener("click", () => {
                    this._matchType[info._nom] = type;
                });
            }

            if (this._matchType[info._nom] != undefined) {
                selectType.value = this._matchType[info._nom];
            } else {
                selectType.value = info._type;
                if (info._type == undefined) {
                    selectType.value = "automatique";
                }
            }
            trContent.append(tdType);

            let tdSignification = document.createElement("td");
            tdSignification.textContent = this._matchSignification[info._nom];
            tdSignification.setAttribute("contenteditable", "true");
            trContent.append(tdSignification);
            tdSignification.addEventListener("input", () => {
                this._matchSignification[info._nom] = tdSignification.innerText;
            });
        }
    }

    // Déprécié
    #AfficherDictionnaire() {
        // Récupérez la référence de la table par son ID
        const table = document.getElementById("tableDictionnaireDonnee");
        // Obtenez toutes les lignes de la table
        let rows = table.getElementsByTagName("tr");

        // Effacer lancien contenu
        for (let i = rows.length - 1; i > 0; i--) {
            // Supprimez chaque ligne sauf la première
            table.deleteRow(i);
        }
        for (let info of this._mesInformations) {
            let trContent = document.createElement("tr");
            table.appendChild(trContent);

            let tdNom = document.createElement("td");
            tdNom.textContent = info._nom;
            tdNom.setAttribute("contenteditable", "true");
            trContent.append(tdNom);
            tdNom.addEventListener("input", () => {
                this._mesInformations.forEach((element) => {
                    if (element._nom == info._nom) {
                        document
                            .getElementById("espace1")
                            .renameInformation(element._nom, tdNom.innerText);
                        element._nom = tdNom.innerText;
                    }
                });
            });
            let tdType = document.createElement("td");
            tdType.textContent = info._type;
            trContent.append(tdType);

            let tdSignification = document.createElement("td");
            tdSignification.textContent = info._signification;
            tdSignification.setAttribute("contenteditable", "true");
            trContent.append(tdSignification);
            tdSignification.addEventListener("input", () => {
                this._mesInformations.forEach((element) => {
                    if (element._nom == info._nom) {
                        element._signification = tdSignification.innerText;
                    }
                });
            });
        }
    }

    AjouterUneVariable(uneInformation) {
        if (uneInformation._nom == this.VARIABLE_SUPPR) {
            return false;
        }
        let reussis = false;
        const nameInformation = uneInformation._nom;
        if (uneInformation instanceof Information) {
            if (this.nomCorrecte(nameInformation)) {
                if (this.containInformation(nameInformation)) {
                    const ancienType =
                        this.getInformation(nameInformation)._type;
                    const nouveauType = uneInformation._type;
                    const resultType = this.convertionVariable(
                        nouveauType,
                        ancienType
                    );
                    if (
                        this.getInformation(nameInformation)._type != resultType
                    ) {
                        this.changeType(uneInformation._nom, resultType);
                    }
                } else {
                    this._mesInformations.push(uneInformation);
                    reussis = true;
                }
            }
        }
        return reussis;
    }

    retirerInformationsAbsentes(listeInformations) {
        for (let info of this._mesInformations) {
            if (!listeInformations.includes(info)) {
                this.retirerUneInformation(info._nom);
            }
        }
    }

    retirerUneInformation(nameVariable) {
        this._mesInformations = this._mesInformations.filter(
            (element) => element._nom != nameVariable
        );
        return true;
    }

    TypeCompatible(type1, type2) {
        if (type1 == undefined || type2 == undefined) {
            return true;
        }
        let courant = type1;
        while (true) {
            if (!courant) {
                break;
            }
            if (type2 == courant) {
                return true;
            }
            courant = this._dictionnaireDesConvertionTypes[courant];
        }

        courant = type2;
        while (true) {
            if (!courant) {
                break;
            }
            if (type1 == courant) {
                return true;
            }
            courant = this._dictionnaireDesConvertionTypes[courant];
        }

        return false;
    }

    convertionVariable(informationUne, InformationDeux) {
        // undefined
        // String
        // Char
        // unsigned double
        // double
        // boolean
        const type1 = informationUne;
        const type2 = InformationDeux;

        //Si Undefined
        if (type1 == undefined) {
            return type2;
        }
        if (type2 == undefined) {
            return type1;
        }

        // Si les deux types sont identiques non nécéssaire
        if (type1 === type2) {
            return type1;
        }

        // Si aucun des deux cas alors type1 est renvoyer
        return this.getTypeLePlusBasEnCommun(type1, type2);
    }
    getTypeLePlusBasEnCommun(type1, type2) {
        let courant = type1;
        while (true) {
            if (!courant) {
                break;
            }
            if (type2 == courant) {
                return type2;
            }
            courant = this._dictionnaireDesConvertionTypes[courant];
        }
        courant = type2;
        while (true) {
            if (!courant) {
                break;
            }
            if (type1 == courant) {
                return type1;
            }
            courant = this._dictionnaireDesConvertionTypes[courant];
        }
        return type1;
    }
    containInformation(nameInformation) {
        let trouver = false;
        this._mesInformations.forEach((element) => {
            if (element._nom == nameInformation) {
                trouver = true;
            }
        });
        return trouver;
    }
    getInformation(nameInformation) {
        const foundElement = this._mesInformations.find(
            (element) => element._nom === nameInformation
        );
        return foundElement;
    }
    renameInformation(nameVariable, newName) {
        let resultat = false;
        if (newName == "") {
            resultat = retirerUneInformation(nameVariable);
        } else if (!this.containInformation(newName)) {
            if (this.nomCorrecte(newName)) {
                this._mesInformations.forEach((element) => {
                    if (element._nom == nameVariable) {
                        element._nom = newName;
                        resultat = true;
                    }
                });
            }
        }
        return resultat;
    }
    changeSignification(nameVariable, nouvelleSignification) {
        let resultat = false;
        this._mesInformations.forEach((element) => {
            if (element._nom == nameVariable) {
                element._signification = nouvelleSignification;
                resultat = true;
            }
        });
        return resultat;
    }
    changeType(nameVariable, newType) {
        let resultat = false;
        this._mesInformations.forEach((element) => {
            if (element._nom == nameVariable) {
                element._type = newType;
                resultat = true;
            }
        });
        return resultat;
    }

    nomCorrecte(nameVariable) {
        let resultat = true;
        if (nameVariable.trim() == "") {
            resultat = false;
        }
        for (let char of nameVariable) {
            if (
                !(char >= "a" && char <= "z") &&
                !(char >= "A" && char <= "Z") &&
                char !== "_"
            ) {
                resultat = false;
            }
        }
        return resultat;
    }

    suppressionDonneeInutiliser() {
        this._mesInformations = this._mesInformations.filter((element) => {
            return (
                element._type != undefined ||
                (element._signification != undefined &&
                    element._signification != "")
            );
        });
    }

    suppressionTout() {
        this._mesInformations = [];
    }

    toJSON() {
        return {
            typeElement: "DictionnaireDonnee",
            contenu: this._matchSignification,
        };
    }

    exporter(format) {
        switch (format.toLowerCase()) {
            case "xls":
                // Code snippet de SheetJS
                this.ouvrir();
                /* Create worksheet from HTML DOM TABLE */
                var wb = XLSX.utils.table_to_book(
                    this.querySelector("table#tableDictionnaireDonnee")
                );
                /* Export to file (start a download) */
                XLSX.writeFile(wb, "SheetJSTable.xlsx");
                this.fermer();
                break;
            case "csv":
                // On crée le contenu du fichier
                var contenuTexte = "Nom;Type;Signification\n";
                this.ouvrir();
                this.fermer();

                this._mesInformations.forEach((info) => {
                    contenuTexte += `${info._nom};${info._type};${
                        this._matchSignification[info._nom]
                    }\n`;
                });

                // On crée un Blob avec le contenu JSON
                var blob = new Blob([contenuTexte], {
                    type: "application/json",
                });

                // On crée un URL pour le Blob
                var url = URL.createObjectURL(blob);

                // On crée un élément <a> pour télécharger le fichier
                var downloadLink = document.createElement("a");
                downloadLink.href = url;
                downloadLink.download = `${
                    document.querySelector("#titreAlgo").innerText
                }Dictionnaire.csv`;

                // Pour des raisons de compatibilité, on simule un clic sur le lien et on le supprime après
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                // On supprime le Blob et l'URL pour libérer de la mémoire
                setTimeout(() => URL.revokeObjectURL(url), 100);
                break;
            case "md":
                break;
            default:
                break;
        }
    }

    chargerDepuisJSON(json) {
        this._matchSignification = json.contenu;
    }
}
window.customElements.define("dictionnaire-donnee", DictionnaireDonnee);

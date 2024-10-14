CREATE TABLE IF NOT EXISTS Utilisateur (
    adresseMail VARCHAR(255) PRIMARY KEY NOT NULL,
    mdpHash VARCHAR(255) NOT NULL,
    dateInscription DATETIME NOT NULL,
    grilleActivee BOOLEAN NOT NULL,
    snaping BOOLEAN NOT NULL,
    idTheme INT NOT NULL,
    imageProfil VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS PermissionDossier (
    adresseUtil VARCHAR(255) NOT NULL,
    idAlgo INT NOT NULL,
    droits VARCHAR(255) NOT NULL,
    PRIMARY KEY (adresseUtilisateur, idAlgo)
);

CREATE TABLE IF NOT EXISTS Dossier (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    dateAjout DATETIME NOT NULL,
    dateModification DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS ContientDossier (
    idDossierParent INT NOT NULL,
    idDossierEnfant INT NOT NULL,
    PRIMARY KEY (idDossierParent, idDossierEnfant)
);

CREATE TABLE IF NOT EXISTS ContientAlgo (
    idDossier INT NOT NULL,
    idAlgo INT NOT NULL,
    PRIMARY KEY (idDossier, idAlgo)
);

CREATE TABLE IF NOT EXISTS Algorithme (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    chemin VARCHAR(255) NOT NULL,
    dateAjout DATETIME NOT NULL,
    dateModification DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS PermissionAlgo (
    adresseUtil VARCHAR(255) NOT NULL,
    idAlgo INT NOT NULL,
    droits VARCHAR(255) NOT NULL,
    PRIMARY KEY (adresseUtilisateur, idAlgo)
);
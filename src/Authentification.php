<?php
    // Fichier php requis
    require_once('bd.php'); // Connexion à la base de données
    require_once('fonctions.php'); // Fonctions utiles
    
    // Vérifier si l'utilisateur a soumis le formulaire
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Récupérer les informations d'identification depuis le formulaire
        $adresseMail = htmlentities($_POST['adresseMail']);
        $motDePasse = htmlentities($_POST['motDePasse']);

        /* PDO */
        // Utiliser une requête préparée
        $requete = $connexion->prepare("SELECT adresseMail, mdpHash FROM utilisateur WHERE adresseMail = :adresseMail");
        $requete->bindParam(":adresseMail", $adresseMail, PDO::PARAM_STR);

        // Exécuter la requête
        $requete->execute();

        // Lier les résultats de la requête à des variables
        $resultat = $requete->fetch(PDO::FETCH_ASSOC);
        $motDePasseHash = $resultat['mdpHash'];

        if ($resultat && password_verify($motDePasse, $motDePasseHash) && $motDePasseHash !== NULL) {
            // Authentification réussie
            creerCookie($adresseMail);
        } else {
            // Authentification échouée
            sleep(3);
            header("Location: pageAuthentification.php?erreur=1");
            exit();
        }

        // Fermer la requête
        $requete->closeCursor();
    }
    else {
        // Rediriger vers la page d'authentification
        header("Location: pageAuthentification.php");
        exit();
    }

    // Fermer la connexion à la base de données
    $connexion = null;

        /* mysqli 
        // Utiliser une requête préparée
        $requete = $connexion->prepare("SELECT adresseMail, mdpHash FROM utilisateur WHERE adresseMail = ?");
        $requete->bind_param("s", $adresseMail);

        // Exécuter la requête
        $requete->execute();
    
        // Lier les résultats de la requête à des variables
        $requete->bind_result($adresseMail, $motDePasseHash);

        if ($requete->fetch() && password_verify($motDePasse, $motDePasseHash) && $motDePasseHash != NULL) {
            // Authentification réussie
            creerCookie($adresseMail);

        } else {
            // Authentification échouée
            sleep(3);
            header("Location: pageAuthentification.php?erreur=1");
            exit();
        }
    
        // Fermer la requête
        $requete->close();
    }
    
    // Fermer la connexion à la base de données
    $connexion->close();
    */
?>
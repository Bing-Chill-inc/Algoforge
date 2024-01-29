<?php
    require_once('bd.php');
    require_once('fonctions.php');
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Récupérer les informations d'identification depuis le formulaire
        $adresseMail = htmlspecialchars($_POST['adresseMail']);
        $motDePasse = htmlspecialchars($_POST['motDePasse']);
    
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
            echo "Adresse e-mail ou mot de passe incorrect.";
            sleep(3);
            header("Location: pageAuthentification.php?erreur=1");
            exit();
        }
    
        // Fermer la requête
        $requete->close();
    }
    
    // Fermer la connexion à la base de données
    $connexion->close();
?>
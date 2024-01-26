<?php
    require_once('BD.php');
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Récupérer les informations d'identification depuis le formulaire
        $adresseMail = $_POST['adresseMail'];
        $motDePasse = $_POST['motDePasse'];

        //$motDePasseHash = password_hash($motdepasse, PASSWORD_BCRYPT);
    
        // Utiliser une requête préparée pour éviter les attaques par injection SQL
        $requete = $connexion->prepare("SELECT adresseMail, mdpHash FROM utilisateur WHERE adresseMail = ? AND mdpHash = ?");
        $requete->bind_param("ss", $adresseMail, $motDePasse);

        // Exécuter la requête
        $requete->execute();
    
        // Lier les résultats de la requête à des variables
        $requete->bind_result($adresseMail, $motDePasseHash);

        if ($requete->fetch() && $motDePasseHash != NULL) {
            // Authentification réussie, initialiser du cookie
            // Calculer le timestamp pour dans 2 mois (60 secondes * 60 minutes * 24 heures * 30 jours * 2 mois)
            $expiration = time() + 60 * 60 * 24 * 30 * 2;

            // Créer un cookie sécurisé pour stocker le nom d'utilisateur avec une expiration de 2 mois
            setcookie("adresseMail", $adresseMail, $expiration);
    
            // Rediriger vers la page d'accueil ou une autre page après la connexion
            header("Location: testCookie.php");
            exit();
        } else {
            // Authentification échouée
            echo "Adresse e-mail ou mot de passe incorrect.";
        }
    
        // Fermer la requête
        $requete->close();
    }
    
    // Fermer la connexion à la base de données
    $connexion->close();
?>
<?php
    function creerCookie($adresseMail) {
        // Clé de chiffrement (assurez-vous de choisir une clé robuste)
        $cleChiffrement = getenv('CLE_SECRETE');

        // Vecteur d'initialisation
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));

        // Cryptage des données
        $donneesCryptees = openssl_encrypt($adresseMail, 'aes-256-cbc', $cleChiffrement, 0, $iv);

        // Calcule de l'expiration du cookie dans 2 mois
        $expiration = time() + 60 * 60 * 24 * 30 * 2;

        // Stockage des données cryptées et de l'IV dans le cookie
        $donneesCookie = base64_encode($donneesCryptees) . ':' . base64_encode($iv);
        setcookie('adresseMail', $donneesCookie, $expiration);

        // Rediriger vers la page d'accueil
        header('Location: testCookie.php');
    }

    function lireCookie() {
        // Clé de chiffrement 
        $cleChiffrement = getenv('CLE_SECRETE');

        // Récupération des données du cookie
        $donneesCookie = $_COOKIE['adresseMail'];
        list($donneesCryptees, $iv) = explode(':', $donneesCookie, 2);

        // Décryptage
        $adresseMail = openssl_decrypt(base64_decode($donneesCryptees), 'aes-256-cbc', $cleChiffrement, 0, base64_decode($iv));

        return $adresseMail;
    }

    function ajoutUtilisateur($adresseMail, $mdpHash, $imageProfil = NULL) {
        // Connexion à la base de données
        include 'bd.php';

        // paramètres par défaut
        $dateInscription = date("Y-m-d H:i:s");
        $grilleActivee = 1;
        $accrochage = 1;
        $idTheme = 1;

        // Préparer la requête d'insertion
        $requeteInsertion = $connexion->prepare("INSERT INTO Utilisateur (adresseMail, mdpHash, dateInscription, grilleActivee, accrochage, idTheme, imageProfil)
        VALUES (?, ?, ?, ?, ?, ?, ?)");

        // Lier les paramètres
        $requeteInsertion->bind_param("sssiiis", $adresseMail, $mdpHash, $dateInscription, $grilleActivee, $accrochage, $idTheme, $imageProfil);

        // Exécuter la requête d'insertion
        if (!$requeteInsertion->execute()) {    
            echo "Erreur d'insertion : " . $requeteInsertion->error;
            $requeteInsertion->close();
            return;
        }
        // Fermer la requête d'insertion
        $requeteInsertion->close();
    }
?>
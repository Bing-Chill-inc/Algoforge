<?php
    function creerCookie($adresseMail) {
        // Clé de chiffrement (assurez-vous de choisir une clé robuste)
        $cleChiffrement = getenv('CLE_SECRETE');

        // Vecteur d'initialisation
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));

        // Cryptage des données
        $donneesChiffrees = openssl_encrypt($adresseMail, 'aes-256-cbc', $cleChiffrement, 0, $iv);

        // Calcule de l'expiration du cookie dans 2 mois
        $expiration = time() + 60 * 60 * 24 * 30 * 2;

        // Stockage des données cryptées et de l'IV dans le cookie
        $donneesCookie = base64_encode($donneesChiffrees) . ':' . base64_encode($iv);
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
        /* PDO */
        // Connexion à la base de données
        include('bd.php');

        // Paramètres par défaut
        $dateInscription = date("Y-m-d H:i:s");
        $grilleActivee = 0;
        $accrochage = 0;
        $idTheme = 1;

        try {
            // Préparer la requête d'insertion
            $requeteInsertion = $connexion->prepare("INSERT INTO Utilisateur (adresseMail, mdpHash, dateInscription, grilleActivee, accrochage, idTheme, imageProfil) VALUES (:adresseMail, :mdpHash, :dateInscription, :grilleActivee, :accrochage, :idTheme, :imageProfil)");

            // Lier les paramètres
            $requeteInsertion->bindParam(":adresseMail", $adresseMail, PDO::PARAM_STR);
            $requeteInsertion->bindParam(":mdpHash", $mdpHash, PDO::PARAM_STR);
            $requeteInsertion->bindParam(":dateInscription", $dateInscription, PDO::PARAM_STR);
            $requeteInsertion->bindParam(":grilleActivee", $grilleActivee, PDO::PARAM_INT);
            $requeteInsertion->bindParam(":accrochage", $accrochage, PDO::PARAM_INT);
            $requeteInsertion->bindParam(":idTheme", $idTheme, PDO::PARAM_INT);
            $requeteInsertion->bindParam(":imageProfil", $imageProfil, PDO::PARAM_STR);

            // Exécuter la requête d'insertion
            if (!$requeteInsertion->execute()) {
                echo "Erreur d'insertion : " . $requeteInsertion->errorInfo()[2];
            }

            // Fermer la requête d'insertion
            $requeteInsertion->closeCursor();
        } catch (PDOException $e) {
            echo "Erreur : " . $e->getMessage();
        }

        // Fermer la connexion à la base de données
        $connexion = null;  

        /* mysqli
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
        */
    }

    function codeVerification($nbCaractere){
        $string = "";
        $chaine = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        srand((double)microtime()*1000000); // On initialise le générateur de nombres aléatoires
        for($i=0; $i<$nbCaractere; $i++) {
            $string .= $chaine[rand()%strlen($chaine)];
        }
        return $string;
    }
?>
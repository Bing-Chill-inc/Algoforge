<?php
    // Fichier php requis
    require_once('bd.php'); // Connexion à la base de données
    require_once('fonctions.php'); // Fonctions utiles

    /* Connection à Discord */
    // Configuration pour afficher les erreurs
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // Vérifie si le paramètre 'code' est présent dans la requête
    if (!isset($_GET['code'])) {
        // Redirige vers la page d'authentification
        header("Location: pageAuthentification.php?erreur=2");
        exit();
    }

    // Récupère le code Discord de la requête
    $discord_code = $_GET['code'];

    // Paramètres pour la requête d'obtention du jeton d'accès
    $payload = [
        'code' => $discord_code,
        'client_id' => '1199990152823578635',
        'client_secret' => 'N0jF2_wshXhIr68cI_KncFpUb3DkZe10',
        'grant_type' => 'authorization_code',
        'redirect_uri' => 'http://localhost/AlgoForge/src/AuthentificationDiscord.php',
        'scope' => 'identify',
    ];

    // Construit la chaîne de requête
    $payload_string = http_build_query($payload);
    $discord_token_url = "https://discordapp.com/api/oauth2/token";

    // Initialise une session cURL pour obtenir le jeton d'accès
    $ch = curl_init();

    // Configuration de l'appel cURL pour obtenir le jeton d'accès
    curl_setopt($ch, CURLOPT_URL, $discord_token_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    // Exécute la requête cURL pour obtenir le jeton d'accès
    $result = curl_exec($ch);

    // Vérifie s'il y a des erreurs lors de la requête cURL
    if (!$result) {
        // Redirige vers la page d'authentification
        header("Location: pageAuthentification.php?erreur=2");
        exit();
    }

    // Décode la réponse JSON pour obtenir le jeton d'accès
    $result = json_decode($result, true);
    $access_token = $result['access_token'];

    // URL pour récupérer les informations de l'utilisateur Discord
    $discord_users_url = "https://discordapp.com/api/users/@me";

    // Configuration de l'en-tête pour la requête des informations de l'utilisateur
    $header = array('Content-Type: application/x-www-form-urlencoded', 'Authorization: Bearer ' . $access_token);

    // Initialise une nouvelle session cURL pour obtenir les informations de l'utilisateur
    $ch = curl_init();

    // Configuration de l'appel cURL pour obtenir les informations de l'utilisateur
    curl_setopt($ch, CURLOPT_URL, $discord_users_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    // Exécute la requête cURL pour obtenir les informations de l'utilisateur
    $result = curl_exec($ch);

    // Décode la réponse JSON pour obtenir les informations de l'utilisateur
    $result = json_decode($result, true);

    // Récupère les informations de l'utilisateur
    $idDiscord = $result['id'];
    $avatar = $result['avatar']; 

    // Création de l'adresse mail
    $adresseMail = $idDiscord.'@discord.com';
    
    /* PDO */
    // Vérifier si l'utilisateur existe déjà
    $requete = $connexion->prepare("SELECT adresseMail FROM utilisateur WHERE adresseMail = :adresseMail");
    $requete->bindParam(":adresseMail", $adresseMail, PDO::PARAM_STR);
    $requete->execute();
    $verifUtilisateur = $requete->fetch(PDO::FETCH_ASSOC);

    // Si l'utilisateur n'existe pas, on l'ajoute à la base de données
    if (!$verifUtilisateur) {
        // Création de l'image de profil
        $imageProfil = 'https://cdn.discordapp.com/avatars/'.$idDiscord.'/'.$avatar.'.png';
        // Ajout de l'utilisateur à la base de données
        ajoutUtilisateur($adresseMail, NULL, $imageProfil);
    }

    // Fermer la requête
    $requete->closeCursor();

    // Fermer la connexion à la base de données
    $connexion = null;

    /* mysqli
    // Vérifier si l'utilisateur existe déjà
    $requete = $connexion->prepare("SELECT adresseMail FROM utilisateur WHERE adresseMail = ?");
    $requete->bind_param("s", $adresseMail);
    $requete->execute();
    $requete->bind_result($verifUtilisateur);

    // Si l'utilisateur n'existe pas, on l'ajoute à la base de données
    if (!($requete->fetch())) {
        // Création de l'image de profil
        $imageProfil = 'https://cdn.discordapp.com/avatars/'.$idDiscord.'/'.$avatar.'.png';
        // Ajout de l'utilisateur à la base de données
        ajoutUtilisateur($adresseMail, NULL, $imageProfil);
    }

    // Fermer la requête
    $requete->close();

    // Fermer la connexion à la base de données
    $connexion->close();
    */

    // Création du cookie
    creerCookie($adresseMail);

    exit();
?>

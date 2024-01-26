<?php
    require_once('BD.php');
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
    if(!isset($_GET['code'])){
        echo 'no code';
        exit();
    }
    
    $discord_code = $_GET['code'];

    $payload = [
        'code'=>$discord_code,
        'client_id'=>'1199990152823578635',
        'client_secret'=>'N0jF2_wshXhIr68cI_KncFpUb3DkZe10',
        'grant_type'=>'authorization_code',
        'redirect_uri'=>'http://localhost/AlgoForge/src/AuthentificationDiscord.php',
        'scope'=>'identify',
    ];

    $payload_string = http_build_query($payload);
    $discord_token_url = "https://discordapp.com/api/oauth2/token";

    $ch = curl_init();

    // Configuration de l'appel cURL pour obtenir le jeton d'accès

    curl_setopt($ch, CURLOPT_URL, $discord_token_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    $result = curl_exec($ch);

    if(!$result){
        echo curl_error($ch);
    }
    echo $result;
    $result = json_decode($result,true);
    echo $result['access_token'];
    $access_token = $result['access_token'];

    $discord_users_url = "https://discordapp.com/api/users/@me";
    $header = array('Content-Type: application/x-www-form-urlencoded', 'Authorization: Bearer ' . $access_token);

    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, $discord_users_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    $result = curl_exec($ch);
    echo $result;
    $result = json_decode($result, true);

    $adresseMail = $result['email'];

    // Préparer la requête d'insertion
    $requeteInsertion = $connexion->prepare("INSERT INTO Utilisateur (adresseMail, mdpHash, dateInscription, grilleActivee, accrochage, idTheme, imageProfil)
    VALUES (?, ?, ?, ?, ?, ?, ?)");
    $dateInscription = date("Y-m-d H:i:s");
    $grilleActivee = 1;
    $accrochage = 1;
    $idTheme = 1;
    $imageProfil = NULL;
    $motDePasseHash = NULL;

    // Lier les paramètres
    $requeteInsertion->bind_param("sssiiis", $adresseMail, $motDePasseHash, $dateInscription, $grilleActivee, $accrochage, $idTheme, $imageProfil);

    // Exécuter la requête d'insertion
    if (!$requeteInsertion->execute()) {
        echo "Erreur d'insertion : " . $requeteInsertion->error;
        $requeteInsertion->close();
        return;
    }
    // Fermer la requête d'insertion
    $requeteInsertion->close();

    $expiration = time() + 60 * 60 * 24 * 30 * 2;

    setcookie("adresseMail", $adresseMail, $expiration);

    header("location: testCookie.php");

    exit();
    
?>

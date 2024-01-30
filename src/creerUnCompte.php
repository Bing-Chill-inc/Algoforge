<?php

if (isset($_POST['g-recaptcha-response'])) {
  $recaptcha_response = $_POST['g-recaptcha-response'];
  $project_id = "algoforge-recapt-1706536827466";
  $api_key = "AIzaSyAGx7ZFYvP82uXumd4eNZATMrjp2LzcS6o";
  
  // Les données à envoyer dans le corps de la requête
  $data = array(  
      "event" => array(
          "token" => $recaptcha_response,
          "siteKey" => "6LdNIl8pAAAAALIEBCwlcZnOi85CNc1UjSMh1Yug",
          "expectedAction" => "LOGIN"
      )
  );
  
  // Convertir le tableau PHP en JSON
  $json_data = json_encode($data);
  
  // URL de l'API reCAPTCHA Enterprise
  $url = "https://recaptchaenterprise.googleapis.com/v1/projects/{$project_id}/assessments?key={$api_key}";
  
  // Configuration de l'appel cURL
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
  
  // Exécution de la requête
  $response = curl_exec($ch);
  
  // Vérification des erreurs
  if (curl_errno($ch)) {
      echo 'Erreur cURL : ' . curl_error($ch);
  }
  
  // Fermeture de la session cURL
  curl_close($ch);
  
  // Traitement de la réponse JSON
  $response_data = json_decode($response, true);
  
  if ($response_data["tokenProperties"]["valid"]) {
    // Le token est valide, continuez avec la création du compte
    session_start();
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        echo "une erreur s'est produit";
        return;
    }

    // Récupère le code de vérification stocké dans la session
    $mail = htmlspecialchars($_POST["mail"]);
    $motdepasse = htmlspecialchars($_POST["motDePasse"]);
    $conf_motdepasse = htmlspecialchars($_POST["conf-motDePasse"]);
    $motDePasseHash = password_hash($motdepasse, PASSWORD_DEFAULT);
    $_SESSION['mail'] = $mail;
    $_SESSION['motDePasseHash'] = $motDePasseHash;
    
    // Regarder si le mail est valide
    if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) 
    {
        echo "Le mail n'est pas valide.";
        return;
    }

    // Regarder si le mot de passe est valide
    if ($motDePasseHash === null) {
        $error = error_get_last();
        echo "Password hashing failed: " . $error['message'];
        return;
    }
    if($motdepasse != $conf_motdepasse)
    {
        echo "Le mot de passe n'est pas le même que confirme mot de passe.";
        return;
    }

    // Vérifier la longueur
    if(strlen($motdepasse) < 8)
    {
        echo "Le mot de passe ne fait pas 12 caractères";
        return;
    }
    if (!preg_match('/\d/', $motdepasse)) {
        echo "Le mot de passe ne contient aucun chiffres";
        return;
    }
    if (!preg_match('/[A-Z]/', $motdepasse)) {
        echo "Le mot de passe ne contient aucune majuscules";
        return;
    }
    if (!preg_match('/[a-z]/', $motdepasse)) {
        echo "Le mot de passe ne contient aucune minuscules";
        return;
    }
    if (!preg_match('/[!@#$%^&*()\-_=+{};:,<.>]/', $motdepasse)) {
        echo "Le mot de passe ne contient aucun caractères spéciales";
        return;
    }

    // Regarder si l'email n'est pas déja a l'interieur de la base de données
    include 'bd.php'; // Inclure le fichier de connexion
    // Vérifier si le nom existe déjà
    $verifNom = $connexion->prepare("SELECT COUNT(*) FROM Utilisateur WHERE adresseMail = ?");
    $verifNom->bind_param("s", $mail);
    $verifNom->execute();
    $verifNom->bind_result($count);
    $verifNom->fetch();
    $verifNom->close();

    // Si le nom n'existe pas, procéder à l'insertion
    if ($count != 0) {
        echo "Le compte a déja été crée";
        header("Location: pageAuthentification.php?erreur=2");
        return;
    }
    $code_verification = rand(100000, 999999);
    $_SESSION['code_verification'] = $code_verification;
    // Sujet du mail
    $sujet = "Code de verification";

    // Corps du mail
    $message = "Le code est: " . $code_verification;

    $from = "From: contact@algoforge.fr";
    // Envoi du mail
    $mailEnvoye = mail($mail, $sujet, $message, $from);

    // Vérifier si le mail a été envoyé avec succès
    if ($mailEnvoye) {
        echo "<p>L'e-mail a été envoyé avec succès.</p>";
        echo "<br>";
    } else {
        echo "Erreur lors de l'envoi de l'e-mail. Veuillez réessayer.";
        return;
    }
    
    echo 'Le code est ' . $code_verification;
    echo '<form  action="verifCode.php"  method="post">';
    echo '<input type="text" class="boiteSaisie" name="codeVerif" placeholder="Code verification" required>';
    echo '<br>';
    echo '<input type="submit" class="btnInput boutton" value="Se connecter">';
    echo '</form>';
    
  } else {
      // Le token n'est pas valide, rediriger vers la page d'authentification
      header("Location: pageAuthentification.php?erreur=3");
      exit();
  }
}
else {
    // La case à cocher reCAPTCHA n'a pas été cochée, affichez un message d'erreur ou prenez une autre action
    echo "Veuillez cocher la case reCAPTCHA.";
    header("Location: pageAuthentification.php?erreur=4");
  }
  
/*
   // Vérification de la case à cocher reCAPTCHA
  if (isset($_POST['g-recaptcha-response'])) {
    $recaptcha_response = $_POST['g-recaptcha-response'];

    // Remplacez 'VOTRE_CLE_SECRETE' par votre clé secrète reCAPTCHA
    $recaptcha_secret_key = '6LdNIl8pAAAAAGvn22nkRv88blCNKmE41xty_k8a';

    // Effectuez une requête POST à l'API reCAPTCHA pour vérifier le jeton
    $verification_url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => $recaptcha_secret_key,
        'response' => $recaptcha_response
    );

    $options = array(
        'http' => array(
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'method'  => 'POST',
            'content' => http_build_query($data),
        ),
    );

    $context  = stream_context_create($options);
    $result = file_get_contents($verification_url, false, $context);
    echo $result;
    $result_json = json_decode($result, true);

    // Vérifiez la réponse de l'API reCAPTCHA
    if ($result_json['success']) {
        // Le reCAPTCHA est valide, continuez le traitement du formulaire
        echo "Le reCAPTCHA est valide.";
    } else {
        // Le reCAPTCHA a échoué, affichez un message d'erreur ou prenez une autre action
        echo "Le reCAPTCHA a échoué. Veuillez réessayer.";
    }
  } else {
    // La case à cocher reCAPTCHA n'a pas été cochée, affichez un message d'erreur ou prenez une autre action
    echo "Veuillez cocher la case reCAPTCHA.";
  }
    
    session_start();
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        echo "une erreur s'est produit";
        return;
    }

    // Récupère le code de vérification stocké dans la session
    $mail = htmlspecialchars($_POST["mail"]);
    $motdepasse = htmlspecialchars($_POST["motDePasse"]);
    $conf_motdepasse = htmlspecialchars($_POST["conf-motDePasse"]);
    $motDePasseHash = password_hash($motdepasse, PASSWORD_DEFAULT);
    $_SESSION['mail'] = $mail;
    $_SESSION['motDePasseHash'] = $motDePasseHash;
    
    // Regarder si le mail est valide
    if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) 
    {
        echo "Le mail n'est pas valide.";
        return;
    }

    // Regarder si le mot de passe est valide
    if ($motDePasseHash === null) {
        $error = error_get_last();
        echo "Password hashing failed: " . $error['message'];
        return;
    }
    if($motdepasse != $conf_motdepasse)
    {
        echo "Le mot de passe n'est pas le même que confirme mot de passe.";
        return;
    }

    // Vérifier la longueur
    if(strlen($motdepasse) < 8)
    {
        echo "Le mot de passe ne fait pas 12 caractères";
        return;
    }
    if (!preg_match('/\d/', $motdepasse)) {
        echo "Le mot de passe ne contient aucun chiffres";
        return;
    }
    if (!preg_match('/[A-Z]/', $motdepasse)) {
        echo "Le mot de passe ne contient aucune majuscules";
        return;
    }
    if (!preg_match('/[a-z]/', $motdepasse)) {
        echo "Le mot de passe ne contient aucune minuscules";
        return;
    }
    if (!preg_match('/[!@#$%^&*()\-_=+{};:,<.>]/', $motdepasse)) {
        echo "Le mot de passe ne contient aucun caractères spéciales";
        return;
    }

    // Regarder si l'email n'est pas déja a l'interieur de la base de données
    include 'bd.php'; // Inclure le fichier de connexion
    // Vérifier si le nom existe déjà
    $verifNom = $connexion->prepare("SELECT COUNT(*) FROM Utilisateur WHERE adresseMail = ?");
    $verifNom->bind_param("s", $mail);
    $verifNom->execute();
    $verifNom->bind_result($count);
    $verifNom->fetch();
    $verifNom->close();

    // Si le nom n'existe pas, procéder à l'insertion
    if ($count != 0) {
        echo "Le compte a déja été crée";
        header("Location: pageAuthentification.php?erreur=2");
        return;
    }
    $code_verification = rand(100000, 999999);
    $_SESSION['code_verification'] = $code_verification;
    // Sujet du mail
    $sujet = "Code de verification";

    // Corps du mail
    $message = "Le code est: " . $code_verification;

    // Envoi du mail
    $mailEnvoye = mail($mail, $sujet, $message);

    // Vérifier si le mail a été envoyé avec succès
    if ($mailEnvoye) {
        echo "<p>L'e-mail a été envoyé avec succès.</p>";
        echo "<br>";
    } else {
        echo "Erreur lors de l'envoi de l'e-mail. Veuillez réessayer.";
        return;
    }
    
    echo 'Le code est ' . $code_verification;
    echo '<form  action="verifCode.php"  method="post">';
    echo '<input type="text" class="boiteSaisie" name="codeVerif" placeholder="Code verification" required>';
    echo '<br>';
    echo '<input type="submit" class="btnInput boutton" value="Se connecter">';
    echo '</form>';
    */
?>
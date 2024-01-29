<?php
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
    /*$sujet = "Code de verification";

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
    */
    echo 'Le code est ' . $code_verification;
    echo '<form  action="verifCode.php"  method="post">';
    echo '<input type="text" class="boiteSaisie" name="codeVerif" placeholder="Code verification" required>';
    echo '<br>';
    echo '<input type="submit" class="btnInput boutton" value="Se connecter">';
    echo '</form>';
?>
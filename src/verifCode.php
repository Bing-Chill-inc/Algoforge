<?php
    session_start();
    $code_attendue = $_SESSION['code_verification'];
    $mail = $_SESSION['mail'];
    $motDePasseHash = $_SESSION['motDePasseHash'];
    $code_saisie = htmlspecialchars($_POST["codeVerif"]);
    if($code_saisie != $code_attendue)
    {
        echo "code incorrecte";
        return;
    }

    include 'fonctions.php';
    include 'bd.php';

    // ajout de l'utilisateur dans la base de données
    ajoutUtilisateur($mail, $motDePasseHash);

    session_unset();
    session_destroy();
    creerCookie($mail);
    ?>
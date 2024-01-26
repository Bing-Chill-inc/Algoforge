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
    include 'bd.php'; // Inclure le fichier de connexion
    // Préparer la requête d'insertion
    $requeteInsertion = $connexion->prepare("INSERT INTO Utilisateur (adresseMail, mdpHash, dateInscription, grilleActivee, accrochage, idTheme, imageProfil)
    VALUES (?, ?, ?, ?, ?, ?, ?)");
    $dateInscription = date("Y-m-d H:i:s");
    $grilleActivee = 1;
    $accrochage = 1;
    $idTheme = 1;
    $imageProfil = NULL;

    // Lier les paramètres
    $requeteInsertion->bind_param("sssiiis", $mail, $motDePasseHash, $dateInscription, $grilleActivee, $accrochage, $idTheme, $imageProfil);

    // Exécuter la requête d'insertion
    if (!$requeteInsertion->execute()) {
        echo "Erreur d'insertion : " . $requeteInsertion->error;
        $requeteInsertion->close();
        return;
    }
    echo "Inscription réussis";
    // Fermer la requête d'insertion
    $requeteInsertion->close();
    session_unset();
    session_destroy();
    ?>
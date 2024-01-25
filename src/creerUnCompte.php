<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        echo "une erreur s'est produit";
        return;
    }
    $mail = htmlspecialchars($_POST["mail"]);
    $motdepasse = htmlspecialchars($_POST["motDePasse"]);
    $conf_motdepasse = htmlspecialchars($_POST["conf-motDePasse"]);
    $motDePasseHash = password_hash($motdepasse, PASSWORD_BCRYPT);
    //
    // Regarder si le mail est valide
    //
    if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) 
    {
        echo "Le mail n'est pas valide.";
        return;
    }
    //
    // Regarder si le mot de passe est valide
    //
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
    if(strlen($motdepasse) < 12)
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
    //
    // Regarder si l'email n'est pas déja a l'interieur de la base de données
    //
    include 'bd.php'; // Inclure le fichier de connexion
    // Vérifier si le nom existe déjà
    $verifNom = $connexion->prepare("SELECT COUNT(*) FROM Utilisateur WHERE adresseMail = ?");
    $verifNom->bind_param("s", $mail);
    $verifNom->execute();
    $verifNom->bind_result($count);
    $verifNom->fetch();
    $verifNom->close();

    // Si le nom n'existe pas, procéder à l'insertion
    if ($count == 0) {
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
        if ($requeteInsertion->execute()) {
            echo "Insertion réussie !";
        } else {
            echo "Erreur d'insertion : " . $requeteInsertion->error;
        }

        // Fermer la requête d'insertion
        $requeteInsertion->close();
        
        echo "L'insertion a été effectuée avec succès.";
    } else {
        echo "Le nom existe déjà dans la base de données.";
    }
?>
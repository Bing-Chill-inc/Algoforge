<?php
    // Détruire le cookie en le rendant expiré
    setcookie("adresseMail", "", time() - 3600);

    // Rediriger vers la page de connexion
    header("Location: pageAuthentification.php");
    exit();
?>

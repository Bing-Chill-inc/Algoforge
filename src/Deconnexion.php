<?php
    // Détruire le cookie en le rendant expiré (une date passée)
    setcookie("adresseMail", "", time() - 3600);

    // Rediriger vers la page de connexion ou une autre page après la déconnexion
    header("Location: pageAuthentification.html");
    exit();
?>

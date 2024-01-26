<?php
    // Vérifier si le cookie existe
    if (isset($_COOKIE['adresseMail'])) {
        $nomUtilisateur = $_COOKIE['adresseMail'];
        echo "Bonjour, $nomUtilisateur !";
    } else {
        header("Location: pageAuthentification.html");
    }
?>

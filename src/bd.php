<?php
    $serveur = "lakartxela.iutbayonne.univ-pau.fr";
    $utilisateur = "jsuares_bd";
    $motDePasse = "jsuares_bd";
    $baseDeDonnees = "jsuares_bd";

    // Créer la connexion
    $connexion = new mysqli($serveur, $utilisateur, $motDePasse, $baseDeDonnees);

    // Vérifier la connexion
    if ($connexion->connect_error) {
        die("Échec de la connexion à la base de données : " . $connexion->connect_error);
    }
?>
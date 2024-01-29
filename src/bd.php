<?php
    $serveur = "localhost";
    $utilisateur = "AlgoForge";
    $motDePasse = "6ax?_J!j9xc9B4c";
    $baseDeDonnees = "algoforge";

    // Créer la connexion
    $connexion = new mysqli($serveur, $utilisateur, $motDePasse, $baseDeDonnees);

    // Vérifier la connexion
    if ($connexion->connect_error) {
        die("Échec de la connexion à la base de données : " . $connexion->connect_error);
    }
?>
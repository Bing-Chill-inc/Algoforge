<?php
    /* PDO */
    // Paramètres de connexion à la base de données
    $serveur = "localhost";
    $utilisateur = "AlgoForge";
    $motDePasse = "6ax?_J!j9xc9B4c";
    $baseDeDonnees = "algoforge";

    // Tentative de connexion avec PDO
    try {
        $dsn = "mysql:host=$serveur;dbname=$baseDeDonnees";
        $connexion = new PDO($dsn, $utilisateur, $motDePasse);

        // Configurer PDO pour lever une exception en cas d'erreur SQL
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Échec de la connexion à la base de données : " . $e->getMessage());
    }

    /* mysqli
    // Paramètres de connexion à la base de données
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
    */
?>
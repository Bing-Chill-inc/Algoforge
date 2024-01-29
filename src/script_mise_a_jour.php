<?php
// Connexion à la base de données
// Remplacez les valeurs par les vôtres
$_bdd= "jsuares_bd"; // Base de données
$_host= "lakartxela.iutbayonne.univ-pau.fr";
$_user= "jsuares_bd"; // Utilisateur
$_pass= "jsuares_bd"; // mp
try {
    $conn = new PDO("mysql:host=$host;dbname=$bdd", $user, $mdp);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion à la base de données: " . $e->getMessage();
}

// Récupération de l'ID et du nom de la table depuis la requête AJAX
$id = $_POST['id'];
$table = $_POST['table'];

// Mise à jour dans la base de données en fonction du nom de la table
$stmt = $conn->prepare("UPDATE $table SET isRead='1' WHERE id = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();

echo "Mise à jour effectuée avec succès";
?>

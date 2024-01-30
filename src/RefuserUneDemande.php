<?php
echo "lalalalalalalalaalla";
// Connexion à la base de données
// Remplacez les valeurs par les vôtres
$_bdd= "jsuares_bd"; // Base de données
$_host= "lakartxela.iutbayonne.univ-pau.fr";
$_user= "jsuares_bd"; // Utilisateur
$_pass= "jsuares_bd"; // mp

try {
    $conn = new PDO("mysql:host=$_host;dbname=$_bdd", $_user, $_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion à la base de données: " . $e->getMessage();
}

// Récupération de l'ID et du nom de la table depuis le formulaire
$id = $_POST['id'];
$table = $_POST['table'];
$adresseEmeteur = $_POST['adresseEmeteur'];
$adresseRecipiendaire = $_POST['adresseRecipiendaire'];
$date = time();


// Mise à jour dans la base de données en fonction du nom de la table
$stmt = $conn->prepare("UPDATE $table SET isRead='1' WHERE idNotif = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();

if($table == "NotificationDossier"){
    $date = time();
    $stmtInsert = $conn->prepare("INSERT INTO NotificationDossier (`idNotif`, `adresseRecipiendaire`, `adresseEmeteur`, `idDossierConcernes`, `typeNotification`, `droitsConcernes`, `dateEvent`, `isRead`) VALUES (UUID(), $adresseEmeteur, $adresseRecipiendaire, $idDossierConcernes, 'refuser', $date,0)");
}
if($table == "NotificationAlgorithme"){
    $idAlgoConcernes = $_POST['idAlgoConcernes'];
    $stmtInsert = $conn->prepare("INSERT INTO NotificationAlgorithme (`idNotif`, `adresseRecipiendaire`, `adresseEmeteur`, `idAlgoConcernes`, `typeNotification`, `droitsConcernes`, `dateEvent`, `isRead`) VALUES (UUID(), $adresseEmeteur, $adresseRecipiendaire, $idDossierConcernes, 'refuser', $date,0)");
}
$stmtInsert->execute();

echo "Mise à jour effectuée avec succès";
echo '<meta http-equiv="refresh" content="0;URL=PageUtilisateur.php">';
?>
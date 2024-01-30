<?php
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
$droitsConcernes = $_POST['droitsConcernes'];
$date = time();


// Mise à jour dans la base de données en fonction du nom de la table
$stmt = $conn->prepare("UPDATE $table SET isRead='1' WHERE idNotif = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();

if ($table == "NotificationDossier") {
    $idDossierConcernes = $_POST['idDossierConcernes'];
    $stmtInsert = $conn->prepare("INSERT INTO NotificationDossier (`adresseRecipiendaire`, `adresseEmeteur`, `idDossierConcernes`, `typeNotification`, `droitsConcernes`, `dateEvent`, `isRead`) VALUES (:adresseRecipiendaire, :adresseEmeteur, :idDossierConcernes, 'refuser', :droitsConcernes, FROM_UNIXTIME(:date), 0)");
    $stmtInsert->bindParam(':adresseRecipiendaire', $adresseEmeteur);
    $stmtInsert->bindParam(':adresseEmeteur', $adresseRecipiendaire);
    $stmtInsert->bindParam(':idDossierConcernes', $idDossierConcernes);
    $stmtInsert->bindParam(':droitsConcernes', $droitsConcernes);
    $stmtInsert->bindParam(':date', $date);
}
if ($table == "NotificationAlgorithme") {
    $idAlgoConcernes = $_POST['idAlgoConcernes'];
    $stmtInsert = $conn->prepare("INSERT INTO NotificationAlgorithme (`adresseRecipiendaire`, `adresseEmeteur`, `idAlgoConcernes`, `typeNotification`, `droitsConcernes`, `dateEvent`, `isRead`) VALUES (:adresseRecipiendaire, :adresseEmeteur, :idAlgoConcernes, 'refuser', :droitsConcernes, FROM_UNIXTIME(:date), 0)");
    $stmtInsert->bindParam(':adresseRecipiendaire', $adresseEmeteur);
    $stmtInsert->bindParam(':adresseEmeteur', $adresseEmeteur);
    $stmtInsert->bindParam(':idAlgoConcernes', $idAlgoConcernes);
    $stmtInsert->bindParam(':date', $date);
}
$stmtInsert->execute();

echo "Mise à jour effectuée avec succès";
echo '<meta http-equiv="refresh" content="0;URL=PageUtilisateur.php">';
?>
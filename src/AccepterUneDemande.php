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
$droitsConcernes = $_POST['droitsConcernes'];
$date = time();


// Mise à jour dans la base de données en fonction du nom de la table
$stmt = $conn->prepare("UPDATE $table SET isRead='1' WHERE idNotif = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();

if ($table == "NotificationDossier") {
    $idDossierConcernes = $_POST['idDossierConcernes'];
    $stmtInsert = $conn->prepare("INSERT INTO `PermissionDossier`(`adresseUtilisateur`, `idDossier`, `droits`, `peutPartager`) VALUES (:adresseEmeteur,:idDossierConcernes,:droitsConcernes,0)");
    $stmtInsert->bindParam(':adresseEmeteur', $adresseEmeteur);
    $stmtInsert->bindParam(':idDossierConcernes', $idDossierConcernes);
    $stmtInsert->bindParam(':droitsConcernes', $droitsConcernes);
}
if ($table == "NotificationAlgorithme") {
    $idAlgoConcernes = $_POST['idAlgoConcernes'];
    $stmtInsert = $conn->prepare("INSERT INTO `PermissionAlgo`(`adresseUtilisateur`, `idAlgo`, `droits`, `peutPartager`) VALUES (:adresseEmeteur,:idAlgoConcernes,:droitsConcernes,0)");
    $stmtInsert->bindParam(':adresseEmeteur', $adresseEmeteur);
    $stmtInsert->bindParam(':idAlgoConcernes', $idAlgoConcernes);
    $stmtInsert->bindParam(':droitsConcernes', $droitsConcernes);
}
$stmtInsert->execute();

echo "Mise à jour effectuée avec succès";
echo '<meta http-equiv="refresh" content="0;URL=PageUtilisateur.php">';
?>
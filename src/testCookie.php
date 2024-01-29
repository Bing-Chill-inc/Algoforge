<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test cookie</title>
</head>
<body>
    <!-- Contenu HTML de votre page d'accueil -->
    <?php 
        if (isset($_COOKIE['adresseMail'])) {
            include 'bd.php';
            include 'fonctions.php';
            $adresseMail = lireCookie();
            $requete = $connexion->prepare("SELECT a.nom FROM algorithme a JOIN permissionalgo p ON p.idAlgo = a.id WHERE adresseUtilisateur = ?");
            $requete->bind_param("s", $adresseMail);
            $requete->execute();
            $requete->bind_result($nomAlgo);
            if ($requete->fetch()) {
                echo "<p>$nomAlgo</p>";
            }
            echo $adresseMail;
        } else {
            header("Location: pageAuthentification.php");
        } 
    ?>
    <a href="Deconnexion.php">Déconnexion</a>
    <a href="pageAuthentification.php">Déconnexion</a>

</body>
</html>
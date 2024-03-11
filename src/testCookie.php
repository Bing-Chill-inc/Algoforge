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
        include("fonctions.php");
        if (isset($_COOKIE['adresseMail'])) {
            $adresseMail = $_COOKIE['adresseMail'];
            echo "<p>Bonjour ".lireCookie($adresseMail)." !</p>";
        } else {
            header("Location: pageAuthentification.php");
        } 
    ?>
    <a href="Deconnexion.php">Déconnexion</a>

</body>
</html>
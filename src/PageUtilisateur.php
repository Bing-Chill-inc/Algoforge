<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>Page Utilisateur</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <Body>
        <header id="Barre_Utilisateur">
            <img src="..\Images\algoforgeLogo.png" alt="Logo Algoforge">
            <div class="centered">
                <a><img src="..\Images\NouveauAlgoLogo.PNG" alt="Nouvel Algo"><span>Nouvel Algo</span></a>
                <a><img src="..\Images\ImporterAlgoLogo.PNG" alt="Importer Algo"><span>Importer Algo</span></a>
                <a><img src="..\Images\NouveauDossierLogo.PNG" alt="Nouveaux Dossier"><span>Nouveaux Dossier</span></a>
                <a><img src="..\Images\ImporterDossierLogo.PNG" alt="Importer Dossier"> <span>Importer Dossier</span></a>
            </div>
            <div class="right-aligned">
                <img src="..\Images\RechercheLogo.PNG" alt="Recherche">
                <img src="..\Images\CompteLogo.PNG" alt="Compte">
            </div>
        </header>
        <div class="information">
            <?php
                $_bdd= "jsuares_bd"; // Base de données
                $_host= "lakartxela.iutbayonne.univ-pau.fr";
                $_user= "jsuares_bd"; // Utilisateur
                $_pass= "jsuares_bd"; // mp
                $_nomtable= "NotificationDossier";
                $link=mysqli_connect($_host,$_user,$_pass,$_bdd) or die( "Impossible de se connecter à la base de données");

                // Afficher le contenu de la bdd
                $query = "SELECT NotificationDossier.*, Dossier.* FROM NotificationDossier INNER JOIN Dossier ON NotificationDossier.idDossierConcernes = Dossier.id WHERE NotificationDossier.adresseRecipiendaire = 'utilisateur2@mail.com' AND NotificationDossier.isRead = '0'ORDER BY NotificationDossier.dateEvent DESC"; 
                $resultats = mysqli_query($link, $query);
                mysqli_close($link);
                while ($donnees = mysqli_fetch_assoc($resultats))
                {
                    switch($donnees['typeNotification']){
                        case "modification":
                            echo $donnees['adresseEmeteur']." a effectuer une modification";
                            echo "<br>";
                            echo $donnees['nom'];
                            echo "      ".$donnees['dateEvent'];
                            echo "<br>";
                        break;
                        case "partagé":
                            echo $donnees['adresseEmeteur']." a partagé avec vous";
                            echo "<br>";
                            echo "le dossier n°".$donnees['nom'];
                            echo "      ".$donnees['droitsConcernes'];
                            echo "<br>";
                        break;
                        case "demande":
                            echo $donnees['adresseEmeteur']." a demande les droits";
                            echo "<br>";
                            echo $donnees['nom'];
                            echo "      ".$donnees['droitsConcernes'];
                            echo "<br>";
                        break;
                        case "refusé":
                            echo $donnees['adresseEmeteur']." a refuser votre demande";
                            echo "<br>";
                            echo "le dossier n°".$donnees['nom'];
                            echo "      ".$donnees['droitsConcernes'];
                            echo "<br>";
                        break;

                    }
                }
            ?>
        </div>

        <div class="MonEspace">

        </div>
    </Body>
</html>
<?php
    
?>
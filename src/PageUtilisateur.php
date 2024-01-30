<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>Page Utilisateur</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <Body id="PageUtilisateur">
        <header id="Barre_Utilisateur">
            <img src="..\Images\algoforgeLogo.png" alt="Logo Algoforge">
            <div class="centered">
                <button><img src="..\Images\NouveauAlgoLogo.PNG" alt="Nouvel Algo"><span>Nouvel Algo</span></button>
                <button><img src="..\Images\ImporterAlgoLogo.PNG" alt="Importer Algo"><span>Importer Algo</span></button>
                <button><img src="..\Images\NouveauDossierLogo.PNG" alt="Nouveaux Dossier"><span>Nouveaux Dossier</span></button>
                <button><img src="..\Images\ImporterDossierLogo.PNG" alt="Importer Dossier"> <span>Importer Dossier</span></button>
            </div>
            <div class="right-aligned">
                <img src="..\Images\RechercheLogo.PNG" alt="Recherche">
                <img src="..\Images\CompteLogo.PNG" alt="Compte">
            </div>
        </header>
        <div class="information">
            <h1>Notification:</h1>
            <?php
                $_bdd= "jsuares_bd"; // Base de données
                $_host= "lakartxela.iutbayonne.univ-pau.fr";
                $_user= "jsuares_bd"; // Utilisateur
                $_pass= "jsuares_bd"; // mp
                $link=mysqli_connect($_host,$_user,$_pass,$_bdd) or die( "Impossible de se connecter à la base de données");
                $query = "SELECT NotificationDossier.*, Dossier.*, Utilisateur.* FROM NotificationDossier INNER JOIN Dossier ON NotificationDossier.idDossierConcernes = Dossier.id INNER JOIN Utilisateur ON NotificationDossier.adresseEmeteur = Utilisateur.adressemail WHERE NotificationDossier.adresseRecipiendaire = 'utilisateur2@mail.com' AND NotificationDossier.isRead = '0' ORDER BY NotificationDossier.dateEvent DESC"; 
                $resultats = mysqli_query($link, $query);
                mysqli_close($link);
                echo "<table id='notification'>";
                while ($donnees = mysqli_fetch_assoc($resultats))
                {
                    echo "<tr>";
                    echo "<td><img src='https://thispersondoesnotexist.com?i=".rand(0,99999)."' alt='imageProfil'></td>";

                    echo "<td>";
                    echo $donnees['adresseEmeteur'] . "<br>";
                    echo $donnees['nom'];
                    echo $donnees['droitsConcernes'];
                    echo "</td>";

                    switch($donnees['typeNotification']){
                        case "modification":
                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationDossier'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                        case "partager":
                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationDossier'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                        case "demande":
                            echo "<td>";
                            echo "<form action='AccepterUneDemande.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='".$donnees['adresseEmeteur']."'>";
                            echo "<button type='submit'>Accepter</button>";
                            echo "</form>";

                            echo "<form action='RefuserUneDemande.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationDossier'>";
                            echo "<input type='hidden' name='adresseEmeteur' value='" . $donnees['adresseEmeteur'] . "'>";
                            echo "<input type='hidden' name='adresseRecipiendaire' value='" . $donnees['adresseRecipiendaire'] . "'>";
                            echo "<input type='hidden' name='idDossierConcernes' value='" . $donnees['idDossierConcernes'] . "'>";
                            echo "<input type='hidden' name='droitsConcernes' value='" . $donnees['droitsConcernes'] . "'>";
                            echo "<button type='submit'>Refuser</button>";
                            echo "</form>";
                            echo "</td>";
                            echo "</tr>";
                            break;
                        case "refuser":
                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationDossier'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                    }
                    echo "</tr>";
                }

                $link=mysqli_connect($_host,$_user,$_pass,$_bdd) or die( "Impossible de se connecter à la base de données");
                $query = "SELECT NotificationAlgorithme.*, Algorithme.*, Utilisateur.* FROM NotificationAlgorithme INNER JOIN Algorithme ON NotificationAlgorithme.idAlgoConcernes = Algorithme.id INNER JOIN Utilisateur ON NotificationAlgorithme.adresseEmeteur = Utilisateur.adressemail WHERE NotificationAlgorithme.adresseRecipiendaire = 'utilisateur2@mail.com' AND NotificationAlgorithme.isRead = '0' ORDER BY NotificationAlgorithme.dateEvent DESC"; 
                $resultats = mysqli_query($link, $query);
                mysqli_close($link);
                while ($donnees = mysqli_fetch_assoc($resultats))
                {
                    echo "<tr>";
                    echo "<td><img src='https://thispersondoesnotexist.com?i=".rand(0,99999)."' alt='imageProfil'></td>";

                    echo "<td>";
                    echo $donnees['adresseEmeteur'] . "<br>";
                    echo $donnees['nom'];
                    echo $donnees['droitsConcernes'];
                    echo "</td>";
                    switch($donnees['typeNotification']){
                        case "modification":

                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationAlgorithme'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                        case "partager":
                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationAlgorithme'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                        case "demande":

                            echo "<td>";
                            echo "<form action='AccepterUneDemande.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='".$donnees['adresseEmeteur']."'>";
                            echo "<button type='submit'>Accepter</button>";
                            echo "</form>";

                            echo "<form action='RefuserUneDemande.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationDossier'>";
                            echo "<input type='hidden' name='adresseEmeteur' value='" . $donnees['adresseEmeteur'] . "'>";
                            echo "<input type='hidden' name='adresseRecipiendaire' value='" . $donnees['adresseRecipiendaire'] . "'>";
                            echo "<input type='hidden' name='idAlgoConcernes' value='" . $donnees['idAlgoConcernes'] . "'>";
                            echo "<input type='hidden' name='droitsConcernes' value='" . $donnees['droitsConcernes'] . "'>";
                            echo "<button type='submit'>Refuser</button>";
                            echo "</form>";
                            echo "</td>";
                            echo "</tr>";
                            break;
                        case "refuser":

                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationAlgorithme'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                    }
                    echo "</tr>";
                }
                echo "</table>";
            ?>
        </div>

        <div class="MonEspace">
            <h1>Mon Espace</h1>
            <table id='affichage'>
            <tr><td></td><td>Nom</td><td>Propriétaire</td><td>Dernière modification</td><td></td></tr>
            <?php

            ?>
            </table>
        </div>
    </Body>
</html>
<script>
    document.body.style.setProperty('--sizeModifier', 1);
    document.body.style.setProperty('--transitionTime', "0.0s");
    document.body.style.setProperty('--bgColor', "#222222");
    document.body.style.setProperty('--fgColor', "#838787");
    document.body.style.setProperty('--fgColorForward', "#A6AAA9");
    document.body.style.setProperty('--goodColor', "#8ABE5E");
    document.body.style.setProperty('--goodColorTransparent', "#8ABE5E99");
    document.body.style.setProperty('--errorColor', "#C82606");
    document.body.style.setProperty('--warningColor', "#FFE989");
    document.body.style.setProperty('--titleColor', "#34A5DA");
</script>
<?php
    
?>
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
                    switch($donnees['typeNotification']){
                        case "modification":
                            echo "<tr>";
                            echo "<td><img src='".$donnees['imageProfil']."' alt='imageProfil'></td>";

                            echo "<td>";
                            echo $donnees['adresseEmeteur'] . "<br>";
                            echo $donnees['nom'];
                            echo $donnees['droitsConcernes'];
                            echo "</td>";

                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationDossier'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                        case "partager":
                            echo "<tr>";
                            echo "<td><img src='".$donnees['imageProfil']."' alt='imageProfil'></td>";

                            echo "<td>";
                            echo $donnees['adresseEmeteur'] . "<br>";
                            echo $donnees['nom'];
                            echo $donnees['droitsConcernes'];
                            echo "</td>";

                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationDossier'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                        case "demande":
                            echo "<tr>";
                            echo "<td><img src='".$donnees['imageProfil']."' alt='imageProfil'></td>";

                            echo "<td>";
                            echo $donnees['adresseEmeteur'] . "<br>";
                            echo $donnees['nom'];
                            echo $donnees['droitsConcernes'];
                            echo "</td>";

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
                            echo "<button type='submit'>Refuser</button>";
                            echo "</form>";
                            echo "</td>";
                            echo "</tr>";
                            break;
                        case "refuser":
                            echo "<tr>";
                            echo "<td><img src='".$donnees['imageProfil']."' alt='imageProfil'></td>";

                            echo "<td>";
                            echo $donnees['adresseEmeteur'] . "<br>";
                            echo $donnees['nom'];
                            echo $donnees['droitsConcernes'];
                            echo "</td>";

                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationDossier'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                    }
                }
                $link=mysqli_connect($_host,$_user,$_pass,$_bdd) or die( "Impossible de se connecter à la base de données");
                $query = "SELECT NotificationAlgorithme.*, Algorithme.*, Utilisateur.* FROM NotificationAlgorithme INNER JOIN Algorithme ON NotificationAlgorithme.idAlgoConcernes = Algorithme.id INNER JOIN Utilisateur ON NotificationAlgorithme.adresseEmeteur = Utilisateur.adressemail WHERE NotificationAlgorithme.adresseRecipiendaire = 'utilisateur2@mail.com' AND NotificationAlgorithme.isRead = '0' ORDER BY NotificationAlgorithme.dateEvent DESC"; 
                $resultats = mysqli_query($link, $query);
                mysqli_close($link);
                while ($donnees = mysqli_fetch_assoc($resultats))
                {
                    switch($donnees['typeNotification']){
                        case "modification":
                            echo "<tr>";
                            echo "<td><img src='".$donnees['imageProfil']."' alt='imageProfil'></td>";

                            echo "<td>";
                            echo $donnees['adresseEmeteur'] . "<br>";
                            echo $donnees['nom'];
                            echo $donnees['droitsConcernes'];
                            echo "</td>";

                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationAlgorithme'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                        case "partager":
                            echo "<tr>";
                            echo "<td><img src='".$donnees['imageProfil']."' alt='imageProfil'></td>";

                            echo "<td>";
                            echo $donnees['adresseEmeteur'] . "<br>";
                            echo $donnees['nom'];
                            echo $donnees['droitsConcernes'];
                            echo "</td>";

                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationAlgorithme'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                        case "demande":
                            echo "<tr>";
                            echo "<td><img src='".$donnees['imageProfil']."' alt='imageProfil'></td>";

                            echo "<td>";
                            echo $donnees['adresseEmeteur'] . "<br>";
                            echo $donnees['nom'];
                            echo $donnees['droitsConcernes'];
                            echo "</td>";

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
                            echo "<button type='submit'>Refuser</button>";
                            echo "</form>";
                            echo "</td>";
                            echo "</tr>";
                            break;
                        case "refuser":
                            echo "<tr>";
                            echo "<td><img src='".$donnees['imageProfil']."' alt='imageProfil'></td>";

                            echo "<td>";
                            echo $donnees['adresseEmeteur'] . "<br>";
                            echo $donnees['nom'];
                            echo $donnees['droitsConcernes'];
                            echo "</td>";

                            echo "<form action='script_mise_a_jour.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationAlgorithme'>";
                            echo "<td><button type='submit'>Lut</button></td>";
                            echo "</form>";
                            echo "</tr>";
                            break;
                    }
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
<?php
    
?>
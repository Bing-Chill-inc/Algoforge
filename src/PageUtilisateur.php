<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>Page Utilisateur</title>
        <link rel="stylesheet" href="style.css">
        <link href="DataTables/datatables.css" rel="stylesheet">
        <script src="DataTables/datatables.js"></script>
    </head>
    <Body id="PageUtilisateur">
        <header id="Barre_Utilisateur">
            <img src="..\Images\algoforgeLogo.png" alt="Logo Algoforge">
            <div class="centered">
                <button onclick="bouttonCreerUnAlgo()"><img src="..\Images\nouveauAlgo.svg" alt="Nouvel Algo"><span>Nouvel Algo</span></button>
                <button><img src="..\Images\ImporterAlgo.svg" alt="Importer Algo"><span>Importer Algo</span></button>
                <button><img src="..\Images\dossier.svg" alt="Nouveaux Dossier"><span>Nouveaux Dossier</span></button>
                <button><img src="..\Images\dossierUpload.svg" alt="Importer Dossier"> <span>Importer Dossier</span></button>
            </div>
            <div class="right-aligned">
                <img src="..\Images\RechercheLogo.PNG" alt="Recherche">
                <img src="..\Images\CompteLogo.PNG" alt="Compte">
            </div>
        </header>
    <div id="formulaireContainer">
        <h2>Creer un algorithme</h2>
        <form name="CreerAlgo">
            <input type="text" id="zoneSaisie" name="zoneSaisie" placeholder="Entrez le nom de l'algorithmes">
        </form>
        <br>
        <button onclick="creerUnAlgo()">Valider</button>
    </div>
    <script>
        function bouttonCreerUnAlgo()
        {
            if(document.getElementById("formulaireContainer").style.display == "block")
            {
                masquerFormulaire();
            }
            else
            {
                afficherFormulaire();
            }
        }
        function afficherFormulaire() {
            document.getElementById("formulaireContainer").style.display = "block";
        }
        function masquerFormulaire() {
            document.getElementById("formulaireContainer").style.display = "none";
        }
        function creerUnAlgo() {
            const formData = new FormData(document.forms.CreerAlgo);
            //formData.append("test", "erger");
            // Utilisation d'AJAX pour envoyer les données à CreerUnAlgorithme.php
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "CreerUnAlgorithme.php");
            xmlhttp.send(formData);
            // Masquer le formulaire après l'envoi de la requête
            masquerFormulaire();
        }


    </script>
    
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
                            echo "<input type='hidden' name='table' value='NotificationDossier'>";
                            echo "<input type='hidden' name='adresseEmeteur' value='" . $donnees['adresseEmeteur'] . "'>";
                            echo "<input type='hidden' name='idDossierConcernes' value='" . $donnees['idDossierConcernes'] . "'>";
                            echo "<input type='hidden' name='droitsConcernes' value='" . $donnees['droitsConcernes'] . "'>";
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
                            echo "<input type='hidden' name='table' value='NotificationAlgorithme'>";
                            echo "<input type='hidden' name='adresseEmeteur' value='" . $donnees['adresseEmeteur'] . "'>";
                            echo "<input type='hidden' name='idAlgoConcernes' value='" . $donnees['idAlgoConcernes'] . "'>";
                            echo "<input type='hidden' name='droitsConcernes' value='" . $donnees['droitsConcernes'] . "'>";
                            echo "<button type='submit'>Accepter</button>";
                            echo "</form>";

                            echo "<form action='RefuserUneDemande.php' method='post'>";
                            echo "<input type='hidden' name='id' value='" . $donnees['idNotif'] . "'>";
                            echo "<input type='hidden' name='table' value='NotificationAlgorithme'>";
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
            <table id='affichage' class="display" style="width:100%">
                <thead>
                    <th></th>
                    <th>Nom</th>
                    <th>Propriétaire</th>
                    <th>Dernière modification</th>
                    <th></th>
                </thead>
                <tbody>
                    <?php
                        $link=mysqli_connect($_host,$_user,$_pass,$_bdd) or die( "Impossible de se connecter à la base de données");
                        $query = "SELECT Dossier.*, Utilisateur.* FROM Dossier INNER JOIN PermissionDossier ON PermissionDossier.idDossier = Dossier.id INNER JOIN Utilisateur ON Utilisateur.adresseMail = PermissionDossier.adresseUtilisateur WHERE PermissionDossier.droits = 'Propriétaire'"; 
                        $resultats = mysqli_query($link, $query);
                        mysqli_close($link);
                        while ($donnees = mysqli_fetch_assoc($resultats))
                        {
                            echo "<tr>";
                            echo "<td></td>";
                            echo "<td>".$donnees['Dossier.nom']."</td>";
                            echo "<td>".$donnees['Utilisateur.adresseMail']."</td>";
                            echo "<td>".$donnees['Dossier.dateModification']."</td>";
                            echo "<td></td>";
                            echo "</tr>";
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </Body>
</html>
<script>
    new DataTable('#affichage');
</script>
<?php
    
?>
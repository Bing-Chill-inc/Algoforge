<?php
$serveur = "lakartxela.iutbayonne.univ-pau.fr";
$utilisateur = "jsuares_bd";
$mot_de_passe = "jsuares_bd";
$base_de_donnees = "jsuares_bd";  
$connexion = new mysqli($serveur, $utilisateur, $mot_de_passe, $base_de_donnees);
// Vérification de la connexion
if ($connexion->connect_error) {
    die("La connexion a échoué : " . $connexion->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
// Vérifier si le champ "Nom" existe dans la requête POST
    if(isset($_POST["zoneSaisie"])) {
        $nomDossier = $_POST["zoneSaisie"];
        if($nomDossier == "") 
        {
            die("Le nom est incorecte");
        }
        $numero = 0;
        $nomDossierChemin = str_replace([' ', '/'], '',$nomDossier);
        $chemin = "AlgoRoot/" . $nomDossierChemin . ".json";
        while (file_exists($chemin))
        {
            $chemin =  "AlgoRoot/" . $nomDossierChemin ."(". $numero . ")". ".json" ;
            $numero++; 
        }
        file_put_contents($chemin, "[]");
        if(!file_exists($chemin))
        {
            die("Erreur lors de la creation du fichier");
        }
        $dateAjout = date("Y-m-d H:i:s");
        $dateModification = date("Y-m-d H:i:s");
        $idDossierParent = NULL;


        // Préparation de la requête avec des paramètres de substitution
        $requete = $connexion->prepare("INSERT INTO Algorithme(nom, chemin, dateAjout, dateModification, idDossierParent) VALUES (?, ?, ?, ?, ?)");
        // Vérification de la préparation de la requête
        if ($requete === false) {
            die("La préparation de la requête a échoué : " . $connexion->error);
        }

        // Liaison des paramètres
        $requete->bind_param("ssssi", $nomDossier, $chemin, $dateAjout, $dateModification, $idDossierParent);

        // Exécution de la requête
        if ($requete->execute() === true) {
            $idAlgo = $requete->insert_id;
            echo "Enregistrement inséré avec succès.";
            echo $idAlgo;
        } else {
            echo "Erreur lors de l'insertion : " . $requete->error;
        }

        // Fermeture de la requête et de la connexion
        $requete->close();
        $requete = $connexion->prepare("INSERT INTO PermissionAlgo(adresseUtilisateur, idAlgo, droits, peutPartager) VALUES (?, ?, ?, ?)");

        if($requete === false) {
            die("La préparation de la requête a échoué : " . $connexion->error);
        }
        $adresseUtilisateur = "utilisateur5@mail.com";
        $droits = "proprietaire";
        $peutPartager = 1;
        $requete->bind_param("sisi", $adresseUtilisateur, $idAlgo, $droits, $peutPartager);
        if ($requete->execute() === true) {
            echo "Enregistrement inséré avec succès. Avec id:";

        } else {
            echo "Erreur lors de l'insertion : " . $requete->error;
        }
        $requete->close();
        $connexion->close();
    } else {
        echo "Le champ 'nomDossier' n'a pas été correctement soumis.";
    }
} else {
    echo "La requête n'est pas de type POST.";
}
?>
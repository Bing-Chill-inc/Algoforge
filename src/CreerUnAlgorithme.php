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
        $adresseUtilisateur = "utilisateur5@mail.com";
        $droits = "proprietaire";
        $peutPartager = 1;
        $nomAlgorithmes = $_POST["zoneSaisie"];
        $dateAjout = date("Y-m-d H:i:s");
        $dateModification = date("Y-m-d H:i:s");
        $idDossierParent = NULL;
        //Verifier si le nomAlgorithmes est corecte   
        $numero = 0;
        $nomAlgoChemin = str_replace([' ', '/'], '',$nomAlgorithmes);
        if($nomAlgoChemin == "")
        {
            die("Le nom de l'algorithme est incorecte");
        }
        $chemin = "AlgoRoot/" . $nomAlgoChemin . ".json";
        while (file_exists($chemin))
        {
            $chemin =  "AlgoRoot/" . $nomAlgoChemin ."(". $numero . ")". ".json" ;
            $numero++; 
        }
        file_put_contents($chemin, "[]");
        if(!file_exists($chemin))
        {
            die("Erreur lors de la creation du fichier");
        }
        $temp_nom = $nomAlgorithmes;
        $numero = 0;
        while(true){
            $requete = $connexion->prepare("SELECT * FROM Algorithme JOIN PermissionAlgo ON PermissionAlgo.idAlgo = Algorithme.id
            WHERE Algorithme.nom = ? AND (Algorithme.idDossierParent = ? OR (Algorithme.idDossierParent IS NULL AND ? IS NULL)) AND PermissionAlgo.adresseUtilisateur=?;");
            if ($requete === false) {
                die("La préparation de la requête a échoué : " . $connexion->error);
            }
            $requete->bind_param("siss", $temp_nom, $idDossierParent,$idDossierParent, $adresseUtilisateur);
            $requete->execute();

            $resultat = $requete->get_result();
            if ($resultat->num_rows == 0) {
                $nomAlgorithmes = $temp_nom;
                break;
            }   
            $temp_nom = $nomAlgorithmes."(". $numero.")";
            $requete->close();
        }
        $requete = $connexion->prepare("INSERT INTO Algorithme(nom, chemin, dateAjout, dateModification, idDossierParent) VALUES (?, ?, ?, ?, ?);");
        if ($requete === false) {
            die("La préparation de la requête a échoué : " . $connexion->error);
        }
        $requete->bind_param("ssssi", $nomAlgorithmes, $chemin, $dateAjout, $dateModification, $idDossierParent);
        if ($requete->execute() === true) {
            $idAlgo = $requete->insert_id;
            echo "Enregistrement inséré avec succès.";
            echo $idAlgo;
        } else {
            echo "Erreur lors de l'insertion : " . $requete->error;
        }

        $requete->close();
        $requete = $connexion->prepare("INSERT INTO PermissionAlgo(adresseUtilisateur, idAlgo, droits, peutPartager) VALUES (?, ?, ?, ?);");

        if($requete === false) {
            die("La préparation de la requête a échoué : " . $connexion->error);
        }
        $requete->bind_param("sisi", $adresseUtilisateur, $idAlgo, $droits, $peutPartager);
        if ($requete->execute() === true) {
            echo "Enregistrement inséré avec succès. Avec id:";

        } else {
            echo "Erreur lors de l'insertion : " . $requete->error;
        }
        $requete->close();
        $connexion->close();
    } else {
        echo "Le champ 'NomAlgorithmes' n'a pas été correctement soumis.";
    }
} else {
    echo "La requête n'est pas de type POST.";
}
?>
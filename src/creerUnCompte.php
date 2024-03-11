<?php
    // Fichier php requis
    include 'bd.php'; // Connexion à la base de données
    include 'fonctions.php'; // Fonctions utiles

    // Vérifier si l'utilisateur a fait le reCAPTCHA
    if (isset($_POST['g-recaptcha-response'])) {
        $recaptcha_response = $_POST['g-recaptcha-response']; // Récupérer le token de réponse reCAPTCHA envoyé depuis le formulaire
        $project_id = "algoforge-recapt-1706536827466"; // ID du projet reCAPTCHA Enterprise
        $api_key = getenv('CLE_API_RECAPTCHA'); // Récupération de la clé API reCAPTCHA Enterprise
    
        // Les données à envoyer dans le corps de la requête
        $data = array(  
            "event" => array(
                "token" => $recaptcha_response,
                "siteKey" => "6LdNIl8pAAAAALIEBCwlcZnOi85CNc1UjSMh1Yug",
                "expectedAction" => "LOGIN"
            )
        );
    
        // Convertir le tableau PHP en JSON
        $json_data = json_encode($data);
        
        // URL de l'API reCAPTCHA Enterprise
        $url = "https://recaptchaenterprise.googleapis.com/v1/projects/{$project_id}/assessments?key={$api_key}";
        
        // Configuration de l'appel cURL
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        
        // Exécution de la requête
        $response = curl_exec($ch);
        
        // Vérification des erreurs
        if (curl_errno($ch)) {
            // Rediriger vers la page d'authentification
            header("Location: pageAuthentification.php?erreur=3");
            exit();
        }
        
        // Fermeture de la session cURL
        curl_close($ch);
        
        // Traitement de la réponse JSON
        $response_data = json_decode($response, true);
        
        // Vérifier si le token est valide
        if ($response_data["tokenProperties"]["valid"]) {
            // Le token est valide, continuez avec la création du compte
            session_start();
            // Vérifier si l'utilisateur a soumis le formulaire
            if ($_SERVER["REQUEST_METHOD"] != "POST") {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?");
                exit();
            }

            // Récupérer les informations d'identification
            $mail = htmlentities($_POST["mail"]);
            $motdepasse = htmlentities($_POST["motDePasse"]);
            $conf_motdepasse = htmlentities($_POST["conf-motDePasse"]);
            $motDePasseHash = password_hash($motdepasse, PASSWORD_DEFAULT);
            $_SESSION['mail'] = $mail;
            $_SESSION['motDePasseHash'] = $motDePasseHash;
            
            // Regarder si le mail est valide
            if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?erreur=4");
                exit();
            }

            // Regarder si le mot de passe est valide
            if ($motDePasseHash === null) {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?erreur=5");
                exit();
            }
            if($motdepasse != $conf_motdepasse)
            {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?erreur=5.1");
                exit();
            }
            if(strlen($motdepasse) < 8) {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?erreur=5.2");
                exit();
            }
            if (!preg_match('/\d/', $motdepasse)) {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?erreur=5.3");
                exit();
            }
            if (!preg_match('/[A-Z]/', $motdepasse)) {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?erreur=5.4");
                exit();
            }
            if (!preg_match('/[a-z]/', $motdepasse)) {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?erreur=5.5");
                exit();
            }
            if (!preg_match('/[!@#$%^&*()\-_=+{};:,<.>]/', $motdepasse)) {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?erreur=5.6");
                exit();
            }

            /* PDO */
            // Vérifier si l'utilisateur n'existe pas déjà
            $verifNom = $connexion->prepare("SELECT COUNT(*) FROM Utilisateur WHERE adresseMail = :mail");
            $verifNom->bindParam(":mail", $mail, PDO::PARAM_STR);
            $verifNom->execute();
            $count = $verifNom->fetchColumn();
            $verifNom->closeCursor();
            $connexion = null;

            /* mysqli 
            // Vérifier si l'utilisateur existe pas déjà
            $verifNom = $connexion->prepare("SELECT COUNT(*) FROM Utilisateur WHERE adresseMail = ?");
            $verifNom->bind_param("s", $mail);
            $verifNom->execute();
            $verifNom->bind_result($count);
            $verifNom->fetch();
            $verifNom->close();
            */

            // Si le nom n'existe pas, procéder à l'insertion
            if ($count != 0) {
                header("Location: pageAuthentification.php?erreur=6");
                exit();
            }

            // Générer un code de vérification
            $code_verification = codeVerification(6);
            $_SESSION['code_verification'] = $code_verification;

            // Sujet du mail
            $sujet = "Code de verification";

            // Corps du mail
            $message = "Votre code de vérification est: " . $code_verification;

            $from = "From: contact@algoforge.fr";
            // Envoi du mail
            $mailEnvoye = mail($mail, $sujet, $message, $from);

            // Vérifier si le mail a été envoyé avec succès
            if (!$mailEnvoye) {
                // Rediriger vers la page d'authentification
                header("Location: pageAuthentification.php?erreur=7");
                exit();
            }
            
            echo '<form  action="verifCode.php"  method="post">';
            echo '<input type="text" class="boiteSaisie" name="codeVerif" placeholder="Code verification" required>';
            echo '<br>';
            echo '<input type="submit" class="btnInput boutton" value="Se connecter">';
            echo '</form>';            
        } 
        else {
            // Le token n'est pas valide, rediriger vers la page d'authentification
            header("Location: pageAuthentification.php?erreur=8");
            exit();
        }
    }
    else {
        // La case à cocher reCAPTCHA n'a pas été cochée, rediriger vers la page d'authentification
        header("Location: pageAuthentification.php?erreur=9");
        exit();
    }
?>
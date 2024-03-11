<?php
    if(isset($_COOKIE['adresseMail'])) {
        header("Location: testCookie.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authentication</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://www.google.com/recaptcha/enterprise.js" async defer></script>
</head>
<body id="pageDauthentification">
    <div id="login">
        <h1>Connexion</h1><br>
        <form action="Authentification.php" method="post" id="FormulaireAuthentification">
            <input type="text" class="boiteSaisie" name="adresseMail" placeholder="adresse e-mail" required>
            <br>
            <input type="password" class="boiteSaisie" name="motDePasse" placeholder="mot de passe" required>
            <br>
            <!--<input type="checkbox" id="myCheckbox" name="seSouvenir"> 
            <label for="myCheckbox">Se souvenir de moi</label> -->
            <button type="submit" class="btnInput boutton" id="btnConnexion">Se connecter</button>
        </form>
<?php
    if(isset($_GET['erreur']) && $_GET['erreur'] == 1) {
        echo '<p class="erreur">Adresse e-mail et/ou mot de passe incorrect.</p>';
    }
?>
        <div id="traitLogin">
            <hr>
            <p class="centered-text">ou</p>
        </div>
        <button class="discord-signin-button boutton" onclick="window.location.href='https://discord.com/api/oauth2/authorize?client_id=1199990152823578635&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%2FAlgoForge%2Fsrc%2FAuthentificationDiscord.php&scope=identify'">
            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg" alt="Se connecter avec Discord">
            <p>Se connecter avec Discord</p>
        </button>
<?php
    if(isset($_GET['erreur']) && $_GET['erreur'] == 2) {
        echo '<p class="erreur">Une erreur est survenue lors de l\'authentification avec Discord. Veuillez réessayer.</p>';
    }
?>     
    </div>
    <div id="espacement">
        <img id="imgSeparateur" src="assets/separateurLoginInscription.svg">
    </div>
    <div id="register">
        <h1>Créer un<br>compte</h1>
        <form id="registerForm" action="creerUnCompte.php" method="post">
            <input type="text" class="boiteSaisie" name="mail" placeholder="adresse e-mail" required>
            <br>
            <input type="password" id="motDePasse" class="boiteSaisie" name="motDePasse" placeholder="mot de passe" onfocus="mdpSelect()" onblur="mdpDeSelect()" required>
            <br>
            <p class="cacher motDePasseAide"> Pour créer un mot de passe sécuriser, il doit contenir au moins: </p>
            <ul class="cacher motDePasseAide">
                <li id="li-taille" class="valid">- 8 caractères</li>
                <li id="li-chiffre" class="valid">- 1 chiffre</li>
                <li id="li-maj" class="valid">- 1 majuscule</li>
                <li id="li-nomaj" class="valid">- 1 minuscule</li>
                <li id="li-special" class="valid">- 1 caractère spécial</li>
            </ul>
            <input type="password" id="motDePasseConf" class="boiteSaisie" name="conf-motDePasse" placeholder="confirmer le mot de passe" onfocus="mdpConfSelect()" onblur="mdpConfDeSelect()" required>
            <ul class="cacher motDePasseConfAide">
                <li id="li-mdpconf" class="invalid">- le mot de passe conf ne correspond pas au mot de passe</li>
            </ul>
            <br>
            <div class="g-recaptcha" data-sitekey="6LdNIl8pAAAAALIEBCwlcZnOi85CNc1UjSMh1Yug" data-action="LOGIN"></div>
            <input type="submit" class="btnInput boutton" value="Créer le compte"> 
        </form>
<?php
    if(isset($_GET['erreur'])) {
        $erreur = $_GET['erreur'];
        switch($erreur) {
            case 3:
                echo '<p class="erreur">Une erreur est survenue lors du traitement du captcha. Veuillez réessayer.</p>';
                break;
            case 4:
                echo '<p class="erreur">L\'adresse e-mail fournie n\'est pas valide. Veuillez saisir une adresse e-mail correcte.</p>';
                break;
            case 5:
                echo '<p class="erreur">Le mot de passe ne peut pas être vide. Veuillez saisir un mot de passe valide.</p>';
                break;
            case 5.1:
                echo '<p class="erreur">Les mots de passe ne correspondent pas. Veuillez vous assurer de saisir le même mot de passe dans les deux champs.</p>';
                break;
            case 5.2:
                echo '<p class="erreur">Le mot de passe doit contenir au moins 8 caractères. Veuillez choisir un mot de passe plus long.</p>';
                break;
            case 5.3:
                echo '<p class="erreur">Le mot de passe doit contenir au moins un chiffre. Veuillez choisir un mot de passe contenant au moins un chiffre.</p>';
                break;
            case 5.4:
                echo '<p class="erreur">Le mot de passe doit contenir au moins une majuscule. Veuillez choisir un mot de passe contenant au moins une majuscule.</p>';
                break;
            case 5.5:
                echo '<p class="erreur">Le mot de passe doit contenir au moins une minuscule. Veuillez choisir un mot de passe contenant au moins une minuscule.</p>';
                break;
            case 5.6:
                echo '<p class="erreur">Le mot de passe doit contenir au moins un caractère spécial. Veuillez choisir un mot de passe contenant au moins un caractère spécial.</p>';
                break;
            case 6:
                echo '<p class="erreur">L\'adresse e-mail fournie est déjà utilisée. Veuillez saisir une autre adresse e-mail.</p>';
                break;
            case 7:
                echo '<p class="erreur">Une erreur est survenue lors de l\'envoi du mail de vérification. Veuillez réessayer.</p>';
                break;
            case 8:
                echo '<p class="erreur">Le code de vérification est invalide. Veuillez saisir un code de vérification valide.</p>';
                break;
            case 9:
                echo '<p class="erreur">Une erreur est survenue avec le captcha. Veuillez réessayer.</p>';
                break;
            case 10:
                echo '<p class="erreur">Veuillez cocher la case reCAPTCHA pour continuer.</p>';
                break;
        }
    }
?> 
        <script>
            function mdpConfSelect()
            {
                for(let e of document.querySelectorAll(".motDePasseConfAide"))
                {
                    e.classList.remove("cacher");
                }
                verifMotDePasseConf();
            }
            function mdpConfDeSelect()
            {
                for(let e of document.querySelectorAll(".motDePasseConfAide"))
                {
                    e.classList.add("cacher");
                }
            }
            document.getElementById('motDePasseConf').addEventListener('input', verifMotDePasseConf);
            function verifMotDePasseConf()
            {
                const confpassword = document.getElementById('motDePasseConf').value;
                const password = document.getElementById('motDePasse').value;
                document.getElementById("li-mdpconf").className = password == confpassword ? 'valid' : 'invalid';
                for(let e of document.querySelectorAll(".motDePasseConfAide"))
                {
                    if(password == confpassword ) {
                        e.classList.add("cacher");
                    }
                    else
                    {
                        e.classList.remove("cacher");
                    }
                }
            }
        </script>
        <script>
            function mdpSelect()
            {
                for(let e of document.querySelectorAll(".motDePasseAide"))
                {
                    e.classList.remove("cacher");
                }
            }
            function mdpDeSelect()
            {
                for(let e of document.querySelectorAll(".motDePasseAide"))
                {
                    e.classList.add("cacher");
                }
            }
            document.getElementById('motDePasse').addEventListener('input', function () {
                // Récupérer la valeur du mot de passe
                var password = this.value;
        
                // Vérifier chaque critère et afficher ou masquer l'élément correspondant
                document.getElementById("li-taille").className = password.length >= 8 ? 'valid' : 'invalid';
                document.getElementById("li-chiffre").className = /\d/.test(password) ? 'valid' : 'invalid';
                document.getElementById("li-maj").className = /[A-Z]/.test(password) ? 'valid' : 'invalid';
                document.getElementById("li-nomaj").className = /[a-z]/.test(password) ? 'valid' : 'invalid';
                document.getElementById("li-special").className = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'valid' : 'invalid';

                const allInvalid = document.querySelectorAll('.motDePasseAide .invalid').length 
                for(let e of document.querySelectorAll(".motDePasseAide"))
                {
                    if(allInvalid == 0)
                    {
                        e.classList.add("cacher");
                    }
                    else
                    {
                        e.classList.remove("cacher");
                    }
                }
            });
        </script>
        
    </div>

</body>
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
</html>
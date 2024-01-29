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
</head>
<body id="pageDauthentification">
    <div id="login">
        <h1>Connexion</h1><br>
        <form action="Authentification.php" method="post" id="FormulaireAuthentification">
            <input type="text" class="boiteSaisie" name="adresseMail" placeholder="adresse e-mail" required>
            <br>
            <input type="password" class="boiteSaisie" name="motDePasse" placeholder="mot de passe" required>
            <br>
<?php
    if(isset($_GET['erreur']) && $_GET['erreur'] == 1) {
        echo '<p class="invalid">Adresse e-mail ou mot de passe incorrect.</p>';
    }
?>
            <!--<input type="checkbox" id="myCheckbox" name="seSouvenir"> 
            <label for="myCheckbox">Se souvenir de moi</label> -->
            <button type="submit" class="btnInput boutton" id="btnConnexion">Se connecter</button>
        </form>
        <div id="traitLogin">
            <hr>
            <p class="centered-text">ou</p>
        </div>
        <button class="google-signin-button boutton">
            Se connecter avec Google
        </button>
        <button class="apple-signin-button boutton">
            Se connecter avec Apple id
        </button>
        <button class="discord-signin-button boutton" onclick="window.location.href='https://discord.com/api/oauth2/authorize?client_id=1199990152823578635&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%2FAlgoForge%2Fsrc%2FAuthentificationDiscord.php&scope=identify'">
            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg" alt="Se connecter avec Discord">
            <p>Se connecter avec Discord</p>
        </button>
        
        
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
                <li id="li-taille" class="invalid">- 8 caractères</li>
                <li id="li-chiffre" class="invalid">- 1 chiffre</li>
                <li id="li-maj" class="invalid">- 1 majuscule</li>
                <li id="li-nomaj" class="invalid">- 1 minuscule</li>
                <li id="li-special" class="invalid">- 1 caractère spécial</li>
            </ul>
            <input type="password" id="motDePasseConf" class="boiteSaisie" name="conf-motDePasse" placeholder="confirmer le mot de passe" onfocus="mdpConfSelect()" onblur="mdpConfDeSelect()" required>
            <ul class="cacher motDePasseConfAide">
                <li id="li-mdpconf" class="invalid">- le mot de passe conf ne correspond pas au mot de passe</li>
            </ul>
            <br>
<?php
    if(isset($_GET['erreur']) && $_GET['erreur'] == 2) {
        echo '<p class="invalid">Le compte associé à cette adresse e-mail existe déjà.</p>';
    }
?>
            <input type="submit" class="btnInput boutton" value="Créer le compte">
        </form>
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
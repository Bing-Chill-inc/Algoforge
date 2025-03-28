/**
 * @classdesc Le menu de compte utilisateur qui apparait lorsque l'on clique sur l'icône de compte.
 * @description Crée une instance de MenuCompte.
 * @class MenuCompte
 * @extends {HTMLElement}
 */
class MenuCompte extends HTMLElement {
	// ATTRIBUTS
	_menuDiv;
	_boutonDeconnexion;
	_boutonTheme;
	_menuIcone;
	_selectionTheme;
	_estOuvert = false;
	_user;

	// CONSTRUCTEUR
	constructor() {
		super();

		// Récupérer le user
		this.loadUserInfo();

		this.MenuIcone = document.createElement("div");
		this.MenuIcone.classList.add("img");
		// Utiliser une div pour l'avatar qui contiendra soit l'image soit l'icône SVG
		this.MenuIcone.innerHTML = `<div class="avatar-circle"><svg id="boutonCompte" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg></div>`;
		this.MenuIcone.alt = "Menu compte";
		this.MenuIcone.id = "MenuCompte";
		this.MenuIcone.addEventListener("click", () => {
			if (this._estOuvert) {
				this.fermerMenu();
			} else {
				this.ouvrirMenu();
			}
		});
		this.appendChild(this.MenuIcone);

		document.addEventListener(
			"click",
			(e) => {
				if (this.contains(e.target)) return;
				else if (this._estOuvert) this.fermerMenu();
			},
			true,
		);

		// Écouter les changements de localStorage entre les onglets
		window.addEventListener("storage", (event) => {
			if (event.key === "auth_status") {
				if (event.newValue === "logged_out") {
					this.clearLocalAuth();
					window.location.reload();
				} else if (
					event.newValue === "logged_in" &&
					!this.estSauvegardeDansSessionStorage()
				) {
					window.location.reload();
				}
			}
		});
	}

	/**
	 * @description Ouvre le menu de compte.
	 */
	ouvrirMenu() {
		this._menuDiv = document.createElement("div");
		this._menuDiv.id = "MenuCompteDiv";
		this._menuDiv.classList.add("menu-compte");

		// Vérifier si l'utilisateur est connecté
		const isLoggedIn = this._user !== null;

		// Structure du menu adaptée selon l'état de connexion
		if (isLoggedIn) {
			// Menu pour utilisateur connecté
			this._menuDiv.innerHTML = `
				<div class="menu-header">
					<div class="user-avatar">
						<svg viewBox="0 0 24 24">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
						</svg>
					</div>
					<div class="user-info">
						<p class="greeting">Utilisateur</p>
						<p class="email">utilisateur@exemple.com</p>
					</div>
					<button class="close-button" id="closeMenuBtn">
						<svg viewBox="0 0 24 24">
							<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						</svg>
					</button>
				</div>
				
				<div class="theme-section" id="boutonTheme">
					<!-- Le sélecteur de thème sera ajouté ici -->
					<div class="select-arrow">
						<svg viewBox="0 0 24 24">
							<path d="M7 10l5 5 5-5z" />
						</svg>
					</div>
				</div>
				
				<div class="menu-actions">
					<button class="menu-item" id="boutonModifierCompte">
						<svg viewBox="0 0 24 24">
							<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
						</svg>
						<span>Modifier votre compte</span>
					</button>
					
					<button class="menu-item" id="boutonDeconnexion">
						<svg viewBox="0 0 24 24">
							<path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
						</svg>
						<span>Se déconnecter</span>
					</button>
				</div>
			`;
		} else {
			// Menu pour utilisateur non connecté
			this._menuDiv.innerHTML = `
				<div class="menu-header-simple">
					<button class="close-button" id="closeMenuBtn2">
						<svg viewBox="0 0 24 24">
							<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						</svg>
					</button>
				</div>
				
				<div class="theme-section" id="boutonTheme">
					<!-- Le sélecteur de thème sera ajouté ici -->
					<div class="select-arrow">
						<svg viewBox="0 0 24 24">
							<path d="M7 10l5 5 5-5z" />
						</svg>
					</div>
				</div>
				
				<div class="menu-actions">
					<button class="menu-item" id="boutonConnexion">
						<svg viewBox="0 0 24 24">
							<path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
						</svg>
						<span>Se connecter</span>
					</button>
				</div>
			`;
		}

		// Ajouter la partie commune du menu (indicateurs et effets)
		this._menuDiv.innerHTML += `
			<div class="menu-separator"></div>
			
			<div class="editor-options">
				<div class="indicators-option">
					<select id="indicateursPage" class="indicators-select">
						<option value="disabled">Aucun indicateur</option>
						<option value="a4-portrait">Indicateur A4 Portrait</option>
						<option value="a4-landscape">Indicateur A4 Paysage</option>
						<option value="a3-portrait">Indicateur A3 Portrait</option>
						<option value="a3-landscape">Indicateur A3 Paysage</option>
					</select>
					<div class="select-arrow">
					<svg viewBox="0 0 24 24">
						<path d="M7 10l5 5 5-5z" />
					</svg>
				</div>
				</div>
				
				<div class="effect-option">
					<span>Effet Glow</span>
					<div id="switchGlowContainer" class="switch-container">
						<div id="switchGlowDisplayer" class="switch-displayer"></div>
					</div>
				</div>
				
				<div class="effect-option">
					<span>Effet Dock</span>
					<div id="switchDockContainer" class="switch-container">
						<div id="switchDockDisplayer" class="switch-displayer"></div>
					</div>
				</div>
			</div>
		`;

		this.appendChild(this._menuDiv);

		// Mettre à jour les informations de l'utilisateur si connecté
		if (isLoggedIn) {
			this.updateUserInfo();
		}

		// Récupération des éléments après avoir ajouté le menu au DOM
		const boutonTheme = this._menuDiv.querySelector("#boutonTheme");
		const closeButton = isLoggedIn
			? this._menuDiv.querySelector("#closeMenuBtn")
			: this._menuDiv.querySelector("#closeMenuBtn2");
		const selectIndicateurs =
			this._menuDiv.querySelector("#indicateursPage");

		const switchGlow = this._menuDiv.querySelector(
			".effect-option:nth-child(2)",
		);
		const switchGlowContainer = this._menuDiv.querySelector(
			"#switchGlowContainer",
		);
		const switchGlowDisplayer = this._menuDiv.querySelector(
			"#switchGlowDisplayer",
		);

		const switchDock = this._menuDiv.querySelector(
			".effect-option:nth-child(3)",
		);
		const switchDockContainer = this._menuDiv.querySelector(
			"#switchDockContainer",
		);
		const switchDockDisplayer = this._menuDiv.querySelector(
			"#switchDockDisplayer",
		);

		// Ajout du sélecteur de thème
		this._selectionTheme = document.querySelector("select#theme");
		if (this._selectionTheme) {
			boutonTheme.appendChild(this._selectionTheme);
			this._selectionTheme.style.display = "block";
		}

		// Ajout des event listeners après avoir vérifié que les éléments existent
		if (closeButton) {
			closeButton.addEventListener("click", () => {
				this.fermerMenu();
			});
		}

		if (isLoggedIn) {
			// Éléments spécifiques pour utilisateur connecté
			const boutonModifierCompte = this._menuDiv.querySelector(
				"#boutonModifierCompte",
			);

			if (boutonModifierCompte) {
				boutonModifierCompte.addEventListener("click", () => {
					// Ouvrir le cloud avec le paramètre pour afficher le modal de profil
					const cloudUrl = new URL(window.location.origin);
					cloudUrl.pathname = "/cloud/";
					cloudUrl.hash = "#/?openProfileModal=true";
					window.open(cloudUrl.toString(), "_blank");
					this.fermerMenu();
				});
			}

			// Bouton de déconnexion
			this._boutonDeconnexion =
				this._menuDiv.querySelector("#boutonDeconnexion");
			if (this._boutonDeconnexion) {
				this._boutonDeconnexion.addEventListener("click", () => {
					this.deconnexion();
				});
			}
		} else {
			// Éléments spécifiques pour utilisateur non connecté
			const boutonConnexion =
				this._menuDiv.querySelector("#boutonConnexion");
			if (boutonConnexion) {
				boutonConnexion.addEventListener("click", () => {
					// Rediriger vers la page de connexion
					const cloudUrl = new URL(window.location.origin);
					cloudUrl.pathname = "/cloud/";
					window.open(cloudUrl.toString(), "_blank");
					this.fermerMenu();
				});
			}
		}

		// Gestion des indicateurs de page
		if (selectIndicateurs) {
			selectIndicateurs.addEventListener("change", () => {
				document.documentElement.setAttribute(
					"data-page-size",
					selectIndicateurs.value,
				);
			});

			selectIndicateurs.value =
				document.documentElement.getAttribute("data-page-size") ||
				"disabled";
		}

		// Le reste du code reste inchangé...
		if (preferences.glow) {
			switchGlowContainer.style.backgroundColor = "var(--titleColor)";
			switchGlowDisplayer.style.left = "auto";
			switchGlowDisplayer.style.right = "2px";
		} else {
			switchGlowContainer.style.backgroundColor =
				"var(--fgColorSemiTransparent)";
			switchGlowDisplayer.style.left = "2px";
			switchGlowDisplayer.style.right = "auto";
		}

		switchGlow.addEventListener("click", () => {
			if (preferences.glow) {
				preferences.glow = false;
				editeur.setCookie("glow", "false", 365);
				switchGlowContainer.style.backgroundColor =
					"var(--fgColorSemiTransparent)";
				switchGlowDisplayer.style.left = "2px";
				switchGlowDisplayer.style.right = "auto";
			} else {
				preferences.glow = true;
				editeur.setCookie("glow", "true", 365);
				switchGlowContainer.style.backgroundColor = "var(--titleColor)";
				switchGlowDisplayer.style.left = "auto";
				switchGlowDisplayer.style.right = "2px";
			}
		});

		// Gestion de l'effet Dock
		if (preferences.dockEffect) {
			switchDockContainer.style.backgroundColor = "var(--titleColor)";
			switchDockDisplayer.style.left = "auto";
			switchDockDisplayer.style.right = "2px";
		} else {
			switchDockContainer.style.backgroundColor =
				"var(--fgColorSemiTransparent)";
			switchDockDisplayer.style.left = "2px";
			switchDockDisplayer.style.right = "auto";
		}

		switchDock.addEventListener("click", () => {
			if (preferences.dockEffect) {
				preferences.dockEffect = false;
				editeur.setCookie("dockEffect", "false", 365);
				switchDockContainer.style.backgroundColor =
					"var(--fgColorSemiTransparent)";
				switchDockDisplayer.style.left = "2px";
				switchDockDisplayer.style.right = "auto";
			} else {
				preferences.dockEffect = true;
				editeur.setCookie("dockEffect", "true", 365);
				switchDockContainer.style.backgroundColor = "var(--titleColor)";
				switchDockDisplayer.style.left = "auto";
				switchDockDisplayer.style.right = "2px";
			}
		});

		this._estOuvert = true;
		this._init = true;
		const boutonCompte = document.getElementById("boutonCompte");
		if (boutonCompte) {
			boutonCompte.classList.add("elementIsOpen");
		}
	}

	/**
	 * @description Ferme le menu de compte.
	 */
	fermerMenu() {
		this._selectionTheme = document.querySelector("select#theme");
		if (this._selectionTheme) {
			this.appendChild(this._selectionTheme);
			this._selectionTheme.style.display = "none";
		}

		if (this._menuDiv) {
			this.removeChild(this._menuDiv);
		}
		this._estOuvert = false;
		const boutonCompte = document.getElementById("boutonCompte");
		if (boutonCompte) {
			boutonCompte.classList.remove("elementIsOpen");
		}
	}

	/**
	 * @description Nettoie les cookies et le sessionStorage.
	 */
	clearLocalAuth() {
		document.cookie = "authToken=; path=/; max-age=0";
		document.cookie = "userId=; path=/; max-age=0";
		sessionStorage.removeItem("authToken");
		sessionStorage.removeItem("userId");
	}

	/**
	 * @description Déconnecte l'utilisateur.
	 */
	deconnexion() {
		// Signaler aux autres onglets que l'utilisateur s'est déconnecté
		localStorage.setItem("auth_status", "logged_out");

		this.clearLocalAuth();

		window.location.reload();
	}

	/**
	 * @description Charge les informations de l'utilisateur depuis les cookies ou sessionStorage
	 */
	loadUserInfo() {
		// Vérifier sessionStorage
		const sessionToken = sessionStorage.getItem("authToken");
		const sessionUserId = sessionStorage.getItem("userId");

		let token = null;
		let userId = null;

		if (sessionToken && sessionUserId) {
			token = sessionToken;
			userId = sessionUserId;
		} else {
			// Vérifier les cookies
			const cookies = document.cookie ? document.cookie.split("; ") : [];
			const tokenCookie = cookies.find((row) =>
				row.startsWith("authToken="),
			);
			const userIdCookie = cookies.find((row) =>
				row.startsWith("userId="),
			);

			token = tokenCookie ? tokenCookie.split("=")[1] : null;
			userId = userIdCookie ? userIdCookie.split("=")[1] : null;
		}

		if (token && userId) {
			try {
				fetch(`/api/users/${userId}`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
					.then((response) => {
						if (!response.ok)
							throw new Error("Utilisateur non trouvé");
						return response.json();
					})
					.then((responseData) => {
						// Stocker l'utilisateur
						this._user = responseData.data || responseData;

						this.updateUserInfo();

						// Prolonger la durée des cookies
						this.extendCookieExpiration();
					})
					.catch((error) => {
						console.log("Erreur d'authentification:");
						this.deconnexion();
					});
			} catch (error) {
				console.log(
					"Erreur lors du chargement des informations de l'utilisateur:",
				);
			}
		} else {
			this._user = null;
		}
	}

	/**
	 * @description Met à jour les informations de l'utilisateur dans le menu
	 */
	updateUserInfo() {
		if (!this._user) return;

		// Mettre à jour l'avatar du bouton si l'utilisateur a une image de profil
		if (this._user.urlPfp) {
			const avatarCircle = this.querySelector(".avatar-circle");
			if (avatarCircle) {
				avatarCircle.innerHTML = `<img src="${this._user.urlPfp}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">`;
			}
		}

		// Si le menu n'est pas ouvert, pas besoin de mettre à jour le reste
		if (!this._menuDiv) return;

		const greetingElement = this._menuDiv.querySelector(
			".user-info .greeting",
		);
		const emailElement = this._menuDiv.querySelector(".user-info .email");

		// Mettre à jour l'avatar dans le menu si l'utilisateur a une image de profil
		const userAvatar = this._menuDiv.querySelector(".user-avatar");
		if (userAvatar && this._user.urlPfp) {
			userAvatar.innerHTML = `<img src="${this._user.urlPfp}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">`;
		}

		if (greetingElement && this._user.pseudo) {
			greetingElement.textContent = this._user.pseudo;
		}

		if (emailElement && this._user.adresseMail) {
			emailElement.textContent = this._user.adresseMail;
		}
	}

	/**
	 * @description Les données sont-elles sauvegardées dans le sessionStorage ou dans les cookies
	 */

	estSauvegardeDansSessionStorage() {
		return sessionStorage.getItem("authToken") !== null;
	}

	/**
	 * @description Vérifie si l'option "Se souvenir de moi" est active (cookies utilisés plutôt que sessionStorage)
	 * @returns {boolean} true si les données d'authentification sont stockées dans les cookies
	 */
	isRememberMeChecked() {
		const cookies = document.cookie ? document.cookie.split("; ") : [];
		const tokenCookie = cookies.find((row) => row.startsWith("authToken="));

		return tokenCookie !== undefined;
	}

	/**
	 * @description Prolonge la durée des cookies de 48 heures
	 * @returns {boolean} true si les cookies ont été prolongés, false sinon
	 */
	extendCookieExpiration() {
		const sessionData = this.getSessionData();

		if (sessionData && this.isRememberMeChecked()) {
			const extensionTime = 48 * 60 * 60;

			const { token, userId } = sessionData;

			document.cookie = `authToken=${token}; path=/; max-age=${extensionTime}; Secure; SameSite=Strict`;
			document.cookie = `userId=${userId}; path=/; max-age=${extensionTime}; Secure; SameSite=Strict`;

			return true;
		}

		return false;
	}

	/**
	 * @description Récupère les données de session (token et userId)
	 * @returns {Object|null} Les données de session ou null si aucune donnée trouvée
	 */
	getSessionData() {
		// Vérifier sessionStorage
		const sessionToken = sessionStorage.getItem("authToken");
		const sessionUserId = sessionStorage.getItem("userId");

		if (sessionToken && sessionUserId) {
			return { token: sessionToken, userId: sessionUserId };
		}

		// Vérifier les cookies
		const cookies = document.cookie ? document.cookie.split("; ") : [];
		const tokenCookie = cookies.find((row) => row.startsWith("authToken="));
		const userIdCookie = cookies.find((row) => row.startsWith("userId="));

		const token = tokenCookie ? tokenCookie.split("=")[1] : null;
		const userId = userIdCookie ? userIdCookie.split("=")[1] : null;

		if (token && userId) {
			return { token, userId };
		}

		return null;
	}
}

window.customElements.define("menu-compte-element", MenuCompte);

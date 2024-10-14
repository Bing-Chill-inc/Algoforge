import type RouteHandler from "./types/RouteHandler";

const AssetsDynamiques: RouteHandler[] = [];

// #region AlgoForge.svg
AssetsDynamiques.push({
	route: "/AlgoForge.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 791.26 809.17">
    <defs>
        <style>
            .cls-1,
            .cls-2,
            .cls-3 {
                fill: #${fgColor};
            }

            .cls-1 {
                stroke: #${fgColor};
                stroke-miterlimit: 10;
            }

            .cls-3 {
                font-size: 107.48px;
                font-family: HagridTextTrial-Extrabold, Hagrid Text Trial;
                font-weight: 800;
                letter-spacing: -0.01em;
            }

            .cls-4 {
                letter-spacing: 0em;
            }
        </style>
    </defs>
    <g id="Marteau">
        <path class="cls-1"
            d="M714.4,348.46,509.1,302.78a3.64,3.64,0,0,1-2.74-4.42L513.83,268a3.65,3.65,0,0,1,4.33-2.68l204.57,45.79A19.12,19.12,0,0,1,737,334.94h0A19.12,19.12,0,0,1,714.4,348.46Z"
            transform="translate(-29.61 -16.42)" />
        <path class="cls-1"
            d="M486.42,306.85l11.86,2.94a.47.47,0,0,0,.58-.36l10.79-54.65a.47.47,0,0,0-.4-.56l-11-1.45a.47.47,0,0,0-.52.37l-11.7,53.15A.48.48,0,0,0,486.42,306.85Z"
            transform="translate(-29.61 -16.42)" />
        <polyline class="cls-1"
            points="451.99 286.42 428.97 322.96 386.34 312.95 379.57 246.01 415.44 189.08 458.06 199.1 461.97 237.78" />
        <line class="cls-2" x1="516.82" y1="223.85" x2="587.73" y2="202.81" />
        <path class="cls-2"
            d="M544.29,233.09,616,214.64a4.79,4.79,0,0,1,2.73,9.18l-70.14,23.65a7.51,7.51,0,1,1-4.27-14.38Z"
            transform="translate(-29.61 -16.42)" />
        <line class="cls-2" x1="493.89" y1="178.31" x2="603.38" y2="66.51" />
        <path class="cls-2"
            d="M518.14,189.48,630,80a4.14,4.14,0,0,1,5.92,5.79L528.86,200c-7.22,7.09-17.69-3-10.72-10.5Z"
            transform="translate(-29.61 -16.42)" />
        <line class="cls-2" x1="448.53" y1="155.07" x2="468.25" y2="85.85" />
        <path class="cls-2"
            d="M470.93,169.43l22.87-68.31a4.23,4.23,0,0,1,8.12,2.31l-16.57,70.11a7.51,7.51,0,1,1-14.42-4.11Z"
            transform="translate(-29.61 -16.42)" />
        <line class="cls-2" x1="398.74" y1="151.52" x2="357.53" y2="4.27" />
        <path class="cls-2"
            d="M421.12,170,382.94,21.87a4.36,4.36,0,0,1,8.39-2.35l44.24,146.41c2.53,9.79-11.48,13.79-14.45,4Z"
            transform="translate(-29.61 -16.42)" />
        <line class="cls-2" x1="360.53" y1="185.08" x2="306.65" y2="131.56" />
        <path class="cls-2"
            d="M384.85,206.83l-51.24-56.17a3.77,3.77,0,0,1,5.3-5.34l56.51,50.87a7.51,7.51,0,1,1-10.57,10.64Z"
            transform="translate(-29.61 -16.42)" />
        <line class="cls-2" x1="333.59" y1="227.93" x2="180.21" y2="185.89" />
        <path class="cls-2" d="M361.21,251.58,209,205.24a3,3,0,0,1,1.61-5.85l154.56,37.73c9.79,2.83,6,17-4,14.46Z"
            transform="translate(-29.61 -16.42)" />
        <line class="cls-2" x1="333.59" y1="274.56" x2="268.25" y2="292.87" />
        <path class="cls-2"
            d="M365.22,298.21l-26.32,5.6-40.19,8.55a3.19,3.19,0,0,1-1.72-6.13l64.18-22.46a7.51,7.51,0,1,1,4.05,14.44Z"
            transform="translate(-29.61 -16.42)" />
    </g>
    <g id="AlgoForge">
        <path class="cls-2"
            d="M97.71,461.12q-1.83-9-2.48-12.14c-.18-1.09-.41-2.3-.72-3.62s-.63-2.79-1-4.43H67l-4.44,20.19H29.61l6.53-29.19Q49,375.32,52.61,357.05H108q6,28.92,23.27,104.07ZM90,424q-7.57-36.42-9-55.92h-1.7q-2.22,22-8.89,55.92Z"
            transform="translate(-29.61 -16.42)" />
        <path class="cls-2"
            d="M137.58,409.15q0-23-.65-52.1h32.94q-.52,23.06-.52,48,0,15.13.26,30.14,15.94,0,37.65-.27L205,461.12H136.93Q137.59,432.07,137.58,409.15Z"
            transform="translate(-29.61 -16.42)" />
        <path class="cls-2"
            d="M215.17,449.18Q205.3,435.34,205.3,409q0-27.94,11-40.85T252,355.28q17.52,0,27.39,4.57a27.92,27.92,0,0,1,14.25,14.45q4.36,9.9,5.16,26.8l-32.16,3.41q-.53-11.86-4.12-18.48a11.87,11.87,0,0,0-11.17-6.61,33.74,33.74,0,0,0-10.85,1.63A97.2,97.2,0,0,0,238,393.4a112.63,112.63,0,0,0-.78,14.39q0,13.5,4.31,22.5t12.55,9a37.89,37.89,0,0,0,10.07-1.36,23.67,23.67,0,0,0,5.49-3.55,12,12,0,0,1,2.22-1.77q0-4.91-2.22-7.71c-1.49-1.86-3.75-2.79-6.8-2.79h-8v-6.82h47.58V427.7q0,19.1.13,33.42H271.19l.65-23.19h-2q-1.44,12.69-7.91,18.89T244.65,463Q225,463,215.17,449.18Z"
            transform="translate(-29.61 -16.42)" />
        <path class="cls-2"
            d="M327.66,457.37a33.91,33.91,0,0,1-15.36-17.53Q307.4,428,307.4,409q0-28.1,11.17-40.91t35.63-12.82q16.86,0,27.38,5.72a34.71,34.71,0,0,1,15.56,17.67q5,11.93,5,30.89,0,27.69-11.5,40.58T355.11,463Q338.11,463,327.66,457.37Zm38.69-19.44a109,109,0,0,0,3.4-27.55q0-13.5-4-22.23t-12.36-8.73a37,37,0,0,0-11.11,1.63,111,111,0,0,0-2.16,12.21,127,127,0,0,0-.72,14.66q0,13.5,4.19,22.44t12.55,8.93A31.61,31.61,0,0,0,366.35,437.93Z"
            transform="translate(-29.61 -16.42)" />
        <path class="cls-2"
            d="M807.89,439.73h13V427.91c0-2,0-14.41,0-15.33,0-1.17-3.41-.64-4.64-.09.12,3.36-.68,4.09-2.2,6-1.35,1.7-2.83,1.25-4.89,1.25H781.23V404.4l36.36.9v-7.14H755.18c0,7.24-.06,14.45-.16,21.45q-.16,11.5-.49,20.12H803c1.46,0,4.78.68,5.81-.56,1.52-1.8,3.5-4.48,4-6.89a19.09,19.09,0,0,1,.64,3.48,30.85,30.85,0,0,1,0,4.08"
            transform="translate(-29.61 -16.42)" />
        <path class="cls-2"
            d="M816.21,383.84c.12-3.36-.68-4.09-2.2-6-1.35-1.69-2.83-1.24-4.89-1.24H781.23v15.32l36.36-.9v7.13H755.18c0-7.23-.06-14.44-.16-21.44q-.16-11.5-.49-20.12h66.32v11.82c0,2,0,14.41,0,15.33C820.81,384.92,817.44,384.39,816.21,383.84Z"
            transform="translate(-29.61 -16.42)" /><text class="cls-3"
            transform="translate(397.96 423.58) scale(0.98 1)">F<tspan class="cls-4" x="72.44" y="0">ORG</tspan></text>
    </g>
    <g id="Anvil">
        <path class="cls-2"
            d="M542.72,554.62H649.05c38.29-25,93.65-50.76,171.74-76.25V445H401.2v20.5L29.61,462.57S36.92,602.36,337.73,609c0,0,106.86,66.6-82.7,162.48l-.73,54.16h97.34s101-67.34,207.86,0h97.34V770S509.16,688.87,606,589.25H576c-6.44,0-6.43-10,0-10h40.48c5.45-4.84,11.48-9.72,18.16-14.63H542.72C536.27,564.62,536.28,554.62,542.72,554.62Z"
            transform="translate(-29.61 -16.42)" />
    </g>
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/bibliocustom.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";
		const nom = req.query.nom || "Nom";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570.86 362">
  <defs>
    <style>
      .cls-1 {
        fill: none;
        stroke: #${fgColor};
        stroke-miterlimit: 10;
        stroke-width: 20px;
      }

      .cls-2 {
        font-size: 42px;
        fill: #${fgColor};
        font-family: MyriadPro-Regular, Myriad Pro;
      }

      .cls-3 {
        letter-spacing: 0.01em;
      }

      .cls-4 {
        letter-spacing: -0.02em;
      }
    </style>
  </defs>
  <rect class="cls-1" x="29.43" y="10" width="505.42" height="225" rx="12" />
  <rect class="cls-1" x="228.84" y="235" width="109.42" height="117" rx="12" />
  <line class="cls-1" x1="0.02" y1="352" x2="570.84" y2="351" />
  <text class="cls-2" transform="translate(160.4 138.41)">
    ${nom}
  </text>
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/BibliothequeAlgo.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.1 514">
    <defs>
        <style>.cls-1{fill:#${fgColor};}</style>
    </defs>
    <rect class="cls-1" width="554.1" height="49.99" rx="25"/>
    <rect class="cls-1" x="45" y="232" width="461" height="49.99"/>
    <rect class="cls-1" x="72" y="127.33" width="54" height="98.43" rx="18.41"/>
    <rect class="cls-1" x="216" y="78.12" width="54" height="147.64" rx="18.41"/>
    <rect class="cls-1" x="144" y="57.02" width="54" height="168.73" rx="18.41"/>
    <rect class="cls-1" x="288" y="57.02" width="54" height="168.73" rx="18.41"/>
    <rect class="cls-1" x="432" y="78.12" width="54" height="147.64" rx="18.41"/>
    <rect class="cls-1" x="360" y="57.02" width="54" height="168.73" rx="18.41"/>
    <rect class="cls-1" y="464.01" width="554.1" height="49.99" rx="25"/>
    <rect class="cls-1" x="72" y="307" width="54" height="150.76" rx="18.41"/>
    <rect class="cls-1" x="216" y="310.12" width="54" height="147.64" rx="18.41"/>
    <rect class="cls-1" x="144" y="352" width="54" height="105.76" rx="18.41"/>
    <rect class="cls-1" x="288" y="316" width="54" height="141.76" rx="18.41"/>
    <rect class="cls-1" x="432" y="310.12" width="54" height="147.64" rx="18.41"/>
    <rect class="cls-1" x="360" y="334" width="54" height="123.76" rx="18.41"/>
    <rect class="cls-1" x="7.72" y="33.52" width="49.99" height="513" rx="25" transform="translate(57.72 547.52) rotate(180)"/>
    <rect class="cls-1" x="511.72" y="33.52" width="49.99" height="513" rx="25" transform="translate(1065.72 547.52) rotate(180)"/>
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/boucle.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";
		const bgColor = req.query.bgColor || "ffffff";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.51 386.63">
    <defs>
        <style>
            .cls-1 {
                fill: #ffffff00;
                stroke: #${fgColor};
                stroke-miterlimit: 10;
                stroke-width: 10px;
            }
            .cls-2 {
                fill: #${bgColor};
                stroke: #${fgColor};
                stroke-miterlimit: 10;
                stroke-width: 10px;
            }
        </style>
    </defs>
    <circle class="cls-1 " cx="193.31" cy="193.31" r="190.81"/>
    <polygon class="cls-2" points="377.88 154.61 334.58 229.61 421.18 229.61 377.88 154.61"/>
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/conditionSortie.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 320.28 319.89" style="enable-background:new 0 0 320.28 319.89;" xml:space="preserve">
<style type="text/css">
	.st0{fill:none;stroke:#${fgColor};stroke-width:15;stroke-miterlimit:10;}
	.st1{fill:none;stroke:#${fgColor};stroke-width:15;stroke-linecap:round;stroke-miterlimit:10;}
</style>
<path class="st0" d="M294.62,312.59H25.4c-9.88,0-17.89-8.01-17.89-17.89V25.48c0-9.88,8.01-17.89,17.89-17.89h269.22
	c9.88,0,17.89,8.01,17.89,17.89V294.7C312.51,304.58,304.5,312.59,294.62,312.59z"/>
<line class="st1" x1="106.57" y1="204.62" x2="106.57" y2="7.62"/>
<line class="st1" x1="212.57" y1="7.62" x2="212.57" y2="204.62"/>
<path class="st1" d="M58.95,197.57"/>
<path class="st1" d="M58.95,197.57c-4.7,0-6.49,6.14-2.53,8.66l101.49,64.73c1.54,0.98,3.51,0.98,5.05,0l101.49-64.73
	c3.96-2.53,2.17-8.66-2.53-8.66"/>
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/DictionnaireDonnees.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401 575.43">
		<defs>
			<style>
				.cls-1 {
					fill: none;
					stroke: #${fgColor};
					stroke-miterlimit: 10;
					stroke-width: 20px;
				}
				.cls-2 {
					isolation: isolate;
					font-size: 409.84px;
					fill: #${fgColor};
					font-family: SnellRoundhand-Bold, Snell Roundhand;
					font-weight: 700;
				}
			</style>
		</defs>
		<path class="cls-1" d="M352,75.3V525.9H248v.1H49v13.3a29,29,0,0,0,29,29H391V75.3Z" transform="translate(0 -2.87)"/>
		<path class="cls-1" d="M39,525.2a29,29,0,0,1-29-29V61.2a29,29,0,0,1,29-29H352v493H39" transform="translate(0 -2.87)"/>
		<text class="cls-2" transform="translate(70.75 352.87) scale(0.92 1)">x</text>
	</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/erreurs.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 558.48 558.48">
    <defs>
        <style>
            .cls-1 {
                fill: none;
                stroke: #${fgColor};
                stroke-miterlimit: 10;
                stroke-width: 25px;
            }
        </style>
    </defs>
    <path class="cls-1"
        d="M387.25,16.81H177.36a13.37,13.37,0,0,0-9.46,3.92L19.49,169.14a13.39,13.39,0,0,0-3.92,9.46V388.49A13.4,13.4,0,0,0,19.49,398L167.9,546.37a13.37,13.37,0,0,0,9.46,3.92H387.25a13.37,13.37,0,0,0,9.46-3.92L545.13,398a13.4,13.4,0,0,0,3.92-9.47V178.6a13.39,13.39,0,0,0-3.92-9.46L396.71,20.73A13.37,13.37,0,0,0,387.25,16.81Z"
        transform="translate(-3.07 -4.31)" />
    <path class="cls-1"
        d="M315.94,366.52h-66.3a12.87,12.87,0,0,1-12.82-11.77l-24-280a12.87,12.87,0,0,1,12.82-14H338.12A12.87,12.87,0,0,1,351,74.67l-22.18,280A12.87,12.87,0,0,1,315.94,366.52Z"
        transform="translate(-3.07 -4.31)" />
    <rect class="cls-1" x="239.26" y="398.21" width="81" height="72" rx="15.3" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/conditionSortie.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	y="0px" viewBox="0 0 320.28 319.89" style="enable-background:new 0 0 320.28 319.89;" xml:space="preserve">
	<style type="text/css">
		.st0 {
			fill: none;
			stroke: #${fgColor};
			stroke-width: 25px;
			stroke-miterlimit: 10;
		}

		.st1 {
			fill: none;
			stroke: #${fgColor};
			stroke-width: 25px;
			stroke-linecap: round;
			stroke-miterlimit: 10;
		}
	</style>
	<path class="st0" d="M294.62,312.59H25.4c-9.88,0-17.89-8.01-17.89-17.89V25.48c0-9.88,8.01-17.89,17.89-17.89h269.22
	c9.88,0,17.89,8.01,17.89,17.89V294.7C312.51,304.58,304.5,312.59,294.62,312.59z" />
	<line class="st1" x1="106.57" y1="204.62" x2="106.57" y2="7.62" />
	<line class="st1" x1="212.57" y1="7.62" x2="212.57" y2="204.62" />
	<path class="st1" d="M58.95,197.57" />
	<path class="st1" d="M58.95,197.57c-4.7,0-6.49,6.14-2.53,8.66l101.49,64.73c1.54,0.98,3.51,0.98,5.05,0l101.49-64.73
	c3.96-2.53,2.17-8.66-2.53-8.66" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/lien.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451 477">
    <defs>
        <style>
            .cls-1 {
                fill: none;
                stroke: #${fgColor};
                stroke-linecap: round;
                stroke-miterlimit: 10;
                stroke-width: 20px;
            }
        </style>
    </defs>
    <line class="cls-1" x1="441" y1="10" x2="10" y2="467" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/pointeur.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308.62 477.67">
    <defs>
        <style>
            .cls-1 {
                fill: #${fgColor};
                stroke-width: 10px;
            }
        </style>
    </defs>
    <polygon class="cls-1" points="0 0 0 337.41 292.2 168.7 0 0" />
    <rect class="cls-1" x="254.5" y="267.2" width="87" height="239" transform="translate(-240.23 166.54) rotate(-30)" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/probleme.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 571.17 328.32">
    <defs>
        <style>
            .cls-1 {
                fill: none;
                stroke: #${fgColor};
                stroke-miterlimit: 10;
                stroke-width: 25px;
            }
        </style>
    </defs>
    <rect class="cls-1" x="5" y="5" width="561.17" height="318.32" rx="22.77" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/procedure.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 571.17 328.77">
    <defs>
        <style>
            .cls-1 {
                fill: none;
                stroke: #${fgColor};
                stroke-miterlimit: 10;
                stroke-width: 25px;
            }
        </style>
    </defs>
    <rect class="cls-1" x="5" y="5" width="561.17" height="318.32" rx="22.77" />
    <rect class="cls-1" x="50.12" y="5.45" width="471.04" height="318.32" rx="14.65" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/redo.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.44 548.57">
    <defs>
        <style>
            .cls-1 {
                fill: none;
                stroke-width: 46px;
            }

            .cls-1,
            .cls-2 {
                stroke: #${fgColor};
                stroke-linecap: round;
                stroke-miterlimit: 10;
            }

            .cls-2 {
                fill: #${fgColor};
                stroke-width: 20px;
            }
        </style>
    </defs>
    <path class="cls-1"
        d="M318.44,103.52H103.83c-37.32,0-67.57,26.19-67.57,58.51v320.3c0,32.32,30.25,58.51,67.57,58.51H473.7"
        transform="translate(-13.26 -15.27)" />
    <polygon class="cls-2" points="409.77 89.94 278.44 162.89 278.44 16.99 409.77 89.94" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/structureIterative.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";
		const bgColor = req.query.bgColor || "ffffff";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.51 386.63">
    <defs>
        <style>
            .cls-1 {
                fill: #ffffff00;
                stroke: #${fgColor};
                stroke-miterlimit: 10;
                stroke-width: 25px;
            }

            .cls-2 {
                fill: #${bgColor};
                stroke: #${fgColor};
                stroke-miterlimit: 10;
                stroke-width: 25px;
            }
        </style>
    </defs>
    <circle class="cls-1 " cx="193.31" cy="193.31" r="190.81" />
    <polygon class="cls-2" points="377.88 154.61 334.58 229.61 421.18 229.61 377.88 154.61" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/structureIterativeBornee.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";
		const bgColor = req.query.bgColor || "ffffff";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 336.27">
  <defs>
    <style>
      .cls-1,
      .cls-2 {
        stroke: #${fgColor};
        stroke-miterlimit: 10;
        stroke-width: 25px;
        fill: #${bgColor};
      }

      .cls-3 {
        fill: #${fgColor};
      }

      .cls-3 {
        font-size: 191px;
        font-family: MyriadPro-Regular, Myriad Pro;
      }
    </style>
  </defs>
  <circle class="cls-1" cx="168.14" cy="168.14" r="155.64" />
  <polygon class="cls-2" points="318.68 136.57 283.36 197.74 354 197.74 318.68 136.57" />
  <text class="cls-3" transform="translate(356 255.52)">?</text>
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/structureSi.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 573.46 218.12">
    <defs>
        <style>
            .cls-1 {
                fill: none;
            }

            .cls-1,
            .cls-2 {
                stroke: #${fgColor};
                stroke-miterlimit: 10;
                stroke-width: 25px;
            }

            .cls-2 {
                fill: none;
            }
        </style>
    </defs>
    <path class="cls-1"
        d="M502.2,203.42l-436.7-2a8.11,8.11,0,0,0-7,4l-55.27,95a8.06,8.06,0,0,0,0,8.14l55.3,95a8.08,8.08,0,0,0,7,4l436.69,2a8.11,8.11,0,0,0,7-4l55.28-95a8.11,8.11,0,0,0,0-8.14l-55.31-95A8.06,8.06,0,0,0,502.2,203.42Z"
        transform="translate(2.9 -196.46)" />
    <line class="cls-2" x1="297.73" y1="10.05" x2="297.73" y2="208.05" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/structureSwitch.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 573.46 218.12">
    <defs>
        <style>
            .cls-1 {
                fill: none;
            }

            .cls-1,
            .cls-2 {
                stroke: #${fgColor};
                stroke-miterlimit: 10;
                stroke-width: 25px;
            }

            .cls-2 {
                fill: none;
            }
        </style>
    </defs>
    <path class="cls-1"
        d="M502.2,203.42l-436.7-2a8.11,8.11,0,0,0-7,4l-55.27,95a8.06,8.06,0,0,0,0,8.14l55.3,95a8.08,8.08,0,0,0,7,4l436.69,2a8.11,8.11,0,0,0,7-4l55.28-95a8.11,8.11,0,0,0,0-8.14l-55.31-95A8.06,8.06,0,0,0,502.2,203.42Z"
        transform="translate(2.9 -196.46)" />
    <line class="cls-2" x1="297.73" y1="114.63" x2="297.73" y2="208.05" />
    <line class="cls-2" x1="567.36" y1="110.51" x2="5.67" y2="110.51" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

AssetsDynamiques.push({
	route: "/mini/undo.svg",
	callback: (req, res) => {
		const fgColor = req.query.fgColor || "000000";

		const svgContent = `
	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.44 548.57">
    <defs>
        <style>
            .cls-1 {
                fill: none;
                stroke-width: 46px;
            }

            .cls-1,
            .cls-2 {
                stroke: #${fgColor};
                stroke-linecap: round;
                stroke-miterlimit: 10;
            }

            .cls-2 {
                fill: #${fgColor};
                stroke-width: 20px;
            }
        </style>
    </defs>
    <path class="cls-1"
        d="M255.83,101.77H470.44c37.31,0,67.56,26.2,67.56,58.51V480.59c0,32.31-30.25,58.5-67.56,58.5H100.56"
        transform="translate(-77.56 -13.53)" />
    <polygon class="cls-2" points="73.66 89.94 205 162.89 205 16.99 73.66 89.94" />
</svg>
	`;

		res.setHeader("Content-Type", "image/svg+xml");
		res.send(svgContent);
	},
});

export default AssetsDynamiques;

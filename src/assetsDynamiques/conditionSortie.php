<?php
header('Content-Type: image/svg+xml');

echo '<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 24.3.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 320.28 319.89" style="enable-background:new 0 0 320.28 319.89;" xml:space="preserve">
<style type="text/css">
	.st0{fill:none;stroke:#' . $_GET['fgColor'] . ';stroke-width:10;stroke-miterlimit:10;}
	.st1{fill:none;stroke:#' . $_GET['fgColor'] . ';stroke-width:10;stroke-linecap:round;stroke-miterlimit:10;}
</style>
<path class="st0" d="M294.62,312.59H25.4c-9.88,0-17.89-8.01-17.89-17.89V25.48c0-9.88,8.01-17.89,17.89-17.89h269.22
	c9.88,0,17.89,8.01,17.89,17.89V294.7C312.51,304.58,304.5,312.59,294.62,312.59z"/>
<line class="st1" x1="106.57" y1="204.62" x2="106.57" y2="7.62"/>
<line class="st1" x1="212.57" y1="7.62" x2="212.57" y2="204.62"/>
<path class="st1" d="M58.95,197.57"/>
<path class="st1" d="M58.95,197.57c-4.7,0-6.49,6.14-2.53,8.66l101.49,64.73c1.54,0.98,3.51,0.98,5.05,0l101.49-64.73
	c3.96-2.53,2.17-8.66-2.53-8.66"/>
</svg>';

?>
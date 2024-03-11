<?php
header('Content-Type: image/svg+xml');
?>
<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.51 386.63">
    <defs>
        <style>
            .cls-1 {
                fill: #ffffff00;
                stroke: #<?php echo $_GET['fgColor'] ?>;
                stroke-miterlimit: 10;
                stroke-width: 25px;
            }

            .cls-2 {
                fill: #<?php echo $_GET['bgColor'] ?>;
                stroke: #<?php echo $_GET['fgColor'] ?>;
                stroke-miterlimit: 10;
                stroke-width: 25px;
            }
        </style>
    </defs>
    <circle class="cls-1 " cx="193.31" cy="193.31" r="190.81" />
    <polygon class="cls-2" points="377.88 154.61 334.58 229.61 421.18 229.61 377.88 154.61" />
</svg>
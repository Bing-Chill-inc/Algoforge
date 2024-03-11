<?php
header('Content-Type: image/svg+xml');
?>
<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.44 548.57">
    <defs>
        <style>
            .cls-1 {
                fill: none;
                stroke-width: 46px;
            }

            .cls-1,
            .cls-2 {
                stroke: #<?php echo $_GET['fgColor'] ?>;
                stroke-linecap: round;
                stroke-miterlimit: 10;
            }

            .cls-2 {
                fill: #<?php echo $_GET['fgColor'] ?>;
                stroke-width: 20px;
            }
        </style>
    </defs>
    <path class="cls-1"
        d="M255.83,101.77H470.44c37.31,0,67.56,26.2,67.56,58.51V480.59c0,32.31-30.25,58.5-67.56,58.5H100.56"
        transform="translate(-77.56 -13.53)" />
    <polygon class="cls-2" points="73.66 89.94 205 162.89 205 16.99 73.66 89.94" />
</svg>
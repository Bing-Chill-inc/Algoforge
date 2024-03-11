<?php
header('Content-Type: image/svg+xml');
?>
<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570.86 362">
  <defs>
    <style>
      .cls-1 {
        fill: none;
        stroke: #<?php echo $_GET['fgColor'] ?>;
        stroke-miterlimit: 10;
        stroke-width: 20px;
      }

      .cls-2 {
        font-size: 42px;
        fill: #<?php echo $_GET['fgColor'] ?>;
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
    <?php echo $_GET['nom'] ?>
  </text>
</svg>
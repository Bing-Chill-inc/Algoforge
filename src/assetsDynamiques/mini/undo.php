<?php
header('Content-Type: image/svg+xml');
?>
<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path fill="#<?php echo htmlspecialchars($_GET['fgColor'], ENT_QUOTES, 'UTF-8'); ?>" d="M7.7,15.007a1.5,1.5,0,0,1-2.121,0L.858,10.282a2.932,2.932,0,0,1,0-4.145L5.583,1.412A1.5,1.5,0,0,1,7.7,3.533L4.467,6.7l14.213,0A5.325,5.325,0,0,1,24,12.019V18.7a5.323,5.323,0,0,1-5.318,5.318H5.318a1.5,1.5,0,1,1,0-3H18.681A2.321,2.321,0,0,0,21,18.7V12.019A2.321,2.321,0,0,0,18.68,9.7L4.522,9.7,7.7,12.886A1.5,1.5,0,0,1,7.7,15.007Z"/></svg>
<?php
// Set le header à application/json
header('Content-Type: application/json');

function lireContenuFichier($chemin)
{
    return file_exists($chemin) ? file_get_contents($chemin) : null;
}

function explorerDossier($dossier)
{
    $resultat = [];

    // Obtenir la liste des sous-dossiers
    $sousDossiers = array_filter(glob($dossier . '/*'), 'is_dir');

    foreach ($sousDossiers as $sousDossier) {
        // Initialiser la structure pour ce dossier
        $structureDossier = [
            'nom' => basename($sousDossier),
            'contenu' => []
        ];

        // Lister les sous-dossiers (pour le cas spécifique de ce problème, cela semble inutile mais fourni pour généralité)
        $fichiers = scandir($sousDossier);

        foreach ($fichiers as $fichier) {
            if ($fichier === '.' || $fichier === '..') {
                continue; // Ignorer les dossiers . et ..
            }

            // Construire le chemin complet du fichier
            $cheminComplet = $sousDossier . '/' . $fichier;

            // Vérifier s'il s'agit d'un dossier (et non d'un fichier)
            if (is_dir($cheminComplet)) {
                // Ici, lire le contenu des fichiers spécifiques dans ce sous-dossier
                $structureFichier = [
                    'nom' => lireContenuFichier($cheminComplet . '/nom.txt'),
                    'descriptif' => lireContenuFichier($cheminComplet . '/descriptif.txt'),
                    'algo' => lireContenuFichier($cheminComplet . '/algo.json'),
                    'path' => $cheminComplet
                ];

                // Ajouter cette structure au contenu du dossier parent
                $structureDossier['contenu'][] = $structureFichier;
            }
        }

        // Ajouter la structure du dossier au résultat global
        $resultat[] = $structureDossier;
    }

    return $resultat;
}

// Remplacer par le chemin réel de la racine de votre bibliothèque
$cheminBibliotheque = '.';
$arborescence = explorerDossier($cheminBibliotheque);

// Afficher le résultat
echo json_encode($arborescence, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

?>
<?php
    $fichierAConvertir = "Algorithme3.tbr";

    function regarderUnElement($unElement)
    {
        $multiplierX = 0.1;
        $multiplierY = 0.1;
        $mesObjets = [];
        if($unElement->Action)
        {
            foreach($unElement->Action as $unEnfant)
            {
                $data = array(
                    'abscisse' => floatval(explode(";",$unEnfant->Position)[0]) * $multiplierX . "vw",
                    'ordonnee' => floatval(explode(";",$unEnfant->Position)[1]) * $multiplierY . "vw",
                    'typeElement' => "Probleme",
                    'libelle' => (string)$unEnfant->Titre,
                    'listeDonnes' => [],
                    'listeResultats' => [],
                    'enfants' => regarderUnElement($unEnfant->Enfants)   
                );
                array_push($mesObjets, $data);
            }
        }
        if($unElement->Iteration)
        {
            foreach($unElement->Iteration as $unEnfant)
            {
                $chaine = (string)$unEnfant->Titre;
                $pattern = '/pour\s+(\w+)\s+allant\s+de\s+(\d+)\s+à\s+(\d+)/i';

                if (preg_match($pattern, $chaine, $matches)) {
                    $variable_i = $matches[1];
                    $min = $matches[2];
                    $max = $matches[3];
                    $data = array(
                        'abscisse' => explode(";",$unEnfant->Position)[0] . "vw",
                        'ordonnee' => explode(";",$unEnfant->Position)[1] . "vw",
                        'typeElement' => "StructureIterativeBornee",
                        'enfants' => regarderUnElement($unEnfant->Enfants)
                    );
                }
                else {
                    $data = array(
                        'abscisse' => explode(";",$unEnfant->Position)[0] . "vw",
                        'ordonnee' => explode(";",$unEnfant->Position)[1] . "vw",
                        'typeElement' => "StructureIterativeNonBornee",
                        'enfants' => regarderUnElement($unEnfant->Enfants)   
                    );
                }
                array_push($mesObjets, $data);
            }
        }
        if($unElement->Condition)
        {
            foreach($unElement->Condition as $unEnfant)
            {
                $conditions = [];
                foreach($unEnfant->operationsLogiques->operation as $operation) {
                    $condition = array(
                        'typeElement' => "Condition",
                        'libelle' => (String)$operation->Titre,
                        'enfants' => regarderUnElement($operation->Enfants)
                    );
                    array_push($conditions, $condition);
                }
                $data = array(
                    'abscisse' => explode(";",$unEnfant->Position)[0] . "vw",
                    'ordonnee' => explode(";",$unEnfant->Position)[1] . "vw",
                    'typeElement' => "StructureSi",
                    'conditions' => $conditions  
                );
                array_push($mesObjets, $data);
            }
        }
        if($unElement->ConditionMultiple)
        {
            /*foreach($unElement->ConditionMultiple as $unEnfant)
            {
                
            }*/
        }
        if($unElement->Sortie)
        {
            foreach($unElement->Sortie as $unEnfant)
            {
                $data = array(
                    'abscisse' => explode(";",$unEnfant->Position)[0] . "vw",
                    'ordonnee' => explode(";",$unEnfant->Position)[1] . "vw",
                    'typeElement' => "ConditionSortie"
                );
                array_push($mesObjets, $data);
            }
        }
        //var_dump($mesObjets);
        var_dump(json_encode($mesObjets, JSON_PRETTY_PRINT));
        return $mesObjets;
    }

    // Vérifier si le fichier existe
    if (!file_exists($fichierAConvertir)) {
        echo 'Le fichier tbr n\'existe pas.';
        return;
    }

    // Charger le fichier XML
    $xml = simplexml_load_file($fichierAConvertir);
    // Vérifier si le chargement a réussi
    if($xml == false)
    {
        echo 'Erreur lors du chargement du fichier XML.';
        return;
    }

    if($xml->Elements->Action)
    {
        // On recupere la premiere action
        // Assuming $xml is your XML data and regarderUnElement is a function that processes it
        $jsonData = json_encode(regarderUnElement($xml->Elements), JSON_PRETTY_PRINT);

        // Specify the file path where you want to store the JSON data
        $filePath = 'algo.json';

        // Write the JSON data to the file
        file_put_contents($filePath, $jsonData);

        // Output a message indicating the file has been created
        echo "JSON data has been written to: $filePath";
    }
?>

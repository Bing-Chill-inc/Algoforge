# Représentations des algorithmes en JSON et Javascript

## Exemple 1
```js
let pb1 = new Probleme("30vw", "15vw", "1", [new Information("nbr")]);
let pb2 = new Probleme("15vw", "30vw", "2", [new Information("val")]);
let pb3 = new Probleme("45vw", "30vw", "3", [new Information("nbr")]);

pb1.afficher();
pb2.afficher();
pb3.afficher();

pb1._elemParent.lierEnfant(pb2);
pb1._elemParent.lierEnfant(pb3);

espaceTravail = document.getElementById("espace1");
espaceTravail.appendChild(pb1);
espaceTravail.appendChild(pb2);
espaceTravail.appendChild(pb3);

console.log(JSON.stringify(pb1.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"1",
    "listeDonnes":[
        {"nom":"nbr"}
    ],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"Probleme",
            "abscisse":"15vw",
            "ordonnee":"30vw",
            "libelle":"2",
            "listeDonnes":[
                {"nom":"val"}
            ],
            "listeResultats":[]
            ,"enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"45vw",
            "ordonnee":"30vw",
            "libelle":"3",
            "listeDonnes":[
                {"nom":"nbr"}
            ],
            "listeResultats":[],
            "enfants":[]
        }
    ]
}
```
## Exemple 2
```js
let pb1 = new Probleme("30vw", "15vw", "1", [new Information("val"), new Information("nbr")]);
let pb2 = new Probleme("15vw", "30vw", "2", [new Information("val")]);
let pb3 = new Probleme("45vw", "30vw", "3", [new Information("val")]);

pb1.afficher();
pb2.afficher();
pb3.afficher();

pb1._elemParent.lierEnfant(pb2);
pb1._elemParent.lierEnfant(pb3);

espaceTravail = document.getElementById("espace1");
espaceTravail.appendChild(pb1);
espaceTravail.appendChild(pb2);
espaceTravail.appendChild(pb3);

console.log(JSON.stringify(pb1.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"1",
    "listeDonnes":[
        {"nom":"val"},
        {"nom":"nbr"}
    ],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"Probleme",
            "abscisse":"15vw",
            "ordonnee":"30vw",
            "libelle":"2",
            "listeDonnes":[
                {"nom":"val"}
            ],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"45vw",
            "ordonnee":"30vw",
            "libelle":"3",
            "listeDonnes":[
                {"nom":"val"}
            ],
            "listeResultats":[],
            "enfants":[]
        }
    ]
}
```

## Exemple 3
```js
   let pb1 = new Probleme("30vw", "15vw", "Echange de deux valeurs", [], [new Information("x"), new Information("y")]);
    let pb2 = new Probleme("15vw", "30vw", "Saisir x et y", [], [new Information("x"), new Information("y")]);
    let pb3 = new Probleme("45vw", "30vw", "Echanger les variables", [new Information("x"), new Information("y")], [new Information("x"), new Information("y"), new Information("temp")]);
    let pb4 = new Probleme("15vw", "45vw", "temp ← y");
    let pb5 = new Probleme("45vw", "45vw", "y ← x");
    let pb6 = new Probleme("75vw", "45vw", "x ← temp");

    pb1.afficher();
    pb2.afficher();
    pb3.afficher();
    pb4.afficher();
    pb5.afficher();
    pb6.afficher();

    pb1._elemParent.lierEnfant(pb2);
    pb1._elemParent.lierEnfant(pb3);

    pb3._elemParent.lierEnfant(pb4);
    pb3._elemParent.lierEnfant(pb5);
    pb3._elemParent.lierEnfant(pb6);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(pb3);
    espaceTravail.appendChild(pb4);
    espaceTravail.appendChild(pb5);
    espaceTravail.appendChild(pb6);

    console.log(JSON.stringify(pb1.toJSON()));
```

```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"Echange de deux valeurs",
    "listeDonnes":[],
    "listeResultats":[
        {"nom":"x"},
        {"nom":"y"}
    ],
    "enfants":[
        {
            "typeElement":"Probleme",
            "abscisse":"15vw",
            "ordonnee":"30vw",
            "libelle":"Saisir x et y",
            "listeDonnes":[],
            "listeResultats":[
                {"nom":"x"},
                {"nom":"y"}
            ],
            "enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"45vw",
            "ordonnee":"30vw",
            "libelle":"Echanger les variables",
            "listeDonnes":[
                {"nom":"x"},
                {"nom":"y"}
            ],
            "listeResultats":[
                {"nom":"x"},
                {"nom":"y"},
                {"nom":"temp"}
            ],
            "enfants":[
                {
                    "typeElement":"Probleme",
                    "abscisse":"15vw",
                    "ordonnee":"45vw",
                    "libelle":"temp ← y",
                    "listeDonnes":[],
                    "listeResultats":[],
                    "enfants":[]
                },
                {
                    "typeElement":"Probleme",
                    "abscisse":"45vw",
                    "ordonnee":"45vw",
                    "libelle":"y ← x",
                    "listeDonnes":[],
                    "listeResultats":[],
                    "enfants":[]
                },
                {
                    "typeElement":"Probleme",
                    "abscisse":"75vw",
                    "ordonnee":"45vw",
                    "libelle":"x ← temp",
                    "listeDonnes":[],
                    "listeResultats":[],
                    "enfants":[]
                }
            ]
        }
    ]
}
```

## Exemple 4
```js
    let pb1 = new Probleme("30vw", "15vw", "1", [new Information("val")],);
    let pb2 = new Probleme("15vw", "30vw", "somme ← val + nbr");
    let pb3 = new Probleme("45vw", "30vw", "3");

    pb1.afficher();
    pb2.afficher();
    pb3.afficher();

    pb1._elemParent.lierEnfant(pb2);
    pb1._elemParent.lierEnfant(pb3);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(pb3);

    console.log(JSON.stringify(pb1.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"1",
    "listeDonnes":[
        {"nom":"val"}
    ],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"Probleme",
            "abscisse":"15vw",
            "ordonnee":"30vw",
            "libelle":"somme ← val + nbr",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"45vw",
            "ordonnee":"30vw",
            "libelle":"3",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        }
    ]
}
```

## Exemple 5
```js
    let pb1 = new Probleme("30vw", "15vw", "1");
    let pb2 = new Probleme("10vw", "30vw", "2");
    let sortie = new ConditionSortie("43vw", "30vw");
    let pb3 = new Probleme("50vw", "30vw", "3");

    pb1.afficher();
    pb2.afficher();
    sortie.afficher();
    pb3.afficher();

    pb1._elemParent.lierEnfant(pb2);
    pb1._elemParent.lierEnfant(sortie);
    pb1._elemParent.lierEnfant(pb3);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(sortie);
    espaceTravail.appendChild(pb3);

    console.log(JSON.stringify(pb1.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"1",
    "listeDonnes":[],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"Probleme",
            "abscisse":"10vw",
            "ordonnee":"30vw",
            "libelle":"2",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"ConditionSortie",
            "abscisse":"43vw",
            "ordonnee":"30vw"
        },
        {
            "typeElement":"Probleme",
            "abscisse":"50vw",
            "ordonnee":"30vw",
            "libelle":"3",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        }
    ]
}
```

## Exemple 6
```js
    let pb1 = new Probleme("30vw", "15vw", "1");
    let boucle1 = new StructureIterativeBornee("43vw", "30vw", new Information("i"), borneInferieure = "0", borneSuperieure = "5", pas = "1")
    let pb2 = new Probleme("15vw", "45vw", "2");
    let si1 = new StructureSi("45vw", "45vw", [new Condition("i = 4")]);
    let sortie = new ConditionSortie("48vw", "60vw");

    pb1.afficher();
    boucle1.afficher();
    pb2.afficher();
    si1.afficher();
    sortie.afficher();

    pb1._elemParent.lierEnfant(boucle1);
    boucle1._elemParent.lierEnfant(pb2);
    boucle1._elemParent.lierEnfant(si1);
    si1._listeConditions.children[0]._elemParent.lierEnfant(sortie);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(boucle1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(si1);
    espaceTravail.appendChild(sortie);

    console.log(JSON.stringify(pb1.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"1",
    "listeDonnes":[],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"StructureIterativeBornee",
            "abscisse":"43vw",
            "ordonnee":"30vw",
            "variableAIterer":
                {
                    "nom":"i"
                },
            "borneInferieure":"0",
            "borneSuperieure":"5",
            "pas":"1",
            "enfants":[
                {
                    "typeElement":"Probleme",
                    "abscisse":"15vw",
                    "ordonnee":"45vw",
                    "libelle":"2",
                    "listeDonnes":[],
                    "listeResultats":[],
                    "enfants":[]
                },
                {
                    "typeElement":"StructureSi",
                    "abscisse":"45vw",
                    "ordonnee":"45vw",
                    "conditions":[
                        {
                            "typeElement":"Condition",
                            "libelle":"i = 4",
                            "enfants":[
                                {
                                    "typeElement":"ConditionSortie",
                                    "abscisse":"48vw",
                                    "ordonnee":"60vw"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

## Exemple 7
```js
    let pb1 = new Probleme("30vw", "15vw", "1");
    let pb2 = new Probleme("10vw", "30vw", "2");
    let sortie = new ConditionSortie("43vw", "30vw");
    let pb3 = new Probleme("50vw", "30vw", "3");

    pb1.afficher();
    pb2.afficher();
    sortie.afficher();
    pb3.afficher();

    pb1._elemParent.lierEnfant(pb2);
    pb1._elemParent.lierEnfant(sortie);
    pb1._elemParent.lierEnfant(pb3);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(sortie);
    espaceTravail.appendChild(pb3);

    console.log(JSON.stringify(pb1.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"1",
    "listeDonnes":[],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"Probleme",
            "abscisse":"10vw",
            "ordonnee":"30vw",
            "libelle":"2",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"ConditionSortie",
            "abscisse":"43vw",
            "ordonnee":"30vw"
        },
        {
            "typeElement":"Probleme",
            "abscisse":"50vw",
            "ordonnee":"30vw",
            "libelle":"3",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        }
    ]
}
```

## Exemple 8
```js
    let pb1 = new Probleme("30vw", "15vw", "1");
    let boucle1 = new StructureIterativeNonBornee("43vw", "30vw")
    let pb2 = new Probleme("15vw", "45vw", "x = 2");
    let si1 = new StructureSi("45vw", "45vw", [new Condition("i == 4")]);
    let sortie = new ConditionSortie("48vw", "60vw");

    pb1.afficher();
    boucle1.afficher();
    pb2.afficher();
    si1.afficher();
    sortie.afficher();

    pb1._elemParent.lierEnfant(boucle1);
    boucle1._elemParent.lierEnfant(pb2);
    boucle1._elemParent.lierEnfant(si1);
    si1._listeConditions.children[0]._elemParent.lierEnfant(sortie);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(boucle1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(si1);
    espaceTravail.appendChild(sortie);

    console.log(JSON.stringify(pb1.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"1",
    "listeDonnes":[],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"StructureIterativeNonBornee",
            "abscisse":"43vw",
            "ordonnee":"30vw",
            "enfants":[
                {
                    "typeElement":"Probleme",
                    "abscisse":"15vw",
                    "ordonnee":"45vw",
                    "libelle":"x = 2",
                    "listeDonnes":[],
                    "listeResultats":[],
                    "enfants":[]
                },
                {
                    "typeElement":"StructureSi",
                    "abscisse":"45vw",
                    "ordonnee":"45vw",
                    "conditions":[
                        {
                            "typeElement":"Condition",
                            "libelle":"i == 4",
                            "enfants":[
                                {
                                    "typeElement":"ConditionSortie",
                                    "abscisse":"48vw",
                                    "ordonnee":"60vw"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

## Exemple 9
```js
    let pb1 = new Probleme("30vw", "15vw", "1");
    let boucle1 = new StructureIterativeNonBornee("43vw", "30vw")
    let pb2 = new Probleme("15vw", "45vw", "x = 2");
    let si1 = new StructureSi("45vw", "45vw", [new Condition("i == 4")]);
    let sortie = new ConditionSortie("48vw", "60vw");

    pb1.afficher();
    boucle1.afficher();
    pb2.afficher();
    si1.afficher();
    sortie.afficher();

    pb1._elemParent.lierEnfant(boucle1);
    boucle1._elemParent.lierEnfant(pb2);
    boucle1._elemParent.lierEnfant(si1);
    si1._listeConditions.children[0]._elemParent.lierEnfant(sortie);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(boucle1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(si1);
    espaceTravail.appendChild(sortie);

    console.log(JSON.stringify(pb1.toJSON()));
```
```json
[
  {
      "typeElement":"Probleme",
      "abscisse":"30vw",
      "ordonnee":"15vw",
      "libelle":"1",
      "listeDonnes":[],
      "listeResultats":[],
      "enfants":[
          {
              "typeElement":"StructureIterativeNonBornee",
              "abscisse":"43vw",
              "ordonnee":"30vw",
              "enfants":[
                  {
                      "typeElement":"Probleme",
                      "abscisse":"15vw",
                      "ordonnee":"45vw",
                      "libelle":"x = 2",
                      "listeDonnes":[],
                      "listeResultats":[],
                      "enfants":[]
                  },
                  {
                      "typeElement":"StructureSi",
                      "abscisse":"45vw",
                      "ordonnee":"45vw",
                      "conditions":[
                          {
                              "typeElement":"Condition",
                              "libelle":"i == 4",
                              "enfants":[
                                  {
                                      "typeElement":"ConditionSortie",
                                      "abscisse":"48vw",
                                      "ordonnee":"60vw"
                                  }
                              ]
                          }
                      ]
                  }
              ]
          }
      ]
  }
]
```

## Exemple 10
```js
    let pb1 = new Probleme("30vw", "15vw", "1");
    let boucle1 = new StructureIterativeNonBornee("43vw", "30vw")
    let pb2 = new Probleme("15vw", "45vw", "2");
    let pb3 = new Probleme("45vw", "45vw", "3");

    pb1.afficher();
    boucle1.afficher();
    pb2.afficher();
    pb3.afficher();

    pb1._elemParent.lierEnfant(boucle1);
    boucle1._elemParent.lierEnfant(pb2);
    boucle1._elemParent.lierEnfant(pb3);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(boucle1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(pb3);

    console.log(JSON.stringify(pb1.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"1",
    "listeDonnes":[],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"StructureIterativeNonBornee",
            "abscisse":"43vw",
            "ordonnee":"30vw",
            "enfants":[
                {
                    "typeElement":"Probleme",
                    "abscisse":"15vw",
                    "ordonnee":"45vw",
                    "libelle":"2",
                    "listeDonnes":[],
                    "listeResultats":[],
                    "enfants":[]
                },
                {
                    "typeElement":"Probleme",
                    "abscisse":"45vw",
                    "ordonnee":"45vw",
                    "libelle":"3",
                    "listeDonnes":[],
                    "listeResultats":[],
                    "enfants":[]
                }
            ]
        }
    ]
}
```

## Exemple 11
```js
    let pb1 = new Probleme("30vw", "15vw", "1");
    let boucle1 = new StructureIterativeBornee("43vw", "30vw", new Information("i"), borneInferieure = "0", borneSuperieure = "5", pas = "-1")
    let pb2 = new Probleme("15vw", "45vw", "2");
    let pb3 = new Probleme("45vw", "45vw", "3");

    pb1.afficher();
    boucle1.afficher();
    pb2.afficher();
    pb3.afficher();

    pb1._elemParent.lierEnfant(boucle1);
    boucle1._elemParent.lierEnfant(pb2);
    boucle1._elemParent.lierEnfant(pb3);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(boucle1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(pb3);

    console.log(JSON.stringify(pb1.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"30vw",
    "ordonnee":"15vw",
    "libelle":"1",
    "listeDonnes":[],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"StructureIterativeBornee",
            "abscisse":"43vw",
            "ordonnee":"30vw",
            "variableAIterer":
                {
                    "nom":"i"
                },
            "borneInferieure":"0",
            "borneSuperieure":"5",
            "pas":"-1",
            "enfants":[
                {
                    "typeElement":"Probleme",
                    "abscisse":"15vw",
                    "ordonnee":"45vw",
                    "libelle":"2",
                    "listeDonnes":[],
                    "listeResultats":[],
                    "enfants":[]
                },
                {
                    "typeElement":"Probleme",
                    "abscisse":"45vw",
                    "ordonnee":"45vw",
                    "libelle":"3",
                    "listeDonnes":[],
                    "listeResultats":[],
                    "enfants":[]
                }
            ]
        }
    ]
}
```

## Exemple 12
```js
    let pb0 = new Probleme("45vw", "15vw", "0");
    let pb1 = new Probleme("0vw", "30vw", "1");
    let pb2 = new Probleme("15vw", "30vw", "2");
    let pb3 = new Probleme("30vw", "30vw", "3");
    let pb4 = new Probleme("45vw", "30vw", "4");
    let pb5 = new Probleme("60vw", "30vw", "5");
    let pb6 = new Probleme("75vw", "30vw", "6");
    let pb7 = new Probleme("90vw", "30vw", "7");

    pb0.afficher();
    pb1.afficher();
    pb2.afficher();
    pb3.afficher();
    pb4.afficher();
    pb5.afficher();
    pb6.afficher();
    pb7.afficher();

    pb0._elemParent.lierEnfant(pb1);
    pb0._elemParent.lierEnfant(pb2);
    pb0._elemParent.lierEnfant(pb3);
    pb0._elemParent.lierEnfant(pb4);
    pb0._elemParent.lierEnfant(pb5);
    pb0._elemParent.lierEnfant(pb6);
    pb0._elemParent.lierEnfant(pb7);

    espaceTravail = document.getElementById("espace1");
    espaceTravail.appendChild(pb0);
    espaceTravail.appendChild(pb1);
    espaceTravail.appendChild(pb2);
    espaceTravail.appendChild(pb3);
    espaceTravail.appendChild(pb4);
    espaceTravail.appendChild(pb5);
    espaceTravail.appendChild(pb6);
    espaceTravail.appendChild(pb7);

    console.log(JSON.stringify(pb0.toJSON()));
```
```json
{
    "typeElement":"Probleme",
    "abscisse":"45vw",
    "ordonnee":"15vw",
    "libelle":"0",
    "listeDonnes":[],
    "listeResultats":[],
    "enfants":[
        {
            "typeElement":"Probleme",
            "abscisse":"0vw",
            "ordonnee":"30vw",
            "libelle":"1",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"15vw",
            "ordonnee":"30vw",
            "libelle":"2",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"30vw",
            "ordonnee":"30vw",
            "libelle":"3",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"45vw",
            "ordonnee":"30vw",
            "libelle":"4",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"60vw",
            "ordonnee":"30vw",
            "libelle":"5",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"75vw",
            "ordonnee":"30vw",
            "libelle":"6",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        },
        {
            "typeElement":"Probleme",
            "abscisse":"90vw",
            "ordonnee":"30vw",
            "libelle":"7",
            "listeDonnes":[],
            "listeResultats":[],
            "enfants":[]
        }
    ]
}
```

## Exemple 13
```js
    espaceTravail = document.getElementById("espace1");
    let pb0 = new Probleme("45vw", "15vw", "0");
    pb0.afficher();
    espaceTravail.appendChild(pb0);
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Ajouter des enfants aléatoires
    for (let i = 0; i < 10; i++) {
        let pb = new Probleme(random(0, 500) + "vw", random(0, 500) + "vw", `${i}`);
        pb0._elemParent.lierEnfant(pb);
        pb.afficher();
        espaceTravail.appendChild(pb);
        for (let j = 0; j < random(2, 10); j++) {
            let spb = new Probleme(random(0, 500) + "vw", random(0, 500) + "vw", `${i} ${j}`);
            pb._elemParent.lierEnfant(spb);
            spb.afficher();
            espaceTravail.appendChild(spb);
        }
    }
    console.log(JSON.stringify(pb0.toJSON()));
```
```json
{
  "typeElement": "Probleme",
  "abscisse": "45vw",
  "ordonnee": "15vw",
  "libelle": "0",
  "listeDonnes": [],
  "listeResultats": [],
  "enfants": [
    {
      "typeElement": "Probleme",
      "abscisse": "136vw",
      "ordonnee": "475vw",
      "libelle": "0",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "224vw",
          "ordonnee": "131vw",
          "libelle": "0 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "413vw",
          "ordonnee": "314vw",
          "libelle": "0 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "342vw",
          "ordonnee": "491vw",
          "libelle": "0 2",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    },
    {
      "typeElement": "Probleme",
      "abscisse": "430vw",
      "ordonnee": "133vw",
      "libelle": "1",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "276vw",
          "ordonnee": "190vw",
          "libelle": "1 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "464vw",
          "ordonnee": "286vw",
          "libelle": "1 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    },
    {
      "typeElement": "Probleme",
      "abscisse": "277vw",
      "ordonnee": "87vw",
      "libelle": "2",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "269vw",
          "ordonnee": "181vw",
          "libelle": "2 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "162vw",
          "ordonnee": "165vw",
          "libelle": "2 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "449vw",
          "ordonnee": "312vw",
          "libelle": "2 2",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "484vw",
          "ordonnee": "232vw",
          "libelle": "2 3",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "203vw",
          "ordonnee": "108vw",
          "libelle": "2 4",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    },
    {
      "typeElement": "Probleme",
      "abscisse": "22vw",
      "ordonnee": "172vw",
      "libelle": "3",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "40vw",
          "ordonnee": "128vw",
          "libelle": "3 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "78vw",
          "ordonnee": "369vw",
          "libelle": "3 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "153vw",
          "ordonnee": "464vw",
          "libelle": "3 2",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "311vw",
          "ordonnee": "136vw",
          "libelle": "3 3",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    },
    {
      "typeElement": "Probleme",
      "abscisse": "170vw",
      "ordonnee": "207vw",
      "libelle": "4",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "183vw",
          "ordonnee": "110vw",
          "libelle": "4 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "186vw",
          "ordonnee": "96vw",
          "libelle": "4 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "254vw",
          "ordonnee": "381vw",
          "libelle": "4 2",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    },
    {
      "typeElement": "Probleme",
      "abscisse": "242vw",
      "ordonnee": "166vw",
      "libelle": "5",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "225vw",
          "ordonnee": "39vw",
          "libelle": "5 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "31vw",
          "ordonnee": "396vw",
          "libelle": "5 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "416vw",
          "ordonnee": "443vw",
          "libelle": "5 2",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    },
    {
      "typeElement": "Probleme",
      "abscisse": "403vw",
      "ordonnee": "227vw",
      "libelle": "6",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "128vw",
          "ordonnee": "37vw",
          "libelle": "6 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "186vw",
          "ordonnee": "82vw",
          "libelle": "6 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    },
    {
      "typeElement": "Probleme",
      "abscisse": "362vw",
      "ordonnee": "54vw",
      "libelle": "7",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "332vw",
          "ordonnee": "82vw",
          "libelle": "7 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "217vw",
          "ordonnee": "366vw",
          "libelle": "7 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "343vw",
          "ordonnee": "401vw",
          "libelle": "7 2",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "443vw",
          "ordonnee": "49vw",
          "libelle": "7 3",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    },
    {
      "typeElement": "Probleme",
      "abscisse": "316vw",
      "ordonnee": "468vw",
      "libelle": "8",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "101vw",
          "ordonnee": "455vw",
          "libelle": "8 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "235vw",
          "ordonnee": "180vw",
          "libelle": "8 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "389vw",
          "ordonnee": "221vw",
          "libelle": "8 2",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "221vw",
          "ordonnee": "313vw",
          "libelle": "8 3",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "484vw",
          "ordonnee": "236vw",
          "libelle": "8 4",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    },
    {
      "typeElement": "Probleme",
      "abscisse": "126vw",
      "ordonnee": "274vw",
      "libelle": "9",
      "listeDonnes": [],
      "listeResultats": [],
      "enfants": [
        {
          "typeElement": "Probleme",
          "abscisse": "68vw",
          "ordonnee": "227vw",
          "libelle": "9 0",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "8vw",
          "ordonnee": "107vw",
          "libelle": "9 1",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        },
        {
          "typeElement": "Probleme",
          "abscisse": "60vw",
          "ordonnee": "53vw",
          "libelle": "9 2",
          "listeDonnes": [],
          "listeResultats": [],
          "enfants": []
        }
      ]
    }
  ]
}
```
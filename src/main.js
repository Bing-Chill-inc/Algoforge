/*let a = new StructureSi("20vw", "20vw", [new Condition("a = 1"),new Condition("a = 2"),new Condition("a = 3"),new Condition("a = 4"),new Condition("a = 5"),new Condition("a = 6"),new Condition("a = 7"),new Condition("a = 8")]);
let b = new Probleme;
let c = new Probleme('0vw','10vw');
let d = new Probleme('50vw','10vw');
let e = new Probleme('100vw','10vw');
let f = new Probleme('150vw','10vw');
let g = new Probleme('200vw','10vw');
let h = new Probleme('250vw','10vw');
let i = new Probleme('300vw','10vw');

document.getElementById('espace1').appendChild(a);
document.getElementById('espace1').appendChild(b);
document.getElementById('espace1').appendChild(c);


a.afficher();
b.afficher();
c.afficher();


a._listeConditions.children[0]._elemParent.lierEnfant(b)
a._listeConditions.children[1]._elemParent.lierEnfant(c);
a._listeConditions.children[2]._elemParent.lierEnfant(d);
a._listeConditions.children[3]._elemParent.lierEnfant(e);
a._listeConditions.children[4]._elemParent.lierEnfant(f);
a._listeConditions.children[5]._elemParent.lierEnfant(g);
a._listeConditions.children[6]._elemParent.lierEnfant(h);
a._listeConditions.children[7]._elemParent.lierEnfant(i);
*/
/*
document.getElementById('espace1'); 
let a = new Probleme;
let b = new Probleme('0vw','10vw');
let r = new ConditionSortie('25vw','10vw');
let c = new Probleme('50vw','10vw');
let d = new Probleme('0vw','20vw');
let e = new StructureIterativeBornee('0vw', '30vw', "CompteurIncrementale");
let f = new Probleme('0vw', '40vw');
let s = new StructureSwitch('80vw', '40vw',  [new Condition("a"),new Condition("2"),new Condition("3"),new Condition("4"),new Condition("5"),new Condition("6"),new Condition("7"),new Condition("8")], "p");

document.getElementById('espace1').appendChild(a); 
document.getElementById('espace1').appendChild(b); 
document.getElementById('espace1').appendChild(c); 
document.getElementById('espace1').appendChild(d); 
document.getElementById('espace1').appendChild(e);
document.getElementById('espace1').appendChild(f);
document.getElementById('espace1').appendChild(s);
document.getElementById('espace1').appendChild(r);



a.afficher();
b.afficher();
c.afficher();
d.afficher();
e.afficher();
f.afficher();
s.afficher();
r.afficher();

a._elemParent.lierEnfant(b);
c._elemParent.lierEnfant(r);
a._elemParent.lierEnfant(c);
b._elemParent.lierEnfant(d);
d._elemParent.lierEnfant(e);
e._elemParent.lierEnfant(f);
*/
/*
// Couche 1
let a = new Probleme('60vw','0vw', "Algorithme", []);
// Couche 2
let b = new Probleme('30vw','10vw', "Manipulation", [new Information("Entree")], [new Information("a")]);
let c = new Probleme('120vw','10vw', "Afficher le resultat", [new Information("a")]);
// Couche 3
let d = new Probleme('0vw','20vw', 'b <- "bndh"');
let e = new Probleme('30vw','20vw', 'a <- Entree');
let f = new Probleme('60vw','20vw', 'a <- b');
let g = new Probleme('120vw','20vw', 'afficher a', [new Information("a")]);
let h =new StructureSi("20vw", "35vw", [new Condition("a = 1"),new Condition("a = 2"),new Condition("a = 3"),new Condition("a = 4"),new Condition("a = 5"),new Condition("a = 6"),new Condition("a = 7"),new Condition("Sinon")]);;
//let i = new Probleme('20vw','45vw', 'Test', [new Information("a")]);

document.getElementById('espace1').appendChild(a);
document.getElementById('espace1').appendChild(b);
document.getElementById('espace1').appendChild(c);
document.getElementById('espace1').appendChild(d);
document.getElementById('espace1').appendChild(e);
document.getElementById('espace1').appendChild(f);
document.getElementById('espace1').appendChild(g);
document.getElementById('espace1').appendChild(h);
//document.getElementById('espace1').appendChild(i);

a.afficher(); 
b.afficher();
c.afficher();
d.afficher();
e.afficher();
f.afficher();
g.afficher();
h.afficher();
//i.afficher();
function maFonction()
{
    //Couche 1
    a._elemParent.lierEnfant(b);
    a._elemParent.lierEnfant(c);
    //Couche 2
    b._elemParent.lierEnfant(d);
    b._elemParent.lierEnfant(e);
    b._elemParent.lierEnfant(f);

    c._elemParent.lierEnfant(g);
    e._elemParent.lierEnfant(h);
    //h._listeConditions.children[0]._elemParent.lierEnfant(i)
}
setTimeout("maFonction();", 1000);


document.getElementById('espace1');

let a = new StructureSi("20vw", "20vw", [new Condition("a = 1"),new Condition("a = 2"),new Condition("a = 3"),new Condition("a = 4"),new Condition("a = 5"),new Condition("a = 6"),new Condition("a = 7"),new Condition("a   = 8")]);
let a = new StructureSwitch("20vw", "20vw", [new Condition("a"),new Condition("t")]);
let b = new Probleme;

document.getElementById('espace1').appendChild(a); 
document.getElementById('espace1').appendChild(b); 

a.afficher();
b.afficher();

a._listeConditions.children[0]._elemParent.lierEnfant(b)*/
/*
let a = new Probleme('80vw','0vw', "Création de la chaine modifiée", [], [new Information("chaineOrig"),new Information("chaineModif")]);
let b = new Probleme('80vw','10vw', "Générer le captcha", [], [new Information("chaineOrig"),new Information("chaineModif")]);
let c = new Probleme('0vw','20vw', "generer la chaine de nombre", [], [new Information("chaineOrig")]);
let d = new StructureIterativeBornee('10vw', '30vw', "x", 0, 4);
let e = new Probleme('0vw','40vw', "chaineOrig[i] = rand() % 9", [], [new Information("chaineOrig")]);
let f = new Probleme('80vw','20vw', "altération de la chaine", [new Information("chaineOrig"), new Information("baseImage")], [new Information("chaineModif")]);
let g = new Probleme('50vw','30vw', "choix aléatoire de 2 effets de distortion d'image",[], [new Information("effet1"), new Information("effet2")]);
let h = new Probleme('50vw','40vw', "effet1 = rand() % 10",[], [new Information("effet1")])
let i = new Probleme('80vw','40vw', "effet2 = rand() % 10",[], [new Information("effet2")])
let j = new Probleme('110vw','30vw', "récupération des images des caractères présents dans la chaine",[new Information("chaineOrig"), new Information("baseImage")], [new Information("tabImage")])
let k = new StructureIterativeBornee('120vw', '40vw', "i", 0, 4);
let l = new Probleme('110vw','50vw', "tabImage[i] = baseImage[chaineOrig[i]]",[new Information("baseImage"), new Information("chaineOrig")], [new Information("tabImage")])
let m = new Probleme('150vw','30vw', "fusion des images",[new Information("tabImag"), new Information("imagOrig")], [new Information("tabImage")])
let n = new Probleme('180vw','30vw', "application des effets",[new Information("imageOrig"), new Information("effet1"), new Information("effet2")], [new Information("chaineModif")])


document.getElementById('espace1').appendChild(a);
document.getElementById('espace1').appendChild(b);
document.getElementById('espace1').appendChild(c);
document.getElementById('espace1').appendChild(d);
document.getElementById('espace1').appendChild(e);
document.getElementById('espace1').appendChild(f);
document.getElementById('espace1').appendChild(g);
document.getElementById('espace1').appendChild(h);
document.getElementById('espace1').appendChild(i);
document.getElementById('espace1').appendChild(j);
document.getElementById('espace1').appendChild(k);
document.getElementById('espace1').appendChild(l);
document.getElementById('espace1').appendChild(m);
document.getElementById('espace1').appendChild(n);

a.afficher(); 
b.afficher();
c.afficher();
d.afficher();
e.afficher();
f.afficher();
g.afficher();
h.afficher();
i.afficher();
j.afficher();
k.afficher();
l.afficher();
m.afficher();
n.afficher();

a._elemParent.lierEnfant(b)
b._elemParent.lierEnfant(c)
b._elemParent.lierEnfant(f)
c._elemParent.lierEnfant(d)
d._elemParent.lierEnfant(e)
f._elemParent.lierEnfant(g)
f._elemParent.lierEnfant(j)
f._elemParent.lierEnfant(m)
f._elemParent.lierEnfant(n)
g._elemParent.lierEnfant(h)
g._elemParent.lierEnfant(i)
j._elemParent.lierEnfant(k)
k._elemParent.lierEnfant(l)*/
/*
let a = new Probleme('45vw','0vw', "Parcours complet avec traitement conditionné", [new Information("tab"), new Information("NB_CASES")], [new Information("moyenne")]);
let b = new Probleme('0vw','10vw', "Initialisation de la somme", [], [new Information("somme")]);
let c = new Probleme('0vw','20vw', "somme <- 0");
let d = new Probleme('30vw','10vw', "Faire la somme" , [new Information("somme"), new Information('tab'), new Information('NB_CASES')], [new Information('somme')]);
let e = new StructureIterativeBornee("40vw", "20vw", "i" , "0", "NB_CASES-1","1")
let f = new StructureSi("35vw", "30vw", [new Condition("tab[i] => 0"),new Condition("Sinon")]);
let g = new Probleme('30vw','40vw', "somme <- somme + tab[i]");
let h = new Probleme('60vw','40vw', "somme <- somme + 1");
let i = new Probleme('90vw','10vw', "faire la moyenne", [new Information("somme"), new Information("NB_CASES")], [new Information("moyenne")]);
let j =  new Probleme('90vw','20vw', "moyenne <- somme / NB_CASES", [new Information("somme"), new Information("NB_CASES")], [new Information("moyenne")]);
let k =  new ConditionSortie('80vw','40vw');


document.getElementById('espace1').appendChild(a);
document.getElementById('espace1').appendChild(b);
document.getElementById('espace1').appendChild(c);
document.getElementById('espace1').appendChild(d);
document.getElementById('espace1').appendChild(e);
document.getElementById('espace1').appendChild(f);
document.getElementById('espace1').appendChild(g);
document.getElementById('espace1').appendChild(h);
document.getElementById('espace1').appendChild(i);
document.getElementById('espace1').appendChild(j);
document.getElementById('espace1').appendChild(k);

a.afficher(); 
b.afficher();
c.afficher();
d.afficher();
e.afficher();
f.afficher();
g.afficher();
h.afficher();
i.afficher();
j.afficher();
k.afficher();

function maFonction()
{
    //Couche 1
    a._elemParent.lierEnfant(b);
    a._elemParent.lierEnfant(d);
    a._elemParent.lierEnfant(i);
    //Couche 2
    b._elemParent.lierEnfant(c);
    d._elemParent.lierEnfant(e);
    i._elemParent.lierEnfant(j)

    //Couche 3
    e._elemParent.lierEnfant(f);

    //Couche 4
    f._listeConditions.children[0]._elemParent.lierEnfant(g);
    let ligneUne = new Ligne("40vw", "33vw", "45vw", "40vw")
    document.getElementById('espace1').appendChild(ligneUne);
    ligneUne.afficher()
    let ligneDeux = new Ligne("45vw", "33vw", "75vw", "40vw")
    document.getElementById('espace1').appendChild(ligneDeux);
    ligneDeux.afficher()
    f._listeConditions.children[1]._elemParent.lierEnfant(h)

    //h._listeConditions.children[0]._elemParent.lierEnfant(i)
}
setTimeout("maFonction();", 1000);*/
let a = new Probleme('30vw','0vw', "Saisir nbre inférieur à MAX");
let b = new Probleme('0vw','10vw', "MAX <- 100");
let c = new StructureIterativeNonBornee('43vw', '10vw')
let d = new Probleme('0vw','20vw', "Saisir",[], [new Information("nbre")]);
let e = new Probleme('30vw','20vw', "Verifier nbre est inf a MAX" , [new Information("nbre"), new Information('MAX')]);
let condition = new Condition("nbre < MAX")
let f = new StructureSi("40vw", "30vw", [condition]);
condition._structure = f;
let g =  new ConditionSortie('43vw','40vw');
let h = new Probleme('60vw','20vw', "Afficher \"erreur\"" );
document.getElementById('espace1').appendChild(a);
document.getElementById('espace1').appendChild(b);
document.getElementById('espace1').appendChild(c);
document.getElementById('espace1').appendChild(d);
document.getElementById('espace1').appendChild(e);
document.getElementById('espace1').appendChild(f);
document.getElementById('espace1').appendChild(g);
document.getElementById('espace1').appendChild(h);

a.afficher(); 
b.afficher();
c.afficher();
d.afficher();
e.afficher();
f.afficher();
g.afficher();
h.afficher();

function maFonction()
{
    //Couche 1
    a._elemParent.lierEnfant(b);
    a._elemParent.lierEnfant(c);

    //Couche 2
    c._elemParent.lierEnfant(d);
    c._elemParent.lierEnfant(e);
    c._elemParent.lierEnfant(h);

    //Couche 3
    e._elemParent.lierEnfant(f);

    //Couche 4
    f._listeConditions.children[0]._elemParent.lierEnfant(g);
    let ligneUne = new Ligne("45vw", "32vw", "45vw", "40vw")
    document.getElementById('espace1').appendChild(ligneUne);
    ligneUne.afficher()
}
setTimeout("maFonction();", 1000);
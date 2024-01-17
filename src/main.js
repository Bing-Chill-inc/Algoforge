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
// Couche 1
let a = new Probleme('60vw','0vw', "Algorithme", [new Information("Entree")]);
// Couche 2
let b = new Probleme('30vw','10vw', "Manipulation", [new Information("Entree")], [new Information("a"),new Information("b")]);
let c = new Probleme('120vw','10vw', "Afficher le resultat");
// Couche 3
let d = new Probleme('0vw','20vw', 'b <- "bndh"');
let e = new Probleme('30vw','20vw', 'a <- 3');
let f = new Probleme('60vw','20vw', 'a <- b');

let g = new Probleme('120vw','20vw', 'afficher a', [new Information("a"), new Information("b")]);

document.getElementById('espace1').appendChild(a);
document.getElementById('espace1').appendChild(b);
document.getElementById('espace1').appendChild(c);
document.getElementById('espace1').appendChild(d);
document.getElementById('espace1').appendChild(e);
document.getElementById('espace1').appendChild(f);
document.getElementById('espace1').appendChild(g);

a.afficher(); 
b.afficher();
c.afficher();
d.afficher();
e.afficher();
f.afficher();
g.afficher();

//Couche 1
a._elemParent.lierEnfant(b);
a._elemParent.lierEnfant(c);
//Couche 2
b._elemParent.lierEnfant(d);
b._elemParent.lierEnfant(e);
b._elemParent.lierEnfant(f);

c._elemParent.lierEnfant(g);


function maFonction()
{
    if (!document.getElementById('espace1').classList.contains("cacher")) {
        document.getElementById('espace1').effectuerDictionnaireDesDonnee();
        document.getElementById('espace1').rechercherAnomalies(); 
    }
    setTimeout("maFonction();", 1000);
}


maFonction();
/*

document.getElementById('espace1');

let a = new StructureSi("20vw", "20vw", [new Condition("a = 1"),new Condition("a = 2"),new Condition("a = 3"),new Condition("a = 4"),new Condition("a = 5"),new Condition("a = 6"),new Condition("a = 7"),new Condition("a   = 8")]);
let a = new StructureSwitch("20vw", "20vw", [new Condition("a"),new Condition("t")]);
let b = new Probleme;

document.getElementById('espace1').appendChild(a); 
document.getElementById('espace1').appendChild(b); 

a.afficher();
b.afficher();

a._listeConditions.children[0]._elemParent.lierEnfant(b)
*/

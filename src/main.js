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
document.getElementById('espace1'); 
let a = new Probleme;
let b = new Probleme('0vw','10vw');
let c = new Probleme('50vw','10vw');
let d = new Probleme('0vw','20vw');
let e = new StructureIterativeBornee('0vw', '30vw');
let f = new Probleme('0vw', '40vw');
let s = new StructureSi('80vw', '40vw');

document.getElementById('espace1').appendChild(a); 
document.getElementById('espace1').appendChild(b); 
document.getElementById('espace1').appendChild(c); 
document.getElementById('espace1').appendChild(d); 
document.getElementById('espace1').appendChild(e);
document.getElementById('espace1').appendChild(f);
document.getElementById('espace1').appendChild(s);



a.afficher();
b.afficher();
c.afficher();
d.afficher();
e.afficher();
f.afficher();
s.afficher();

a._elemParent.lierEnfant(b);
a._elemParent.lierEnfant(c);
b._elemParent.lierEnfant(d);
d._elemParent.lierEnfant(e);
e._elemParent.lierEnfant(f);

/*
document.getElementById('espace1');

let a = new StructureSi("20vw", "20vw", [new Condition("a = 1"),new Condition("a = 2"),new Condition("a = 3"),new Condition("a = 4"),new Condition("a = 5"),new Condition("a = 6"),new Condition("a = 7"),new Condition("a   = 8")]);
*/
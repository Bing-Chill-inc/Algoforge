document.getElementById('espace1');

let a = new StructureSi("20vw", "20vw", [new Condition("a == 1"),new Condition("a == 2"),new Condition("a == 3"),new Condition("a == 4"),new Condition("a == 5"),new Condition("a == 6"),new Condition("a == 7")]);
/*let b = new Probleme;
let c = new Probleme('0vw','10vw');
let d = new Probleme('50vw','10vw');
let e = new Probleme('100vw','10vw');
let f = new Probleme('150vw','10vw');
let g = new Probleme('200vw','10vw');
let h = new Probleme('250vw','10vw');
let i = new Probleme('300vw','10vw');*/

document.getElementById('espace1').appendChild(a);
/*document.getElementById('espace1').appendChild(b);
document.getElementById('espace1').appendChild(c);
document.getElementById('espace1').appendChild(d);
document.getElementById('espace1').appendChild(e);
document.getElementById('espace1').appendChild(f);
document.getElementById('espace1').appendChild(g);
document.getElementById('espace1').appendChild(h);
document.getElementById('espace1').appendChild(i);*/

a.afficher();
/*b.afficher();
c.afficher();
d.afficher();
e.afficher();
f.afficher();
g.afficher();
h.afficher();
i.afficher();*/

/*a.
a._elemParent.lierEnfant(c);
a._elemParent.lierEnfant(d);
a._elemParent.lierEnfant(e);
a._elemParent.lierEnfant(f);
a._elemParent.lierEnfant(g);
a._elemParent.lierEnfant(h);
a._elemParent.lierEnfant(i);*/

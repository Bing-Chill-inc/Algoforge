document.getElementById('espace1');

let a = new StructureSi("20vw", "20vw", [new Condition("a=1"),new Condition("sinom")]);
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


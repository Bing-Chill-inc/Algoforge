document.getElementById('espace1'); 
let a = new Probleme;
let b = new Probleme('0vw','10vw');
let c = new Probleme('50vw','10vw');
let d = new Probleme('0vw','20vw');
let e = new StructureIterativeBornee('0vw', '30vw');
let f = new Probleme('0vw', '40vw');

document.getElementById('espace1').appendChild(a); 
document.getElementById('espace1').appendChild(b); 
document.getElementById('espace1').appendChild(c); 
document.getElementById('espace1').appendChild(d); 
document.getElementById('espace1').appendChild(e);
document.getElementById('espace1').appendChild(f);



a.afficher();
b.afficher();
c.afficher();
d.afficher();
e.afficher();
f.afficher();

a._elemParent.lierEnfant(b);
a._elemParent.lierEnfant(c);
b._elemParent.lierEnfant(d);
d._elemParent.lierEnfant(e);
e._elemParent.lierEnfant(f);


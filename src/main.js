document.getElementById('espace1'); 
let a = new Probleme;
let b = new Probleme(0,20);
let c = new Probleme(10,20);
let d = new Probleme(0,40);

document.getElementById('espace1').appendChild(a); 
document.getElementById('espace1').appendChild(b); 
document.getElementById('espace1').appendChild(c); 
document.getElementById('espace1').appendChild(d); 

a.afficher();
b.afficher();
c.afficher();
d.afficher();

a._elemParent.lierEnfant(b);
a._elemParent.lierEnfant(c);


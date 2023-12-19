document.getElementById('espace1');

let a = new StructureSi("20vw", "20vw", [new Condition("a>=1"),new Condition("a<=1"),new Condition("sinon")]);


document.getElementById('espace1').appendChild(a);



a.afficher();

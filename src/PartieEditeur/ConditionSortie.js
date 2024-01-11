class ConditionSortie extends ElementGraphique {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    constructor(abscisse = 0, ordonnee = 0) {
        super(abscisse, ordonnee);
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        // Inutile car géré par le CSS, mais présent pour la cohérence
        return null;
    }

    rechercherAnomalies() {
        let listeAnomalies = [];

        //5
        if(ErreurArretHorsIteratif.detecterAnomalie(this)) {
            listeAnomalies.push(new ErreurArretHorsIteratif(this));
        }

        if(listeAnomalies.length == 0){
            if(ErreurArretIteratifBornee.detecterAnomalie(this)){
                listeAnomalies.push(new ErreurArretIteratifBornee(this));
            }
        }
        let problemeJamaisExecute = AvertissementSProblemeJamaisExecute.detecterAnomalie(this);
        if(problemeJamaisExecute[0]){
            listeAnomalies.push(new AvertissementSProblemeJamaisExecute(this, problemeJamaisExecute[1]));
        }
        
        return listeAnomalies;
    }

    toJSON() {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee
        };
    }
} window.customElements.define("condition-sortie-element", ConditionSortie);

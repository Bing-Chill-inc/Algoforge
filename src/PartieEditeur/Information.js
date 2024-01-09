class Information 
{
    // ATTRIBUTS
    _nom; // String
    _type; // Type
    _signification; // String

    // CONSTRUCTEUR
    constructor(_nom, _type, _signification) {
        this._nom = _nom;
        this._type = _type;
        this._signification = _signification;
    }

    // ENCAPSULATION
    get _nom() {
        return this._nom;
    }

    set _nom(value) {
        this._nom = value;
    }

    get _type() {
        return this._type;
    }

    set _type(value) {
        if(value instanceof Type)
        {
            this._type = value;
        }
    }

    get _signification() {
        return this._signification;
    }

    set _signification(value) {
        this._signification = value;
    }

    // METHODES
    static DetecterLeType(unString)
    {
        const ascii0 = '0'.charCodeAt(0); // code ASCII de '0'
        const ascii9 = '9'.charCodeAt(0); // code ASCII de '9'
        const asciiSeparateur = '.'.charCodeAt(0); // code ASCII de '.' (Séparateur de décimale)
        const asciiSigne = '-'.charCodeAt(0); // code ASCII de '-' (Signe du décimale)
        //Detection boolean
        if(unString.toLowerCase() == "true" || unString.toLowerCase() == "false" || unString.toLowerCase() == "vrai" || unString.toLowerCase() == "faux")
        {
            return "Boolean";
        }

        //Detection char
        if(unString[0] == '\'' && unString[unString.length-1] == '\'' && unString.length == 3)
        {   
            return "Char";
        }

        //Detection String
        if(unString[0] == '"' && unString[unString.length-1] == '"')
        {
            return "String";
        }

        //Dection Nombre
        let containUnPoint = false;
        let isUnsigned = true;
        let isANombre = true;

        for(let i = 0; i < unString.length; i++)
        {
            const courantCodeAscii = unString.charCodeAt(i);
            //Traitement Signe
            if(courantCodeAscii == asciiSigne)
            {
                if(i!=0)
                {
                    isANombre = false;
                }
                isUnsigned = false; 
                continue;
            }
            //Traitement Séparateur
            if(courantCodeAscii == asciiSeparateur)
            {
                if(containUnPoint)
                {
                    // Contient 2 point donc pas un nombre
                    isANombre = false;
                }
                containUnPoint = true;
                if(i==0)
                {
                    // Le point se situ au début pas un nombre
                    isANombre = false;
                }
                continue;
            }
            //Regarde si c'est le char n'est pas un nombre
            if(courantCodeAscii < ascii0 || courantCodeAscii > ascii9)
            {
                isANombre = false;
            }
        }
        if(isANombre)
        {
            if(containUnPoint)
            {
                return "double";
            }
            if(isUnsigned)
            {
                return "unsigned int";
            }
            return "int";
            
        }
        return undefined;
    }

    toJSON() {
        return {
            nom: this._nom,
            type: this._type,
            signification: this._signification
        };
    }
    
}

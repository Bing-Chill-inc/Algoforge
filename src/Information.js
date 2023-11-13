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
    DetecteterLeType(unString)
    {
        const ascii0 = '0'.charCodeAt(0); // code ASCII de '0'
        const ascii9 = '9'.charCodeAt(0); // code ASCII de '9'
        const asciiSeparateur = '.'.charCodeAt(0); // code ASCII de '.' (Séparateur de décimale)

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
        let isANumber = true;
        for(let i = 0; i < unString.length; i++)
        {
            const courantCodeAscii = unString.charCodeAt(i);
            if(courantCodeAscii < ascii0 || courantCodeAscii > ascii9)
            {
                isANumber = false;
            }
        }
        if(isANumber)
        {
            return "Number";
        }

        //Detection Decimal
        let isADecimal = true;
        for(let i = 0; i < unString.length; i++)
        {
            const courantCodeAscii = unString.charCodeAt(i);
            if((courantCodeAscii < ascii0 || courantCodeAscii > ascii9) && courantCodeAscii != asciiSeparateur)
            {
                isADecimal = false;
            }
        }
        if(isADecimal)
        {
            return "Décimale";
        }   


        return "Indéfini";
    }

    toJSON() {
        return {
            nom: this._nom,
            type: this._type,
            signification: this._signification
        };
    }
    
}

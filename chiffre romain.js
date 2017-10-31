// Charles ménard
//  octobre 2017
// romain(chiffre) convertit un entier entre 0 et 3999 en chiffres romains

var repeter = function (n,t){
    chaine = "";
    for (var i=0; i<n; i++) {
        //la fonction ajoute n fois le caractere t a la chaine
        chaine +=t;
    }
    return chaine;
    //retourne le resultat (un string)
};

var chiffre = function (nbreDec, multipleDix, s1, s2, s3){
    var carRomain=""; // on initialise a "" ainsi pas besoin de if pour le cas ou le chiffre est 0
    var nbreExtrait= Math.floor(nbreDec / multipleDix) % 10;
    //on extrait le chiffre correspondant à tel multiple de dix

    // les quatre cas possibles de représentation
    if (nbreExtrait == 9) {
        carRomain= s1+s3;
    }
    else if (nbreExtrait >= 5) {
        carRomain= s2 + repeter((nbreExtrait-5),s1); /* on soustrait 5, comme ça à 5 on rajoute aucun
       I et à huit on a VIII */
    }
    else if (nbreExtrait == 4) {
        carRomain= s1+s2 ;
    }
    else if (nbreExtrait >= 1) {
        carRomain= repeter(nbreExtrait, s1);
    }

    return carRomain; // on retourne le chiffre romain correspondant à un chiffre décimal du nombre original

};

var romain = function(nDecimal){
    var chiffreRomain = "";

    // on passe la fonction chiffre sur chaque chiffre du nombre décimal, en rajoutant le chiffre
    // romain correspondant à la chaine de caractère

    chiffreRomain += chiffre(nDecimal , 1000 , "M", "top", "kek"); // pour mille, les deux derniers caractères n'importent pas
    chiffreRomain += chiffre(nDecimal , 100 , "C", "D", "M") ;
    chiffreRomain += chiffre(nDecimal , 10 , "X", "L", "C") ;
    chiffreRomain += chiffre(nDecimal , 1 , "I", "V", "X");
    return chiffreRomain; //on retourne le chiffre romain en entier
};



var testRomain = function(){ //la fonction de test
    assert(repeter(2,"l")=="ll");
    assert(repeter(0,"r")=="");
    assert(chiffre(1234 , 1000 , "M", "", "") == "M");
    assert(chiffre(456 , 100 , "C", "D", "M") == "CD"); //on teste des chiffres, en n'oubliant pas 0.
    assert(chiffre(78 , 10 , "X", "L", "C") == "LXX");
    assert(chiffre(9 , 1 , "I", "V", "X") == "IX");
    assert(chiffre(8 , 1 , "I", "V", "X") == "VIII");
    assert(chiffre(7 , 1 , "I", "V", "X") == "VII");
    assert(chiffre(6 , 1 , "I", "V", "X") == "VI");
    assert(chiffre(5 , 1 , "I", "V", "X") == "V");
    assert(chiffre(4 , 1 , "I", "V", "X") == "IV");
    assert(chiffre(3 , 1 , "I", "V", "X") == "III");
    assert(chiffre(2 , 1 , "I", "V", "X") == "II");
    assert(chiffre(1 , 1 , "I", "V", "X") == "I");
    assert(chiffre(0 , 1 , "I", "V", "X") == "");
    assert(chiffre(10 , 1 , "I", "V", "X") == "");
    assert(romain(1999)== "MCMXCIX"); // on teste des nombres de diverses longueurs
    assert(romain(254)== "CCLIV");
    assert(romain(27)== "XXVII");
    assert(romain(1000)== "M");
    assert(romain(1)== "I");
    assert(romain(0) == ""); //sans oublier zéro
};
testRomain();

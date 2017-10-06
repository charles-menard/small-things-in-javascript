// Charles ménard

var repeter = function (n,t){
    chaine = "";
    for (var i=0; i<n; i++) {
        chaine +=t;
    }
    return chaine;
};

var chiffre = function (nbreDec, multipleDix, s1, s2, s3){
    var carRomain="";
    var nbreExtrait= Math.floor(nbreDec / multipleDix) % 10;
    
    if (multipleDix==1000){
    	carRomain= repeter(nbreExtrait, "M");
        
    }
    else {
      
        if (nbreExtrait == 9) {
            carRomain= s1+s3;
        }
        else if (nbreExtrait >= 5) {
            carRomain= s2 + repeter((nbreExtrait-5),s1);
        }
        else if (nbreExtrait == 4) {
            carRomain= s1+s2 ;
        }
        else if (nbreExtrait >= 1) {
            carRomain= repeter(nbreExtrait, s1);
        }
    }
    return carRomain;
    
};

var romain = function(nDecimal){
    var chiffreRomain = "";
    chiffreRomain += chiffre(nDecimal , 1000 , "M", "top", "kek"); 
    chiffreRomain += chiffre(nDecimal , 100 , "C", "D", "M") ;
    chiffreRomain += chiffre(nDecimal , 10 , "X", "L", "C") ;
    chiffreRomain += chiffre(nDecimal , 1 , "I", "V", "X");
    return chiffreRomain;
};



var testRomain = function(){
    assert(repeter(2,"l")=="ll");
    
    assert(chiffre(1234 , 1000 , "M", "", "") == "M");
    assert(chiffre(456 , 100 , "C", "D", "M") == "CD");
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
    assert(romain(1247)== "MCCXLVII");
    assert(romain(254)== "CCLIV");
    assert(romain(27)== "XXVII");
    assert(romain(1000)== "M");
    assert(romain(1)== "I");
    assert(romain(0) == "");
};
testRomain();
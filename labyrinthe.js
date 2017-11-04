//Charles Ménard  Dominic Fluet                               T.P.1                                           5 novembre 2017

//donne un nombre entier aléatoire entre 0 et n-1
var nombreAleatoire = function(n){
  var nombre = Math.floor((Math.random()*n)); //j'ai ajouté la fonction pour aider la visibilité certaines lignes en bas
  return nombre;
};
//retourne un tableau contenant les entiers 0, 1, ... jusqu'à n-1
var iota=function(n){
  var t=Array(n);
  for (var i=0; i<n; i++){
    t[i]=i;
  }
  return t;
};
//retourne true, si tab contient x, retourne false autrement
var contient=function(tab,x){
  if (tab.indexOf(x)== -1){
    return false;
  }
  else return true;
};
//fonction qui retourne un tab, égal à tab si x est dans tab mais égal à tab + x si x n'est pas dans tab
var ajouter=function(tab,x){
  if (contient(tab,x)==true){
    return tab;
  }
  var nouveauTab=tab;
  nouveauTab.push(x);
  return nouveauTab;
};
//fonction qui retourne un tableau égal à tab si x n'est pas dans tab et égal à tab-x si x est dans tab
var retirer=function(tab,x){
  if (contient(tab,x)==false){
    return tab;
  }
  var i = tab.indexOf(x);
  var t=[];
  t=t.concat(tab.slice(0,i),tab.slice(i+1,tab.length));
  return t;


};

//la fonction retourne les cellules voisines à la cellule aux coordonnées (x;y)
var voisins=function(x,y,nx,ny){
  var t=[];
  var haut=x+(y-1)*nx; //formule pour le mur du haut
  if (y!=0){
    t.push(haut);
  }
  var bas=x+(y+1)*nx; //formule pour le mur du bas
  if (y!=ny-1){
    t.push(bas);
  }
  var gauche=(x-1)+y*nx; //formule pour le mur gauche/ouest
  if(x !=0){ //on ne mets pas de voisin ouest si le mur est une bordure à gauche
    t.push(gauche);
  }
  var droite=(x+1)+y*nx; //formule pour le mur droite/est
  if (x !=nx-1){ //on ne mets pas de voisin est si le mur est une bordure à droite
    t.push(droite);
  }
  return t;
};

/*La fontion retourne un tableau de l'intersection entre tab et mursN. Ceci est pour qu'on trouve les voisins qui ressortent de
la fonction voisins, mais qui ne font pas partie de la cave.*/
var voisins2=function(tab,mursN){
  var t=[];
  for (var i=0; i<tab.length; i++){
    if (contient(mursN,tab[i]))
    t.push(tab[i]);
  }
  return t;
};

// la fonction retourne la colonne de n dans une grille nx par ny
var colonne=function (n,nx,ny){
  return (n % nx);
};

//Déssine le labyrinthe.
var dessinLaby=function(nx,ny,pas,mursH,mursV){
  pu();
  fd(Math.floor(ny*pas/2),Math.floor(nx*pas/2)); //va se positionner dans le coin nord-ouest de la grille

  for (var i=0; i<mursH.length; i++){ //cette boucle déssine les murs horizontaux
    var j=0; //Le j est pour savoir sur quelle ligne le mur est placé.
    while(true){
      if (mursH[i]>=nx*j && mursH[i]<nx*(j+1)){
        fd(-(j*pas),-(pas*(mursH[i]-j*nx)));
        pd();
        fd(0,-pas);
        pu();
        fd(j*pas,pas*(mursH[i]-j*nx+1));
        break;
      }
      j++;
    }
  }

  for (var i=0; i<mursV.length; i++){ //cette boucle déssine les murs verticaux
    var j=0;
    while(true){
      if (mursV[i]>=j*nx+j && mursV[i]<=nx*(j+1)+j){
        fd(-(pas*j),-(pas*(mursV[i]%(nx+1))));
        pd();
        fd(-pas,0);
        pu();
        fd(pas*(j+1),pas*(mursV[i]%(nx+1)));
        break;
      }
      j++;
    }
  }
};


var genererLaby=function(nx,ny,pas){
  var mursH=iota(nx*(ny+1)); //Un tableau des murs horizontaux.
  var mursV=iota((nx+1)*ny); //Un tableau des murs verticaux.
  var mursN=iota(nx*ny); //Un tableau des murs Nord, ou bien des cellules. Ce tableau représente plus tard les cellules
  // pas dans la cave.
  var xAl=nombreAleatoire(nx); //Un x aléatoire pour la première cellule de la cave.
  var yAl=nombreAleatoire(ny); //Un y aléatoire pour la première cellule de la cave.
  var cave=[xAl+yAl*nx]; //La cellule en fonction des x et y aléatoires.
  var mursHCave=[xAl+yAl*nx, xAl+(yAl+1)*nx]; //Un tableau des murs horizontaux de la cave.
  var mursVCave=[xAl+yAl*(nx+1), 1+xAl+yAl*(nx+1)]; //Un tableau des murs verticaux de la cave.
  var front=voisins(xAl,yAl,nx,ny); //Le front (cellules voisines de la cave).
  mursN=retirer(mursN,xAl+yAl*nx); //On enlève la cellule de la cave de les cellules pas dans la cave.

  while (mursN.length!=0){ //Continue jusqu'au temps que tous les cellules sont dans la cave.
  var ajoutCave=front[nombreAleatoire(front.length)]; //On choisie une cellule arbitraire du front pour ajouter à la cave
  //et l'enlever un murs qu'elle partagent avec la cave.
  cave.push(ajoutCave); //On la mets dans la cave.
  front=retirer(front,ajoutCave); //On l'enlève du front.
  mursN=retirer(mursN,ajoutCave); //On l'enlève des cellules qui ne sont pas dans la cave.
  xAl=colonne(ajoutCave,nx,ny); //On trouve le x de la cellule.
  yAl=(ajoutCave-xAl)/nx; //On trouve le y de la cellule.
  var voisinsAjoutCave=voisins(xAl,yAl,nx,ny); //On trouve ces voisines.
  voisinsAjoutCave=voisins2(voisinsAjoutCave,mursN); //On trouve les voisines qui ne sont pas dans la cave.

  for (var i=0; i<voisinsAjoutCave.length;i++){
    front=ajouter(front,voisinsAjoutCave[i]); //On ajoute ces voisines, qui ne le sont pas déjà, dans le front.
  }

  var mursHAjoutCaveEtCave=[]; //Tableau des murs horizontaux partagés par la cellule et la cave.
  var mursVAjoutCaveEtCave=[]; //Tableau des murs verticaux partagés par la cellule et la cave.
  var murN=xAl+yAl*nx;
  var murS=xAl+(yAl+1)*nx;
  var murO=xAl+yAl*(nx+1);
  var murE=1+xAl+yAl*(nx+1);
  if (contient(mursHCave,murN)){
    mursHAjoutCaveEtCave.push(murN);
  }
  if (contient(mursHCave,murS)){
    mursHAjoutCaveEtCave.push(murS);
  }
  if (contient(mursVCave,murO)){
    mursVAjoutCaveEtCave.push(murO);
  }
  if (contient(mursVCave,murE)){
    mursVAjoutCaveEtCave.push(murE);
  }
  if (mursVAjoutCaveEtCave.length==0){ //Enlève un mur horizontale partagé entre la cellule et la cave aléatoirement de
    //les murs horizontaux à dessiner si elles ne partagent pas de murs verticaux.
    mursH=retirer(mursH,mursHAjoutCaveEtCave[nombreAleatoire(mursHAjoutCaveEtCave.length)]);
  }
  else if (mursHAjoutCaveEtCave.length==0){ //Enlève un mur verticale partagé entre la cellule et la cave aléatoirement de
    //les murs verticaux à dessiner si elles ne partagent pas de murs horizontaux.
    mursV=retirer(mursV,mursVAjoutCaveEtCave[nombreAleatoire(mursVAjoutCaveEtCave.length)]);
  }
  else{ //Si elles partagent des murs horizontaux et des murs verticaux.
    var hOuV=nombreAleatoire(2); //On decide aléatoirement si on enlève un mur horizontale ou verticale.
    if (hOuV==0)
    mursH=retirer(mursH,mursHAjoutCaveEtCave[nombreAleatoire(mursHAjoutCaveEtCave.length)]);
    else
    mursV=retirer(mursV,mursVAjoutCaveEtCave[nombreAleatoire(mursVAjoutCaveEtCave.length)]);
  }
  mursHCave=ajouter(mursHCave,xAl+yAl*nx); //On ajoute les murs de la cellule dans les murs de la cave.
  mursHCave=ajouter(mursHCave,xAl+(yAl+1)*nx);
  mursVCave=ajouter(mursVCave,xAl+yAl*(nx+1));
  mursVCave=ajouter(mursVCave,1+xAl+yAl*(nx+1));
}
mursH=retirer(mursH,0); //On supprime l'entrée.
mursH=retirer(mursH,nx*(ny+1)-1); //On supprime la sortie.
var mursTotaux= [mursH, mursV];
return mursTotaux;
};

var laby=function (nx,ny,pas){
  var murs = genererLaby(nx,ny,pas);
  dessinLaby(nx,ny,pas,murs[0],murs[1]);

};

//le code plus bas sert à la résolution du labyrinthe

//retourne la nouvelle cellule après le déplacement dans la direction d
var move = function (nx, cellule, d){ // d est la direction en degré en partant du nord dans le sens des aiguille d'une montre
  if (d == 0){ //nord
    cellule -= nx;
  }
  else if (d == 180){ //sud
    cellule+=nx;
  }
  else if (d == 90){ //est
    ++cellule;
  }
  else if (d == 270){ //ouest
    --cellule;
  }
  return cellule;
};

//retourne un booléen, faux s'il n'y a pas de murs devant, vrai sinon
var detecterMurDevant= function (nx,c, mursH, mursV, direction){ //c est la cellule actuelle
  if (direction ==  0){ // si on se déplace vers le nord
    if (contient(mursH, c)){ //le mur nord
      return true;
    }
  }
  else if (direction == 90){ //si on se déplace vers le l'est
    if(contient(mursV, c+1+Math.floor(c/nx))){ //si mursV contient le mur est, retourne vrai
      return true;
    }
  }
  else if (direction== 180){ // si on se déplace vers le sud
    if (contient(mursH, c+nx)){ //formule pour le mur sud
      return true;
    }
  }
  else if(direction == 270){ // vers l'ouest
    if (contient(mursV, c+Math.floor(c/nx))){ //le mur ouest
      return true;
    }
  }
  return false;
};
//retourne vrai s'il y a un mur à la droite relativement au déplacement, faux sinon
var detecterMurDroite= function (nx,c, mursH, mursV, direction){
  if(direction == 0){//si on voyage vers le nord
    if(contient(mursV, c+1+Math.floor(c/nx))){ //mur est
      return true;
    }
  }
  else if (direction == 90){// si on voyage vers l'est
    if(contient(mursH, c+nx)){ //mur sud
      return true;
    }
  }
  else if (direction == 180){ //voyage vers le sud
    if (contient(mursV, c+Math.floor(c/nx))){ // murs ouest
      return true;
    }
  }
  else if(direction == 270){
    if(contient(mursH, c)) {// le mur nord
      return true;
    }
  }
  return false;
  };
// retourne la nouvelle direction après une rotation, les paramètres sont en degrés
var rotation = function (direction, theta){
  var nouvelleDirection= (direction + theta) % 360;
  if (nouvelleDirection < 0){
    nouvelleDirection += 360;
  }
  return nouvelleDirection;

};


var labySol=function(nx,ny,pas){
  var murs = genererLaby(nx,ny,pas); // on génère un labyrinthe
  var mursH = murs[0];
  var mursV = murs[1];
  var cActuelle = 0; //on est en haut à gauche
  var direction = 180 ;// on initialise la direction à 180 degrés, au sud (on compte dans le sens des aiguilles d'une montre)
  var compteur = 0; // le compteur de virage de l'algorithme de pledge
  var celluleSortie = (nx*ny)-1;
  dessinLaby(nx,ny,pas,mursH, mursV);
  ajouter(mursH, 1); //on bouche l'entrée pour que l'algorithme de pledge ne sorte pas pas l'entrée

  rt(180);// on place la tortue dans la première cellule et on mets le pinceau en rouge
  fd(pas/2, pas/2);
  pd();
  setpc(1,0,0);
  pledge:
  while (true){// algorithme de pledge
    while(!detecterMurDevant(nx,cActuelle, mursH, mursV, direction) && cActuelle != celluleSortie ){
      cActuelle=move(nx,cActuelle, direction); // 1ère étape de pledge : aller tout droit jusqu'au mur
      if (cActuelle == celluleSortie) break pledge;
      fd(pas);
    }

    do{ //2ème étape de pledge :suivre le mur à droite
      murDroite :
      while(detecterMurDroite(nx,cActuelle, mursH, mursV, direction)){ //tant qu'il y a un mur à droite
        if(!detecterMurDevant(nx,cActuelle, mursH, mursV, direction)){
          cActuelle=move(nx,cActuelle, direction);
          if (cActuelle == celluleSortie) break pledge;
          fd(pas);
        }
        if (!detecterMurDroite(nx,cActuelle, mursH, mursV, direction)){
          break murDroite;
        }
        while(detecterMurDevant(nx,cActuelle, mursH, mursV, direction)){ //s'il y a un mur devant
          lt(90);
          direction= rotation(direction,-90);
          compteur++;
        }
      }
      rt(90);
      direction= rotation(direction,90);
      compteur--;
      cActuelle=move(nx,cActuelle, direction);
      if (cActuelle == celluleSortie) break pledge;
      fd(pas);
    } while(compteur != 0);
  }
};

//TEST
var iotaTest = function(){
  assert(iota(0) == ""); // le tableau vide
  assert(iota(1)=="0");
  assert(iota(10)=="0,1,2,3,4,5,6,7,8,9");
};
var contientTest = function(){
  var tab = [0,1,2,3,4,5,6,7,8,909,100];
  var tab2 =[];
  assert(contient(tab, 9)==false);
  assert(contient(tab, 0)==true);
  assert(contient(tab, 100)==true);
  assert(contient(tab2, "")==false); //un cas spécial
  assert(contient(tab2, 1)==false);
};
var ajouterTest = function(){
  assert(ajouter([1,2,3],5)=="1,2,3,5"); // un cas ou il y a quelque chose à ajouter
  assert(ajouter([],1)=="1");
  assert(ajouter([1,2,3],1)=="1,2,3"); //ici il n'y a rien à ajouter
  assert(ajouter([1,2,3],""=="1,2,3"));  //rien à ajouter, cas spécial
};
var retirerTest = function(){
  assert(retirer([1,2,3],5)=="1,2,3");
  assert(retirer([],1)=="");
  assert(retirer([1,2,3],1)=="2,3");
};
var colonneTest = function(){
  assert(colonne(0,8,4)== 0);
  assert(colonne(1,8,4)== 1);
  assert(colonne(2,8,4)== 2);
  assert(colonne(11,8,4)== 3);
  assert(colonne(31,8,4)== 7);
  assert(colonne(0,1,1)== 0);
  assert(colonne(15,10,10)== 5);
  assert(colonne(15,4,4)== 3);
};
var voisinsTest = function(){
  assert(voisins(0,0, 8,4) == "8,1"); //coin en haut gauche
  assert(voisins(2,2, 8,4) == "10,26,17,19"); // centre
  assert(voisins(0,0,1,1)==""); // grille minimale pas de voisins
  assert(voisins(7,0,8,4)== "15,6"); // bordure droite
  assert(voisins(2,3,8,4)== "18,25,27");
  assert(voisins (0,2, 8 ,4) == "8,24,17");
};


var detecterMursTest= function(){ // on teste les deux fonctions de détection de murs
  var mursH= [1,2,3,5,6,7,15,16,17,18];// labyrinthe 4x4 pour tester
  var mursV=[0,4,5,6,8,9,10,11,12,14,15,17,19];
  assert(detecterMurDevant(4,6,mursH, mursV, 0)== true);
  assert(detecterMurDevant(4,6,mursH, mursV, 90)== true);
  assert(detecterMurDevant(4,6,mursH, mursV, 180)== false);
  assert(detecterMurDevant(4,6,mursH, mursV, 270)== false);
  assert(detecterMurDroite(4,7,mursH, mursV, 0)== true);
  assert(detecterMurDroite(4,7,mursH, mursV, 90)== false);
  assert(detecterMurDroite(4,7,mursH, mursV, 180)== true);
  assert(detecterMurDroite(4,7,mursH, mursV, 270)== true);

};

voisinsTest();
iotaTest();
contientTest();
ajouterTest();
retirerTest();
colonneTest();
detecterMursTest();

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
  var inclus=false;
  for (var i=0; i<tab.length; i++){
    if (tab[i]==x){
      inclus=true;
      break;
    }
  }
  return inclus;
};
//fonction qui retourne un tab, égal à tab si x est dans tab mais égal à tab + x si x n'est pas dans tab
var ajouter=function(tab,x){ //sur le forum il semblait dire qu'il voulait une fonction qui modifie pas le tableau original
  if (contient(tab,x)==true){
    return tab;
  }
  var nouveauTab=tab; //donc j'ai modifié pour que ça retourne une copie
  nouveauTab.push(x);
  return nouveauTab;
};
//fonction qui retourne un tableau égal à tab si x n'est pas dans tab et égal à tab-x si x est dans tab
var retirer=function(tab,x){
  if (contient(tab,x)==false){
    return tab;
  }
  for (var i=0; i<tab.length; i++){
    if (tab[i]==x){
      var t=[];
      t=t.concat(tab.slice(0,i),tab.slice(i+1,tab.length));
      return t;
    }
  }
};

var voisins=function(x,y,nx,ny,mursN){
  var t=[];
  var haut=x+(y-1)*nx; //formule pour le mur du haut
  if (contient(mursN,haut)){
    t.push(haut);
  }
  var bas=x+(y+1)*nx; //formule pour le mur du bas
  if (contient(mursN,bas)){
    t.push(bas);
  }
  var gauche=(x-1)+y*nx; //formule pour le mur gauche/ouest
  if(x !==0 && contient(mursN,gauche)){ //on ne mets pas de voisin ouest si le mur est une bordure à gauche
    t.push(gauche);
  }
  var droite=(x+1)+y*nx; //formule pour le mur droite/est
  if (x !==nx-1 && contient(mursN,droite)){ //on ne mets pas de voisin est si le mur est une bordure à droite
    t.push(droite);
  }
  return t;
};
// la fonction retourne la colonne de n dans une grille nx par ny
/*
var xMursN=function(n,nx,ny){
  var i=0;
  while(true){
    if (n%nx==i){
      return i;
    }
    i++;
  }
}; */
// suggestion plus élégante pour remplacer xMursN, plus  je l'ai aussi remplacé dans laby
var colonne=function (n,nx,ny){
  return (n % nx);
};



var laby=function(nx,ny,pas){
  var mursH=iota(nx*(ny+1));
  var mursV=iota((nx+1)*ny);
  var mursN=iota(nx*ny);
  var coordX=iota(nx);
  var coordY=iota(ny);
  var xAl=nombreAleatoire(nx);
  var yAl=nombreAleatoire(ny);
  var cave=[xAl+yAl*nx];
  var mursHCave=[xAl+yAl*nx, xAl+(yAl+1)*nx];
  var mursVCave=[xAl+yAl*(nx+1), 1+xAl+yAl*(nx+1)];
  var front=voisins(xAl,yAl,nx,ny,mursN);
  mursN=retirer(mursN,xAl+yAl*nx);

  while (mursN.length!=0){
    var ajoutCave=front[nombreAleatoire(front.length)];
    cave.push(ajoutCave);
    front=retirer(front,ajoutCave);
    mursN=retirer(mursN,ajoutCave);
    xAl=colonne(ajoutCave,nx,ny);
    yAl=(ajoutCave-xAl)/nx;
    var voisinsAjoutCave=voisins(xAl,yAl,nx,ny,mursN);
    for (var i=0; i<voisinsAjoutCave.length;i++){
      front=ajouter(front,voisinsAjoutCave[i]);
    }
    var mursHAjoutCaveEtCave=[];
    var mursVAjoutCaveEtCave=[];
    if (contient(mursHCave,xAl+yAl*nx)){
      mursHAjoutCaveEtCave.push(xAl+yAl*nx);
    }
    if (contient(mursHCave,xAl+(yAl+1)*nx)){
      mursHAjoutCaveEtCave.push(xAl+(yAl+1)*nx);
    }
    if (contient(mursVCave,xAl+yAl*(nx+1))){
      mursVAjoutCaveEtCave.push(xAl+yAl*(nx+1));
    }
    if (contient(mursVCave,1+xAl+yAl*(nx+1))){
      mursVAjoutCaveEtCave.push(1+xAl+yAl*(nx+1));
    }
    if (mursVAjoutCaveEtCave.length==0){
      mursH=retirer(mursH,mursHAjoutCaveEtCave[nombreAleatoire(mursHAjoutCaveEtCave.length)]);
    }
    else if (mursHAjoutCaveEtCave.length==0){
      mursV=retirer(mursV,mursVAjoutCaveEtCave[nombreAleatoire(mursVAjoutCaveEtCave.length)]);
    }
    else{
      var hOuV=nombreAleatoire(2);
      if (hOuV==0)
      mursH=retirer(mursH,mursHAjoutCaveEtCave[nombreAleatoire(mursHAjoutCaveEtCave.length)]);
      else
      mursV=retirer(mursV,mursVAjoutCaveEtCave[nombreAleatoire(mursVAjoutCaveEtCave.length)]);
    }
    mursHCave=ajouter(mursHCave,xAl+yAl*nx);
    mursHCave=ajouter(mursHCave,xAl+(yAl+1)*nx);
    mursVCave=ajouter(mursVCave,xAl+yAl*(nx+1));
    mursVCave=ajouter(mursVCave,1+xAl+yAl*(nx+1));
  }
  mursH=retirer(mursH,0);
  mursH=retirer(mursH,nx*(ny+1)-1);
  pu();
  fd(Math.floor(ny*pas/2),Math.floor(nx*pas/2)); //va se positionner dans le coin nord-ouest de la grille

  for (var i=0; i<mursH.length; i++){ //cette boucle imprime les murs horizontaux
    var j=0;
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
  for (var i=0; i<mursV.length; i++){ //cette boucle imprime les murs verticaux
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
iotaTest();
contientTest();
ajouterTest();
retirerTest();
colonneTest();

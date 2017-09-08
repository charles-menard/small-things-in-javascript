
; dessine des pixels blancs avec le bouton gauche de la souris, 
;enregistre un fichier avec les pixels si on pèse sur espace, quitte si on pèse sur escape
; la création du fichier n'est pas de moi
org 100h

xor ax,ax
xor bx,bx
xor cx,cx
xor dx,dx

start:

mov al,13h
int 10h

click:
mov ah,1h
int 16h
cmp al,32
jz save
cmp al,50
jz exit

souris:
mov ax,3 ; vérifie si le bouton est enfoncer
int 33h
push dx
mov ax,cx
mov cx,2
xor dx,dx
div cx
mov cx,ax  
pop dx
cmp bx,1
jz createpixel
jmp click

createpixel:
mov al,16h
mov ah,0ch
int 10h
jmp click


save:
xor ax,ax
xor bx,bx
xor cx,cx
xor dx,dx

rowloop:
inc dx ; pour faire descendre dune rangé
cmp dx,201
jz createfile
xor cx,cx ; pour remettre les colonne ;à 0
	columnloop:
	inc cx
	cmp cx,321  
	jz rowloop            ; A RETRAVAILLER
	mov ah,0dh
	int 10h
	add al,44 ; pour avoir une vraie lettre
	inc bx
	mov [couleurpixel+bx],al
	jmp columnloop
	
createfile:
xor ax,ax
;Create File: 
MOV AH,3CH         ;Use INT 21H and AH=3CH to createe a file and get it's file handle. 
xor cx,cx           ;0-Normal,1-ReadOnly,2-Hide,3-ReadOnly&Hide,4-System,5-System&ReadOnly,6-System&Hide,7-System&ReadOnly&Hide 
MOV DX,FILELOCATION ;Pass the string of the filename to DX.It means the program passes the filename to DS:DX. 
INT 21H 

MOV BX,AX          ;Now,we had better copy the file handle to BX.Because we will write a file soon and BX's function is storing the file handle. 
;Write Filelocation: 
MOV AH,40H        ;Use INT 21H and AH=40H to write a file. 
MOV CX,64001       ;This is the length of the string. 
MOV DX,couleurpixel     ;Pass the string to DX.It means the program passes the string to DS:DX and write it to your file. 
INT 21H              ;Do as we command:write the string to the file we want to write. 
                         ;If we succeeded,we can get the real length of the string from AX. 
                         ;If we failed,we can get the ERROE CODE from AX. 
;Close File: 
MOV AH,3EH        ;Use INT 21H and AH=3EH to close a file. 
INT 21H              ;Do as we command:close the file. 
                         ;If we failed,we can get the ERROE CODE from AX. 
;Exit: 
exit:
mov ax,4C00h
int 21h           ;Exit 

editeur:

couleurpixel db 64001 dup 0
 
FILELOCATION DB 'C:\FASM\image.txt'

msg db 'Entrez le nom du fichier',24h
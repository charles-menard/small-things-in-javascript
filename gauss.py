import re

_digits = re.compile('\d')
def contains_digits(d):
    return bool(_digits.search(d))
def split_list(alist, wanted_parts=1):
    length = len(alist)
    return [ alist[i*length // wanted_parts: (i+1)*length // wanted_parts] 
             for i in range(wanted_parts) ]


linearSystem = input ("Entrez votre système en séparant les équations par ; \n" )
listOfVariables=[]
for x in linearSystem:
    if x.isalpha() and x not in listOfVariables:
        
        listOfVariables.append(x)

listOfVariables.sort()
numberOfVariables=len(listOfVariables)
coefficientMatrix=[]
linearSystem=linearSystem.split(";")

for equation in linearSystem:
 
    for variable in listOfVariables:
        match = re.search("[+-]?\d?.?\d*"+ variable, equation)
        #"([+-].+?)([a-Z]+)
        if match:
            if contains_digits(match.group(0)):
                coefficientMatrix.append(float(match.group(0)[:-1]))
            else :
               coefficientMatrix.append(float(match.group(0)[:-1]+"1")) 
        else:
            coefficientMatrix.append(float(0))
       
    equalsTo=re.search("=+[+-]?\d+.?\d*", equation)
    coefficientMatrix.append(float(equalsTo.group(0)[1:]))

numberOfEquations=len(linearSystem)
coefficientMatrix= split_list(coefficientMatrix, wanted_parts=numberOfEquations)

#for line in coefficientMatrix :
    
 #   i==0y
  #  while line[i]==0:
   #     numberOfZeros+=1
   # line.append(numberOfZeros)

#coefficientMatrix.sort(key=lambda x: x[numberOfVariables+1])
        

print (listOfVariables)
print (linearSystem)
print (coefficientMatrix)

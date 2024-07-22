function adicionaMatriz(){
    let div = document.createElement("div");
    div.setAttribute("class","adicionaMatriz");
    div.innerHTML = `
        <label for="linhas" class="labelLinha">Linhas ${alfabeto[letra]}:</label>
        <input type="number" name="linhas" id="linhas">
        <label for="colunas">Colunas ${alfabeto[letra]}:</label>
        <input type="number" name="colunas" id="colunas">
    `;
    letra++;
    if(document.querySelectorAll(".adicionaMatriz").length == 1){
        let button = document.createElement("button");
        button.setAttribute("onclick","tiraMatriz();");
        button.setAttribute("id","menos");
        button.innerHTML = "-";
        document.querySelector(".inicio").appendChild(button);
    }
    document.querySelector('.inicio').insertBefore(div,document.querySelector('#mais'));
}
function tiraMatriz(){
    let divs = document.querySelectorAll(".adicionaMatriz");
    let div = divs[divs.length-1];
    div.remove();
    if(document.querySelectorAll(".adicionaMatriz").length == 1){
        document.querySelector("#menos").remove();
    }
}
function pegaMatriz(letra){
    let matriz = [];
    for(let i = 0; i < matrizes.length; i++){
        if(matrizes[i][2] == letra){
            let elementMatriz = document.querySelectorAll(".matriz")[i].lastElementChild.children;
            for(let j = 0; j < elementMatriz.length; j++){
                matriz.push([]);
                for(let l = 0; l < elementMatriz[j].children.length; l++){
                    matriz[j].push(Number(elementMatriz[j].children[l].value));
                }
            }
            break;
        }
    }
    return matriz;
}
function enviarMatrizes(){
    let divs = document.querySelectorAll(".adicionaMatriz");
    let linhas = document.querySelectorAll("#linhas");
    let colunas = document.querySelectorAll("#colunas");
    let labels = document.querySelectorAll(".labelLinha");
    let tof = true;
    for( i = 0; i < divs.length; i++){
        if(linhas[i].value > 0 && colunas[i].value > 0){
            matrizes.push([Number(linhas[i].value),Number(colunas[i].value),labels[i].innerHTML.charAt(labels[i].innerHTML.indexOf(":")-1)]);
        }
        else{
            alert("Faltam valores.");
            matrizes = [];
            tof = false;
            break;
        }
    }
    if(tof){
        document.querySelector('.inicioMaior').remove();
        criaCalculadora();
    }
}
function criaCalculadora(){
    let div = document.createElement("div");
    div.setAttribute("class","calculadora");
    document.body.appendChild(div);
    let divMatrizes = document.createElement("div");
    divMatrizes.setAttribute("class","divMatrizes");
    div.appendChild(divMatrizes);
    for(let i = 0; i < matrizes.length; i++){
        let matriz = document.createElement("div");
        matriz.setAttribute("class","matriz");
        div.appendChild(matriz);
        matriz.innerHTML = `
            ${matrizes[i][2]}:
            <div class="inputsMatriz"></div>
        `;
        let inputsMatriz = document.querySelectorAll(".inputsMatriz")[i];
        for(let j = 0; j < matrizes[i][0]; j++){
            let linhaInputs = document.createElement("div");
            linhaInputs.setAttribute("class","linhaInputs");
            for(let l = 0; l < matrizes[i][1]; l++){
                let input = document.createElement("input");
                input.setAttribute("value","0");
                input.setAttribute("type","number");
                linhaInputs.appendChild(input);
            }
            inputsMatriz.appendChild(linhaInputs);
        }
    }

    let divFuncoes = document.createElement("div");
    divFuncoes.setAttribute("class","divFuncoes");
    div.appendChild(divFuncoes);

    let inputConta = document.createElement("input");
    inputConta.setAttribute("class","inputConta");
    inputConta.setAttribute("oninput","testaConta();");
    divFuncoes.appendChild(inputConta);

    let buttonEnviar = document.createElement("button");
    buttonEnviar.setAttribute("class","buttonEnviar");
    buttonEnviar.setAttribute("onclick","zeraResultado();calcula();");
    buttonEnviar.innerHTML = "Calcular";
    divFuncoes.appendChild(buttonEnviar);

    let divTransposta = document.createElement("div");
    divTransposta.setAttribute("class","divFuncao");
    divFuncoes.appendChild(divTransposta);
    let buttonTransposta = document.createElement("button");
    buttonTransposta.setAttribute("class","buttonFuncao");
    buttonTransposta.setAttribute("onclick","zeraResultado();transposta();");
    buttonTransposta.innerHTML = "Transposta de ";
    divTransposta.appendChild(buttonTransposta);
    let selectTransposta = document.createElement("select");
    selectTransposta.setAttribute("class","selectFuncao");
    selectTransposta.setAttribute("id","selectTransposta");
    for(let i = 0; i < matrizes.length; i++){
        let option = document.createElement("option");
        option.setAttribute("value",matrizes[i][2]);
        option.innerHTML = matrizes[i][2];
        selectTransposta.appendChild(option);
    }
    divTransposta.appendChild(selectTransposta);

    let divInversa = document.createElement("div");
    divInversa.setAttribute("class","divFuncao");
    divFuncoes.appendChild(divInversa);
    let buttonInversa = document.createElement("button");
    buttonInversa.setAttribute("class","buttonFuncao");
    buttonInversa.setAttribute("onclick","zeraResultado();inversa();");
    buttonInversa.innerHTML = "Inversa de ";
    divInversa.appendChild(buttonInversa);
    let selectInversa = document.createElement("select");
    selectInversa.setAttribute("class","selectFuncao");
    selectInversa.setAttribute("id","selectInversa");
    for(let i = 0; i < matrizes.length; i++){
        if(matrizes[i][0] == matrizes[i][1] && matrizes[i][0]<=3){
            let option = document.createElement("option");
            option.setAttribute("value",matrizes[i][2]);
            option.innerHTML = matrizes[i][2];
            selectInversa.appendChild(option);
        }
    }
    divInversa.appendChild(selectInversa);

    let divDeterminante = document.createElement("div");
    divDeterminante.setAttribute("class","divFuncao");
    divFuncoes.appendChild(divDeterminante);
    let buttonDeterminante = document.createElement("button");
    buttonDeterminante.setAttribute("class","buttonFuncao");
    buttonDeterminante.setAttribute("onclick","zeraResultado();resultado(determinante());");
    buttonDeterminante.innerHTML = "Determinante de ";
    divDeterminante.appendChild(buttonDeterminante);
    let selectDeterminante = document.createElement("select");
    selectDeterminante.setAttribute("class","selectFuncao");
    selectDeterminante.setAttribute("id","selectDeterminante");
    for(let i = 0; i < matrizes.length; i++){
        if(matrizes[i][0] == matrizes[i][1] && matrizes[i][0]<=3){
            let option = document.createElement("option");
            option.setAttribute("value",matrizes[i][2]);
            option.innerHTML = matrizes[i][2];
            selectDeterminante.appendChild(option);
        }
    }
    divDeterminante.appendChild(selectDeterminante);

    let divIdentidade = document.createElement("div");
    divIdentidade.setAttribute("class","divFuncao");
    divFuncoes.appendChild(divIdentidade);
    let buttonIdentidade = document.createElement("button");
    buttonIdentidade.setAttribute("class","buttonFuncao");
    buttonIdentidade.setAttribute("onclick","zeraResultado();identidade();");
    buttonIdentidade.innerHTML = "Identidade de Ordem";
    divIdentidade.appendChild(buttonIdentidade);
    let inputIdentidade = document.createElement("input");
    inputIdentidade.setAttribute("class","inputFuncao");
    inputIdentidade.setAttribute("id","inputIdentidade");
    inputIdentidade.setAttribute("type","number");
    divIdentidade.appendChild(inputIdentidade);

    let divTriangular = document.createElement("div");
    divTriangular.setAttribute("class","divFuncao");
    divFuncoes.appendChild(divTriangular);
    let buttonTriangular = document.createElement("button");
    buttonTriangular.setAttribute("class","buttonFuncao");
    buttonTriangular.setAttribute("onclick","zeraResultado();triangular();");
    buttonTriangular.innerHTML = "Triangular de Ordem";
    divTriangular.appendChild(buttonTriangular);
    let inputTriangular = document.createElement("input");
    inputTriangular.setAttribute("class","inputFuncao");
    inputTriangular.setAttribute("id","inputTriangular");
    inputTriangular.setAttribute("type","number");
    divTriangular.appendChild(inputTriangular);
}
function resultado(matriz){
    let div = document.createElement("div");
    div.setAttribute("class","divResultado");
    document.querySelector(".calculadora").appendChild(div);
    for(let i = 0; i < matriz.length; i++){
        let linhaResultado = document.createElement("p");
        for(let j = 0; j < matriz[i].length; j++){
            linhaResultado.innerHTML += matriz[i][j] + " ";
        }
        div.appendChild(linhaResultado);
    }
}
function zeraResultado(){
    if(restof){
        document.querySelector(".divResultado").remove();
    }
    else{
        restof = true;
    }
}
function transposta(){
    let matriz = pegaMatriz(document.querySelector("#selectTransposta").value);
    let transposta = [];
    for(let i = 0; i < matriz[0].length; i++){
        transposta.push([]);
        for(let j = 0; j < matriz.length; j++){
            transposta[i][j] = matriz[j][i];
        }
    }
    resultado(transposta);
}
function determinante(matriz){
    let determinante = 0;
    if(matriz == undefined){
        matriz = pegaMatriz(document.querySelector("#selectDeterminante").value);
    }
    if(matriz.length == 1){
        determinante = matriz[0][0];
    }
    else if(matriz.length == 2){
        determinante = matriz[0][0]*matriz[1][1]-matriz[0][1]*matriz[1][0];
    }
    else if(matriz.length == 3){
        matriz.push(matriz[0]);
        matriz.push(matriz[1]);
        for(let j = 0; j < 3; j++){
            determinante += matriz[j][0]*matriz[j+1][1]*matriz[j+2][2];
        }
        for(let j = 0; j < 3; j++){
            determinante -= matriz[j][2]*matriz[j+1][1]*matriz[j+2][0];
        }
    }
    return [[determinante]];
}
function inversa(){
    let matriz = pegaMatriz(document.querySelector("#selectInversa").value);
    let inversa = [[],[]];
    if(determinante(matriz)[0][0]!=0){
        inversa[1][0] = matriz[1][0]/(matriz[0][1]*matriz[1][0]-matriz[1][1]*matriz[0][0]);
        inversa[0][1] = matriz[0][1]/(matriz[0][1]*matriz[1][0]-matriz[1][1]*matriz[0][0]);
        inversa[0][0] = ((-1)*matriz[1][1])/(matriz[0][1]*matriz[1][0]-matriz[1][1]*matriz[0][0]);
        inversa[1][1] = 1/((-1)*matriz[1][0]*matriz[0][1]+matriz[0][0]*matriz[1][1]);
        console.log(inversa);
    }
    else{
        alert("Esta matriz não tem inversa pois seu determinante é 0.");
    }
}
function identidade(){
    let ordem = document.querySelector('#inputIdentidade').value;
    let matriz = [];
    for(let i = 0; i < ordem; i++){
        matriz.push([]);
        for(let j = 0; j < ordem; j++){
            matriz[i].push(0);
        }
    }
    for(let i = 0; i < ordem; i++){
        matriz[i][i] = 1;
    }
    resultado(matriz);
}
function triangular(){
    let ordem = document.querySelector('#inputTriangular').value;
    let matriz = [];
    for(let i = 0; i < ordem; i++){
        matriz.push([]);
        for(let j = 0; j < ordem; j++){
            matriz[i].push(0);
        }
    }
    let n = Math.floor(Math.random()*4);
    if(n == 0){
        for(let i = 0; i < ordem; i++){
            for(let j = i; j < ordem; j++){
                matriz[i][j] = Math.ceil(Math.random()*9);
            }
        }
    }
    else if(n == 1){
        for(let i = 0; i < ordem; i++){
            for(let j = 0; j < 1+i; j++){
                matriz[i][j] = Math.ceil(Math.random()*9);
            }
        }
    }
    else if(n == 2){
        for(let i = 0; i < ordem; i++){
            for(let j = ordem-i-1; j < ordem; j++){
                matriz[i][j] = Math.ceil(Math.random()*9);
            }
        }
    }
    else if(n == 3){
        for(let i = 0; i < ordem; i++){
            for(let j = 0; j < ordem-i; j++){
                matriz[i][j] = Math.ceil(Math.random()*9);
            }
        }
    }
    resultado(matriz);
}
function multiplica(matrizA,matrizB){
    if(matrizA[0].length == matrizB.length){
        let matrizNova = [];
        for(let i = 0; i < matrizA.length; i++){
            matrizNova.push([]);
            for(let j = 0; j < matrizB[0].length; j++){
                matrizNova[i][j] = 0;
                for(let l = 0; l < matrizB.length; l++){
                    matrizNova[i][j] += matrizA[i][l]*matrizB[l][j];
                }
            }
        }
        return matrizNova;
    }
    else{
        return false;
    }
}
function soma(matrizA,matrizB){
    if(matrizA.length == matrizB.length && matrizA[0].length == matrizB[0].length){
        for(let i = 0; i < matrizA.length; i++){
            for(let j = 0; j < matrizA[0].length; j++){
                matrizA[i][j]+=matrizB[i][j];
            }
        }
        return matrizA;
    }
    else{
        return false;
    }
}
function subtracao(matrizA,matrizB){
    if(matrizA.length == matrizB.length && matrizA[0].length == matrizB[0].length){
        for(let i = 0; i < matrizA.length; i++){
            for(let j = 0; j < matrizA[0].length; j++){
                matrizA[i][j]-=matrizB[i][j];
            }
        }
        return matrizA;
    }
    else{
        return false;
    }
}
function testaConta(){
    let possiblepar = [];
    for(let matriz of matrizes){
        possiblepar.push(matriz[2]);
    }
    let possibleimpar = ["+","-","*"];
    let atual = document.querySelector(".inputConta").value;
    let tof = false;
    for(let i = 0; i < atual.length; i++){
        if(i%2 == 0){
            vetor = possiblepar;
        }
        else{
            vetor = possibleimpar;
        }
        let tof = false;
        for(let j = 0; j < vetor.length; j++){
            if(atual[i]==vetor[j]){
                tof = true;
            }
        }
        if(!tof){
            document.querySelector(".inputConta").value = atual.substring(0,i);
        }
    }
}
function calcula(){
    let matrizesLocais = [];
    let conta = document.querySelector(".inputConta").value;
    let tof = true;
    if(conta.length%2==0){
        alert("Não é possível calcular, pois o último caractere representa uma operação.")
    }
    else{
        let pos = conta.indexOf("*");
        while(pos!=-1){
            let matrizA, matrizB;
            if(alfabeto.includes(conta[pos-1])){
                matrizA = pegaMatriz(conta[pos-1]);
            }
            else{
                matrizA = matrizesLocais[Number(conta[pos-1])]; 
            }
            if(alfabeto.includes(conta[pos+1])){
                matrizB = pegaMatriz(conta[pos+1]);
            }
            else{
                matrizB = matrizesLocais[Number(conta[pos+1])]; 
            }
            matrizesLocais.push(multiplica(matrizA,matrizB));
            conta = conta.substring(0,pos-1)+""+(matrizesLocais.length-1)+conta.substring(pos+2);
            if(!matrizesLocais[matrizesLocais.length-1]){
                alert("Não é possível calcular a multiplicação, pois número de linhas da primeira matriz é diferente do de colunas da segunda.");
                tof = false;
                break;
            }
            else{
                pos = conta.indexOf("*");
            }
        }
        if(tof){
            let pos1 = conta.indexOf("+");
            let pos2 = conta.indexOf("-");
            while(pos1!=-1 || pos2!=-1){
                if(pos1!=-1 && pos2!=-1){
                    if(pos1<pos2){
                        let matrizA, matrizB;
                        if(alfabeto.includes(conta[pos1-1])){
                            matrizA = pegaMatriz(conta[pos1-1]);
                        }
                        else{
                            matrizA = matrizesLocais[Number(conta[pos1-1])]; 
                        }
                        if(alfabeto.includes(conta[pos1+1])){
                            matrizB = pegaMatriz(conta[pos1+1]);
                        }
                        else{
                            matrizB = matrizesLocais[Number(conta[pos1+1])]; 
                        }
                        
                        matrizesLocais.push(soma(matrizA,matrizB));
                        conta = conta.substring(0,pos1-1)+""+(matrizesLocais.length-1)+conta.substring(pos1+2);
                        if(!matrizesLocais[matrizesLocais.length-1]){
                            alert("Não é possível calcular a adição ou subtração, pois número de linhas e colunas das matrizes é diferente.");
                            tof = false;
                            break;
                        }
                    }
                    else{
                        let matrizA, matrizB;
                        if(alfabeto.includes(conta[pos2-1])){
                            matrizA = pegaMatriz(conta[pos2-1]);
                        }
                        else{
                            matrizA = matrizesLocais[Number(conta[pos2-1])]; 
                        }
                        if(alfabeto.includes(conta[pos2+1])){
                            matrizB = pegaMatriz(conta[pos2+1]);
                        }
                        else{
                            matrizB = matrizesLocais[Number(conta[pos2+1])]; 
                        }
                        matrizesLocais.push(subtracao(matrizA,matrizB));
                        conta = conta.substring(0,pos2-1)+""+(matrizesLocais.length-1)+conta.substring(pos2+2);
                        if(!matrizesLocais[matrizesLocais.length-1]){
                            alert("Não é possível calcular a adição ou subtração, pois número de linhas e colunas das matrizes é diferente.");
                            tof = false;
                            break;
                        }
                    }
                }
                else if(pos1!=-1){
                    let matrizA, matrizB;
                    if(alfabeto.includes(conta[pos1-1])){
                        matrizA = pegaMatriz(conta[pos1-1]);
                    }
                    else{
                        matrizA = matrizesLocais[Number(conta[pos1-1])]; 
                    }
                    if(alfabeto.includes(conta[pos1+1])){
                        matrizB = pegaMatriz(conta[pos1+1]);
                    }
                    else{
                        matrizB = matrizesLocais[Number(conta[pos1+1])]; 
                    }
                    
                    matrizesLocais.push(soma(matrizA,matrizB));
                    conta = conta.substring(0,pos1-1)+""+(matrizesLocais.length-1)+conta.substring(pos1+2);
                    if(!matrizesLocais[matrizesLocais.length-1]){
                        alert("Não é possível calcular a adição ou subtração, pois número de linhas e colunas das matrizes é diferente.");
                        tof = false;
                        break;
                    }
                }
                else{
                    let matrizA, matrizB;
                    if(alfabeto.includes(conta[pos2-1])){
                        matrizA = pegaMatriz(conta[pos2-1]);
                    }
                    else{
                        matrizA = matrizesLocais[Number(conta[pos2-1])]; 
                    }
                    if(alfabeto.includes(conta[pos2+1])){
                        matrizB = pegaMatriz(conta[pos2+1]);
                    }
                    else{
                        matrizB = matrizesLocais[Number(conta[pos2+1])]; 
                    }
                    matrizesLocais.push(subtracao(matrizA,matrizB));
                    conta = conta.substring(0,pos2-1)+""+(matrizesLocais.length-1)+conta.substring(pos2+2);
                    if(!matrizesLocais[matrizesLocais.length-1]){
                        alert("Não é possível calcular a adição ou subtração, pois número de linhas e colunas das matrizes é diferente.");
                        tof = false;
                        break;
                    }
                }
                if(tof){
                    pos1 = conta.indexOf("+");
                    pos2 = conta.indexOf("-");
                }
            }
            if(tof){
                resultado(matrizesLocais[matrizesLocais.length-1]);
            }
        }
    }
}
let alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let matrizes =[];
let letra = 1;
let restof = false;
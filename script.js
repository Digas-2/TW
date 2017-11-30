//retorna true se nao existir caracteres especiais 
function validate(value) {    
    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (format.test(value))
        return false;
    return true;
}

//verifica se tem caracteres especiais e regista o login
function validate_register() {

    if (validate(document.getElementById('username').value) && validate(document.getElementById('password').value))
        validate_login();
       // register();
    else {
        alert("Username or password contain an invalid character.\nPlease try again.");
    }
}

//faz o registo do login
function validate_login() {
    if (validate(document.getElementById('username').value) && validate(document.getElementById('password').value)) {
        
       var name = document.getElementById('username').value;
       var pass = document.getElementById('password').value;
        register(); //regista os valores 
    }
    else {
        alert("Wrong credentials.\nTry again.");
    }
}


function register_sucess() {
 //   var name = document.getElementById('username').value;
    document.getElementById('login_menu').innerHTML = name;
    
    toggleDisplayBlock('modePlay');
    toggleDisplayBlock('menu');
    toggleDisplayNone('login');
}

// Botao Logout
function logout(){
     if (confirm("Do you wish to logout?")) {
         window.location.reload();
     }
}

// modo jogar contra o computador
function singlePlayer(){
   toggleDisplayBlock('mode'); 
   toggleDisplayNone('modePlay');
   toggleDisplayNone('startOpponent');
   toggleDisplayBlock('computerturn'); 
   toggleDisplayNone('OpponentTurn'); 
   tab_highs();
}

// modo jogar contra outros jogadores online
function multiPlayer(){
   toggleDisplayBlock('mode'); 
   toggleDisplayNone('modePlay');
   toggleDisplayNone('startComputer');
   toggleDisplayNone('computerturn'); 
   toggleDisplayBlock('OpponentTurn');  
   join();
   tab_highsOnline();
}

//botao play game 
function buttonPlayGame(){
    toggleDisplayNone('mode');
    toggleDisplayNone('modePlay');
    toggleDisplayBlock('game');
    toggleDisplayBlock('pcturn');
    toggleDisplayNone('highs');
    toggleDisplayBlock('quit');
    
    //verifica a dificuldade
    updateDifficulty();
    
    //constroi tabuleiro
    buildBoard();
    
    //verifica quem inicia o jogo
    turn();
}

// desistir do jogo 
function quitGame(){
    if(confirm("Are you sure you want to give up?")==true){
        removetable("tab1");
        toggleDisplayNone('quit');
        toggleDisplayNone('pcturn');
        pointsPC++;
        leave();
        alert("You lost! Game over :(");
    }  
}

//desistir de esperar pelo opponente
function quitOPP(){
    if(confirm("Are you sure you want to give up?")==true){
        removetable("tab1");
        //toggleDisplayNone('quit');
        //toggleDisplayNone('pcturn');
        toggleDisplayNone('game');
        toggleDisplayBlock('modePlay');
        leave();
    }  
}

//começar um jogo novo 
function newGame(){
    toggleDisplayNone('game');
    toggleDisplayBlock('modePlay');
    toggleDisplayNone('highs');
}

//highscores
function displayHighs(){
    toggleDisplayNone('game');
    toggleDisplayNone('mode');
    toggleDisplayBlock('highs');
    toggleDisplayNone('modePlay');
}

//Se o elemento estiver escondido, mostra-o. Caso contrario, esconde-o
function toggleDisplayNone(id){  
    document.getElementById(id).style.display = 'none';
}

function toggleDisplayBlock(id){  
    document.getElementById(id).style.display = 'block';
}


//tabela das classificaçoes com jogos contra o computador
function tab_highs(){
    removetable("highscore_table");

    var body = document.getElementById("highs");
    var tab = document.createElement('div');
    tab.setAttribute("id", "highscore_table");

    for(var i=0; i<1; i++){
        var title = document.createElement('div');
        title.setAttribute("id", "title");
        for(var j=0; j<4; j++){
            var colunas = document.createElement('div');
            colunas.setAttribute("id", "colunas");
            if(j==0){
                colunas.textContent = "Name";
                title.appendChild(colunas);
            }
            if(j==1){
                colunas.textContent = "Scores";
                title.appendChild(colunas);
            }
            if(j==2){
                colunas.textContent = "Computer Scores";
                title.appendChild(colunas);
            }
            if(j==3){
                colunas.textContent = "Mode" ;
                title.appendChild(colunas);
            }
        }
        tab.appendChild(title);
    }
 
   //corpo da tabela
    for(var i=0; i<1; i++){
        var linhas = document.createElement('div');
        linhas.setAttribute("id", "linhas");
        for(var j=0; j<4; j++){
            var col = document.createElement('div');
            col.setAttribute("id", "col");
            if(j==0){
                var name = document.getElementById('username').value;
                col.innerHTML = name;
                linhas.appendChild(col);
            }
            if(j==1){
               var pontosuser = document.createTextNode(pointsUser);
                 col.appendChild(pontosuser);
                linhas.appendChild(col);
            }
            if(j==2){
               var pontospc = document.createTextNode(pointsPC);
                col.appendChild(pontospc);
                linhas.appendChild(col);
            }
            if(j==3){
                var mode = document.createTextNode(level);
                col.appendChild(mode);
                linhas.appendChild(col);   
            }
        }
        tab.appendChild(linhas);
    }
    body.appendChild(tab); 
}


//tabela das classificaçoes de jogos online
function tab_highsOnline(){
    removetable("highscore_table");

    var body = document.getElementById("highs");
    var tab = document.createElement('div');
    tab.setAttribute("id", "highscore_table");

    for(var i=0; i<1; i++){
        var title = document.createElement('div');
        title.setAttribute("id", "title");
        for(var j=0; j<6; j++){
            var colunas = document.createElement('div');
            colunas.setAttribute("id", "colunas");
            if(j==0){
                colunas.textContent = "Num";
                title.appendChild(colunas);
            }
            if(j==1){
                colunas.textContent = "Name";
                title.appendChild(colunas);
            }
            if(j==2){
                colunas.textContent = "Victories";
                title.appendChild(colunas);
            }
            if(j==3){
                colunas.textContent = "Games" ;
                title.appendChild(colunas);
            }
            if(j==4){
                colunas.textContent = "Mode" ;
                title.appendChild(colunas);
            }
            if(j==5){
                colunas.textContent = "Size" ;
                title.appendChild(colunas);
            }
        }
        tab.appendChild(title);
    }
 
   //corpo da tabela
    for(var i=0; i<10; i++){
        var linhas = document.createElement('div');
        linhas.setAttribute("id", "linhas");
        for(var j=0; j<5; j++){
            var col = document.createElement('div');
            col.setAttribute("id", "col");
            if(j==0){
                var num = document.createTextNode(i+1);
                col.appendChild(num);
                linhas.appendChild(col);
            }
            if(j==1){
               var name = document.createTextNode(ranking_data[i].nick);
                col.appendChild(name);
                linhas.appendChild(col);
            }
            if(j==2){
               var victories = document.createTextNode(ranking_data[i].victories);
                col.appendChild(victories);
                linhas.appendChild(col);
            }
            if(j==3){
                  var games = document.createTextNode(ranking_data[i].games);
                col.appendChild(games);
                linhas.appendChild(col);
            }
            if(j==4){
                var mode = document.createTextNode(level);
                col.appendChild(mode);
                linhas.appendChild(col);   
            }
            
            if(j==5){
                var size = document.createTextNode(getSize());
                col.appendChild(size);
                linhas.appendChild(col);   
            }
            
        }
        tab.appendChild(linhas);
    }
    body.appendChild(tab); 
}

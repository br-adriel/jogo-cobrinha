let canvas = document.getElementById("canvas");
let contexto = canvas.getContext("2d");
let box = 32;
let cobra = [];
let direcao = "d"; // (d)ireita, (e)squerda, (c)ima, (b)aixo
let intervalo = 100
let jogo;

let pontuacao = cobra.length - 2;
let recorde = 0;

const htmlPontuacao = document.getElementById("pontos");
const htmlRecorde = document.getElementById("recorde");
const botaoPlay = document.getElementById("play");

/*
PALETA DE CORES
COBRA: ef8354 eac435
COMIDA: 06bee1
FUNDO: 2b3d41
*/

// Criação das coordenadas iniciais da cobra
function inicializarCobra() {
    direcao = "d";
    cobra = [];

    for (let i=0; i<2; i++) {
        cobra[i] = {
            x: box - i*box,
            y: 0,
        }
    }
}

// Coordenadas iniciais da comida
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
};


function criarFundo() {
    contexto.fillStyle = "#2b3d41";
    contexto.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra() {
    for (let i=0; i<cobra.length; i++) {
        i == 0 ? contexto.fillStyle = "#eac435" : contexto.fillStyle = "#ef8354";
        contexto.fillRect(cobra[i].x, cobra[i].y, box, box);
    }
}

function desenharComida() {
    contexto.fillStyle = "#06bee1";
    contexto.fillRect(comida.x, comida.y, box, box);
}

function iniciarJogo() {
    // Atualiza o mostrador html de pontuacao
    pontuacao = cobra.length - 2;
    htmlPontuacao.innerHTML = pontuacao;

    // Atualiza mostrador html de recorde
    if (pontuacao > recorde) {
        recorde = pontuacao;
        htmlRecorde.innerHTML = recorde;
    }

    // Verifica colisão da cobra nela mesma
    for (let i=1; i<cobra.length; i++) {
        if (cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y) {
            clearInterval(jogo);
            canvas.style.boxShadow = "0px 0px 0.5rem rgba(150, 0, 0, 0.5)";

            botaoPlay.style.display = 'inline';
        }
    }

    criarFundo();
    criarCobra();
    desenharComida();

    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;
    
    // atualiza as coordenadas da cobra
    switch (direcao) {
        case "d":
            cobraX >= box*15 ? cobraX = 0 : cobraX += box;
            break;
        case "e":
            cobraX == 0 ? cobraX = box*15 : cobraX -= box;
            break;
            case "c":
            cobraY == 0 ? cobraY = box*15 : cobraY -= box;
            break;
        case "b":
            cobraY >= box*15 ? cobraY = 0 : cobraY += box;
    }

    // Verifica se a cobra pegou a comida
    if (cobraX == comida.x && cobraY == comida.y) {
        comida = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box,
        };
    } else {
        cobra.pop();
    }

    let novaCabeca = {
        x: cobraX,
        y: cobraY,
    }; 
    cobra.unshift(novaCabeca);
    
}

// lida com a mudança de direção da cobra
function atualizar(event) {
    switch (event.keyCode) {
        case 38: // Seta para cima
        case 87: // W
            direcao != "b" ? direcao = "c" : null;
            break;
        case 40: // Seta para baixo
        case 83: // S
            direcao != "c" ? direcao = "b" : null;
            break;
        case 39: // Seta para direita
        case 68: // D
            direcao != "e" ? direcao = "d" : null;
            break;
        case 37: // Seta para esquerda
        case 65: // A
            direcao != "d" ? direcao = "e" : null;
    }
}


function play() {
    inicializarCobra();
    canvas.style.boxShadow = "0 0 0.5rem rgba(0, 0, 0, 0.25)";

    botaoPlay.style.display = 'none';

    jogo = setInterval(iniciarJogo, intervalo);
}


document.addEventListener("keydown", atualizar);
botaoPlay.addEventListener("click", play);

play();

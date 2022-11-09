let deck = [];
let tipos = ['C','D','H','S'];
let especiales = ['A','J','K','Q'];

let puntosJugador = 0
let puntospc = 0


//referencias al archivo HTML

const btnPedir = document.querySelector('#btnpedir')
const btnterminar = document.querySelector('#btnparar')
const btnnuevo = document.querySelector('#btnnuevo')
const jugador_cartas = document.querySelector('#jugador-cartas')
const div_jugador = document.querySelector('#jugador-cartas')
const div_pc = document.querySelector('#computadora-cartas')
const smalls = document.querySelectorAll('small')

//funcion que crea un mazo barajeado
function createDeck (){
    for(let i= 2; i <= 10 ; i++){
        for(let tipo of tipos){
            deck.push(i+tipo)
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp+tipo);
        }
    }
    deck = _.shuffle(deck)
    console.log(deck);
    return deck;
}

createDeck();

//funcion que elimina una carta al pedirla
function pedirCarta(){
    carta = deck.pop()
    console.log(carta)
    return carta
}
pedirCarta()

//funcion para procesar el valor de la carta pedida

function valorCarta(carta){
    const valor_carta = carta.substring(0, carta.length-1)
    
    console.log(valor_carta)
    
    if(isNaN(valor_carta) && valor_carta ==='A'){
        return 11
    } else if(isNaN(valor_carta)){
        return 10
    }else{
        return valor_carta * 1
    }
    
}

const turnopc = (puntosJugador) => {
    do{
        carta = pedirCarta()
        puntospc = puntospc + valorCarta(carta)
        smalls[1].innerHTML = puntospc
    
        const imgcarta = document.createElement('img')
        imgcarta.src = `img/cartas/${carta}.png`
        div_pc.append(imgcarta)
        imgcarta.classList.add('card')

        if(puntospc === 21){
            break
        }else if((puntospc=== 18) || (puntospc=== 19) || (puntospc=== 20)){
            break
        }else if(puntosJugador ===0){
            break
        }else if(puntosJugador >21){
            break
        }
    } while(puntosJugador>=puntospc)

    return puntospc
}


//eventos click

btnPedir.addEventListener('click', ()=>{

    carta = pedirCarta()
    puntosJugador = puntosJugador + valorCarta(carta)
    smalls[0].innerHTML = puntosJugador

    const imgcarta = document.createElement('img')
    imgcarta.src = `img/cartas/${carta}.png`
    div_jugador.append(imgcarta)
    imgcarta.classList.add('card')

    if(puntosJugador > 21){
        turnopc(puntosJugador)
        btnPedir.disabled = true
        btnterminar.disabled = true
        setTimeout(() =>{
            alert('Lo siento, te pasaste de 21 puntos... perdiste')

        }, 1000)
    
    }else{
        return puntosJugador
    }

})

btnterminar.addEventListener('click', ()=>{
    puntospc = turnopc(puntosJugador)
    btnPedir.disabled = true
    btnterminar.disabled = true

    if((puntospc>puntosJugador) && puntospc <= 21){
        
        setTimeout(() =>{
            alert('Lo siento, perdiste')

        }, 1000)
    }else if((puntospc>puntosJugador) && puntospc > 21){
        
        setTimeout(() =>{
            alert('felicidades, ganaste!!!')

        }, 1000)
    }else if((puntospc<puntosJugador)){
        
        setTimeout(() =>{
            alert('felicidades, ganaste!!!')

        }, 1000)
    }else if((puntospc === puntosJugador)){
        
        setTimeout(() =>{
            alert('Wow! hay empate, nadie gana')

        }, 1000)
    }
})

btnnuevo.addEventListener('click', ()=>{
    deck = []
    deck = createDeck()
    puntospc = 0
    puntosJugador = 0
    smalls[0].innerText = 0
    smalls[1].innerText = 0
    
    div_pc.innerHTML = ''
    div_jugador.innerHTML = ''
    
    btnnuevo.disabled = false
    btnpedir.disabled = false
    btnterminar.disabled=false
    
})


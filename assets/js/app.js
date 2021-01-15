/* //? Referencia de tipo de cartas  
	C = Clubs -> tréboles
	D = Diamonds
	H = Hearts
	S = Spades -> picas
*/

//* Variables
let deck = []; //arreglo de cartas (baraja)
let puntosJugador = 0;
let puntosNPC = 0;
const tiposCartas = ['C', 'D', 'H', 'S']; // iterador = tipoCarta
const tiposEspeciales = ['A', 'J', 'Q', 'K']; //iterador = tipoEspecial
const btnPedir = document.querySelector('.boton-pedir');
const puntosHTML = document.querySelectorAll('span');
const divCartasJugador = document.querySelector('#cartas-jugador');

//* Listado de eventos
registrarEventListeners();
function registrarEventListeners() {
	btnPedir.addEventListener('click', () => {

		const carta = pedirCarta();

		puntosJugador = puntosJugador + valorCarta(carta);
		puntosHTML[0].innerText = puntosJugador;

		const imgCarta = document.createElement('img');
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.alt = 'card';
		imgCarta.classList.add('carta');

		divCartasJugador.append(imgCarta);

		if (puntosJugador > 21) {
			console.warn('Te has pasado de 21, perdiste');
			btnPedir.classList.add('disabled');
			btnPedir.setAttribute('disabled', true);
			/* btnPedir.disabled = true; */ //deshabilita el botón de pedir carta
		} else if (puntosJugador === 21){
			console.warn('Blackjack!');
			btnPedir.classList.add('disabled'); //agrega clase con estilos css
			btnPedir.setAttribute('disabled', true); //agrega atributo al html -> disabled = "true"
		} else {

		}
	});
}

//* Funciones

/* Función que crear un nuevo deck */
function crearDeck() {
	for (let i = 2; i <= 10; i++) {
		for (const tipoCarta of tiposCartas) {
			deck.push(i + tipoCarta);
		}
	}

	for (let tipoEspecial of tiposEspeciales) {
		for (const tipoCarta of tiposCartas) {
			deck.push(tipoEspecial + tipoCarta);
		}
	}

	deck = _.shuffle(deck); //reordena de forma aleatoria el arreglo y lo devuelve en desorden
	
	return deck; //arreglo barajeado
}

console.log(crearDeck()); //llamado a la función crear deck (deck desordenado)

/* Función que permite quitar una carta del arreglo */
function pedirCarta() {
	if (deck.length === 0) {
		throw 'No hay cartas en el deck'; //throw tira un mensaje de error en consola
	}

	const carta = deck.pop();

	return carta;
}

function valorCarta(carta) {
	const valor = carta.substring(0, carta.length - 1);

	return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
}

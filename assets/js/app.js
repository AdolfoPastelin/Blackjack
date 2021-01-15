/* //? Referencia de tipo de cartas  
	C = Clubs -> tréboles
	D = Diamonds
	H = Hearts
	S = Spades -> picas
*/

//* Variables //
let deck = []; //arreglo de cartas (baraja)
let puntosJugador = 0;
let puntosNPC = 0;
const tiposCartas = ['C', 'D', 'H', 'S']; // iterador = tipoCarta
const tiposEspeciales = ['A', 'J', 'Q', 'K']; //iterador = tipoEspecial
const btnNuevo = document.querySelector('.boton-nuevo');
const btnPedir = document.querySelector('.boton-pedir');
const btnDetener = document.querySelector('.boton-detener');
const resultado = document.querySelector('.resultado');
const puntosHTML = document.querySelectorAll('span');
const divCartasJugador = document.querySelector('#cartas-jugador');
const divCartasNPC = document.querySelector('#cartas-npc');

//* Listado de eventos //
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
			resultado.textContent = 'Te has pasado de 21 puntos, perdiste :(';
			btnPedir.classList.add('disabled');
			btnPedir.setAttribute('disabled', true);

			btnDetener.classList.add('disabled');
			btnDetener.setAttribute('disabled', true);

			turnoNPC(puntosJugador);
			/* btnPedir.disabled = true; */ //deshabilita el botón de pedir carta
		} else if (puntosJugador === 21) {
			resultado.textContent = "Blackjack!!!";
			btnPedir.classList.add('disabled'); //agrega clase con estilos css
			btnPedir.setAttribute('disabled', true); //agrega atributo al html -> disabled = "true"

			btnDetener.classList.add('disabled');
			btnDetener.setAttribute('disabled', true);

			turnoNPC(puntosJugador);
		}
	});

	btnDetener.addEventListener('click', () => {
		btnPedir.classList.add('disabled');
		btnPedir.setAttribute('disabled', true);

		btnDetener.classList.add('disabled');
		btnDetener.setAttribute('disabled', true);

		turnoNPC(puntosJugador);
	});

	btnNuevo.addEventListener('click', () => {
		console.clear;

		deck = [];
		deck = crearDeck();

		puntosJugador = 0;
		puntosNPC = 0;

		puntosHTML[0].innerText = 0;
		puntosHTML[1].innerText = 0;

		divCartasJugador.innerHTML = '';
		divCartasNPC.innerHTML = '';

		btnPedir.setAttribute('disabled', false);
		btnDetener.setAttribute('disabled', false);
	});
}

//* Funciones //

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

function turnoNPC(puntosMinimos) {
	do {
		const carta = pedirCarta();

		puntosNPC = puntosNPC + valorCarta(carta);
		puntosHTML[1].innerText = puntosNPC;

		const imgCarta = document.createElement('img');
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.alt = 'card';
		imgCarta.classList.add('carta');

		divCartasNPC.append(imgCarta);

		if (puntosMinimos > 21) {
			break;
		}
	} while (puntosNPC < puntosMinimos && puntosMinimos <= 21);

	setTimeout(() => {
		if (puntosNPC === puntosMinimos) {
			resultado.textContent = 'Empate, nadie ha ganado :(';
		} else if (puntosMinimos > 21) {
			resultado.textContent = 'Ha ganado la NPC !!';
		} else if (puntosNPC > 21) {
			resultado.textContent = "Has ganado! :)"
		} else {
			resultado.textContent = 'Ha ganado la NPC !!';
		}
	}, 10);

}
/* //? Referencia de tipo de cartas  
	C = Clubs -> tréboles
	D = Diamonds
	H = Hearts
	S = Spades -> picas
*/

//* Variables
let deck = []; //arreglo de cartas (baraja)
const tiposCartas = ['C', 'D', 'H', 'S']; // iterador = tipoCarta
const tiposEspeciales = ['A', 'J', 'Q', 'K']; //iterador = tipoEspecial

//* Listado de eventos
registrarEventListeners();
function registrarEventListeners() {
	//object.addEventListener('click', function);
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

console.log(crearDeck()); //llamado a la función crear deck

/* Función que permite quitar una carta del arreglo */
function pedirCarta() {

	if (deck.length === 0) {
		throw 'No hay cartas en el deck'; //throw tira un mensaje de error en consola
	}
	
	const carta = deck.pop();

	return carta;
}

console.log(pedirCarta());
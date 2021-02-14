// SNAKE coded by Federico Figueredo

//Preparo area de dibujo (CANVAS)
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//Creo la unidad de medida
const caja = 32;

//Cargo imagenes

const fondo = new Image();
fondo.src = "img/fondo.png";

const comidaImg = new Image();
comidaImg.src = "img/comida.png";

//Cargo sonidos
const muerto = new Audio();
const comer = new Audio();
const izquierda = new Audio();
const arriba = new Audio();
const derecha = new Audio();
const abajo = new Audio ();



muerto.src = "audio/muerto.mp3";
comer.src = "audio/comer.mp3";
izquierda.src = "audio/izquierda.mp3";
arriba.src = "audio/arriba.mp3";
derecha.src = "audio/derecha.mp3";
abajo.src = "audio/abajo.mp3";

//Creo la serpiente
let serpiente = [];

serpiente[0] = {
	x : 9 * caja,
	y : 10 * caja
}

//Creo la comida
let comida = {
	x : Math.floor((Math.random()*17)+1) * caja,
	y : Math.floor((Math.random()*15)+3) * caja
}

//Creo la variable puntaje
let puntaje = 0;

//Controlamos la serpiente
var d;

document.addEventListener("keydown", direccion);



function direccion(evento){
	let tecla = evento.keyCode;
	if( tecla == 37 && d != "DERECHA"){
		izquierda.play();
		d = "IZQUIERDA";
	}
	else if( tecla == 38 && d != "ABAJO"){
		arriba.play();
		d = "ARRIBA";
	}
	else if( tecla == 39 && d != "IZQUIERDA"){
		derecha.play();
		d = "DERECHA";
	}
	else if( tecla == 40 && d != "ARRIBA"){
		abajo.play();
		d = "ABAJO";
	}
}

//función que verifica colisión
function colision(cabeza,arreglo){
	for (let i = 0; i < arreglo.length; i++){
		if (cabeza.x == arreglo[i].x && cabeza.y == arreglo[i].y){
			return true;
		}
	}
	return false;
}

function dibujarOjo(xi, yi, xf, yf, ctx){

	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = "red";
	ctx.moveTo(xi, yi);
	ctx.lineTo(xf, yf);
	ctx.stroke();
	ctx.closePath();

}

//Dibujamos todo en el canvas
function dibujar(){

	ctx.drawImage(fondo,0,0);

	// Dibujamos serpiente
	for(let i = 0; i < serpiente.length; i++){

		ctx.lineWidth = 2;
		ctx.strokeStyle = "#000";
		ctx.strokeRect(serpiente[i].x, serpiente[i].y, caja, caja);

		ctx.fillStyle = "#008F11";
		ctx.fillRect(serpiente[i].x, serpiente[i].y, caja, caja);

		// Dibujamos ojos y lengua segun posición
		if (d == undefined || d == "ARRIBA"){
			ctx.fillStyle = "#000";
			ctx.fillRect(serpiente[0].x + 8, serpiente[0].y + 8, 3, 3);

			ctx.fillStyle = "#000";
			ctx.fillRect(serpiente[0].x + 20, serpiente[0].y + 8, 3, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x + 15, serpiente[0].y - 7, 3, 6);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x + 13, serpiente[0].y - 10, 3, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x + 17, serpiente[0].y - 10, 3, 3);
		}
		else if(d == "IZQUIERDA"){
			ctx.fillStyle = "#000";
			ctx.fillRect(serpiente[0].x + 8, serpiente[0].y + 20, 3, 3);

			ctx.fillStyle = "#000";
			ctx.fillRect(serpiente[0].x + 8, serpiente[0].y + 8, 3, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x - 7, serpiente[0].y + 15, 6, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x - 10, serpiente[0].y + 18, 3, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x -10, serpiente[0].y + 13, 3, 3);
		}
		else if(d == "DERECHA"){
			ctx.fillStyle = "#000";
			ctx.fillRect(serpiente[0].x + 20, serpiente[0].y + 8, 3, 3);

			ctx.fillStyle = "#000";
			ctx.fillRect(serpiente[0].x + 20, serpiente[0].y + 20, 3, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x + 33, serpiente[0].y + 13, 6, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x + 39, serpiente[0].y + 10, 3, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x + 39, serpiente[0].y + 16, 3, 3);
		}
		else if(d == "ABAJO"){
			ctx.fillStyle = "#000";
			ctx.fillRect(serpiente[0].x + 8, serpiente[0].y + 20, 3, 3);

			ctx.fillStyle = "#000";
			ctx.fillRect(serpiente[0].x + 20, serpiente[0].y + 20, 3, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x + 15, serpiente[0].y + 33, 3, 6);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x + 13, serpiente[0].y +39, 3, 3);

			ctx.fillStyle = "red";
			ctx.fillRect(serpiente[0].x + 17, serpiente[0].y + 39, 3, 3);
		}
		

		
	}

	ctx.drawImage(comidaImg,comida.x, comida.y);

	//posición de la cabeza vieja
	let serpienteX = serpiente[0].x;
	let serpienteY = serpiente[0].y;

	//En que dirección
	if (d == "IZQUIERDA") {
		serpienteX = serpienteX - caja;
	}
	if (d == "ARRIBA") {
		serpienteY = serpienteY - caja;
	}
	if (d == "DERECHA") {
		serpienteX = serpienteX + caja;
	}
	if (d == "ABAJO") {
		serpienteY = serpienteY + caja;
	}

	//Si la serpiente come la manzana
	if (serpienteX == comida.x && serpienteY == comida.y){
		puntaje = puntaje + 1;
		comer.play();
		comida = {
			x : Math.floor((Math.random()*17)+1) * caja,
			y : Math.floor((Math.random()*15)+3) * caja
		}
		// No removemos la cola
	}
	else { // Removemos la cola
		serpiente.pop();
	}


	//Agregamos nueva cabeza
	let nuevaCabeza = {
		x : serpienteX,
		y : serpienteY
	}

		//Game over
	if (serpienteX < caja || serpienteX > 17 * caja || serpienteY < 3 * caja || serpienteY > 17 * caja || colision(nuevaCabeza, serpiente)){
		clearInterval(juego);
		muerto.play();
		alert("Has Perdido! Tu Puntaje fue de " + puntaje + " puntos.\n   Presiona F5 para jugar nuevamente.");
	}

	serpiente.unshift(nuevaCabeza);

	//Puntaje
	ctx.fillStyle = "White";
	ctx.font = "45px Arcade";
	ctx.fillText(puntaje,2*caja,1.6*caja);
}


let juego = setInterval(dibujar,150);


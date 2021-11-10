function random (min , max) {
    let aleatorio = Math.floor(Math.random()*(max-min+1)+min);  // busqué una función para poder generar un nro aleatorio
    return aleatorio;
}

function ataque (vida , ataque){
    let resultado = random (ataque -2 , ataque);
    console.log("El ataque es de: " + resultado);
    resultado = vida -resultado;
    return resultado;
}

function comprobarVida (vida){
    if(vida > 0){
        return true;
    }else{
        return false;
    }
}

let vidaCaballero = 20;
let ataqueCaballero = 4;

let vidaBarbaro = 15;
let ataqueBarbaro = 6;

let vidaEsqueleto = 13;
let ataqueEsqueleto = 5;

let vidaUsuario = 0;
let ataqueUsuario = 0;

let nombre = prompt("Ingrese el nombre de su personaje");
let clase = prompt("Ingrese la Clase de su personaje. Barbaro o Caballero.").toLowerCase();

if (clase == "barbaro"){
    vidaUsuario = vidaBarbaro;
    ataqueUsuario = ataqueBarbaro;
}else if (clase == "caballero") {
    vidaUsuario = vidaCaballero;
    ataqueUsuario = ataqueCaballero;
}

while (vidaUsuario > 0 && vidaEsqueleto > 0){
    vidaEsqueleto = ataque(vidaEsqueleto, ataqueUsuario);
    console.log("vida esqueleto: " + vidaEsqueleto);
    if (vidaEsqueleto > 0){
        vidaUsuario = ataque (vidaUsuario , ataqueEsqueleto);
        console.log("vida Usuario: " + vidaUsuario);
    }
}

if (comprobarVida(vidaUsuario)){
    console.log ("Felicitaciones " + nombre + ". Ganaste!");
}else{
    console.log ("Lo lamento " + nombre + ", perdiste.")
}

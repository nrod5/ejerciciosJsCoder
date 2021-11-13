function random (min , max) {
    let aleatorio = Math.floor(Math.random()*(max-min+1)+min);  // busqué una función para poder generar un nro aleatorio
    return aleatorio;
}

function ataque (ataque){
    let resultado = random (ataque -2 , ataque);
    console.log("El ataque es de: " + resultado);
    return resultado;
}


class personajes{
    constructor(nombre, vida, ataque, clase){
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
        this.clase = clase;
    }

    


    updateVida(attack){
        this.vida = this.vida - attack;
    }
}


let esqueleto = new personajes ("Esqueleto", 13, 5, "Enemigo");
let usuario;

let nombre = prompt("Ingrese el nombre de su personaje");
let clase = prompt("Ingrese la Clase de su personaje. Barbaro o Caballero.").toLowerCase();

if (clase == "barbaro"){
    usuario = new personajes (nombre, 15, 6, clase);
}else if (clase == "caballero") {
    usuario = new personajes (nombre, 20, 4, clase);
}



while (usuario.vida > 0 && esqueleto.vida > 0){
    esqueleto.updateVida(ataque(usuario.ataque));
    console.log("vida esqueleto: " + esqueleto.vida);
    if (esqueleto.vida > 0){
        usuario.updateVida(ataque(esqueleto.ataque));
        console.log("vida Usuario: " + usuario.vida);
    }
}


if (usuario.vida > 0){
    console.log ("Felicitaciones " + usuario.nombre + ". Ganaste!");
}else{
    console.log ("Lo lamento " + usuario.nombre + ", perdiste.")
}

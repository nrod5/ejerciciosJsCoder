/* Función para devolver nro aleatorio */
function random (min , max) {
    let aleatorio = Math.floor(Math.random()*(max-min+1)+min);  // busqué una función para poder generar un nro aleatorio
    return aleatorio;
}

/* Función que recibe nro de ataque y devuelve el daño, calculado con función aleatorio */
function ataque (nombre , ataque){
    let resultado = random (ataque -2 , ataque);
    console.log("El ataque de " + nombre + " es de: " + resultado);
    return resultado;
}

/* Clase para personajes, tanto jugable como NPC (non playable character) */
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

/* Array con enemigos */
let npc = [];
let enemigo = new personajes ("Esqueleto", 12, 4, "Enemigo");
npc.push(enemigo);
enemigo = new personajes ("Lobo", 10, 4, "Enemigo");
npc.push(enemigo);
enemigo = new personajes ("Slime", 6, 2, "Enemigo");
npc.push(enemigo);
enemigo = new personajes ("Boss", 20, 5, "Jefe");
npc.push(enemigo);

/* Array con items (Todavía no utilizados) */
let items = [
    {
        id:1,
        nombre:"Poción pequeña de Curación",
        valor:5,
        descripcion:"Cura 5 de vida",
    },
    {
        id:2,
        nombre:"Poción de Curación",
        valor:10,
        descripcion:"Cura 10 de vida",
    }
]


/* Elección de nombre y clase */

let nombre = prompt("Ingrese el nombre de su personaje");
let clase = prompt("Ingrese la Clase de su personaje. Barbaro o Caballero.").toLowerCase();

/* Crea objeto con datos de usuario */
let usuario;
if (clase == "barbaro"){
    usuario = new personajes (nombre, 15, 6, clase);
}else if (clase == "caballero") {
    usuario = new personajes (nombre, 20, 4, clase);
}



for(let i = 0;i < npc.length; i++){

    console.log("Ahora te vas a enfrentar a un " + npc[i].nombre);

    while (usuario.vida > 0 && npc[i].vida > 0){
        npc[i].updateVida(ataque(usuario.nombre,usuario.ataque));
        console.log(`vida ${npc[i].nombre}: `  + npc[i].vida);
        if (npc[i].vida > 0){
            usuario.updateVida(ataque(npc[i].nombre,npc[i].ataque));
            console.log("vida Usuario: " + usuario.vida);
        }
    }


    if (usuario.vida > 0){
        console.log ("Felicitaciones " + usuario.nombre + ". Ganaste!");
    }else{
        console.log ("Lo lamento " + usuario.nombre + ", perdiste.");
        break;
    }

}

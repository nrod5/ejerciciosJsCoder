/* Función para devolver nro aleatorio */
function random (min , max) {
    let aleatorio = Math.floor(Math.random()*(max-min+1)+min);  // busqué una función para poder generar un nro aleatorio
    return aleatorio;
}

/* Función que recibe nro de ataque y devuelve el daño, calculado con función aleatorio */
function ataque (ataque){
    let resultado = random (ataque -2 , ataque);
    
    return resultado;
}

/* Clase para personajes, tanto jugable como NPC (non playable character) */
class personajes{
    constructor(nombre, vida, ataque, clase, vidaMax){
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
        this.clase = clase;
        this.vidaMax = vidaMax;
    }

    
    updateVida(attack){
        this.vida = this.vida - attack;
    }
}

/* Array con enemigos */
let npc = [];
let enemigo = new personajes ("Esqueleto", 12, 3, "Enemigo", 12);
npc.push(enemigo);
enemigo = new personajes ("Lobo", 10, 4, "Enemigo", 10);
npc.push(enemigo);
enemigo = new personajes ("Slime", 6, 2, "Enemigo", 6);
npc.push(enemigo);
enemigo = new personajes ("Boss", 20, 5, "Jefe", 20);
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


/* Variables para usar dentro de funciones */
let usuario; /* Objeto con datos del personaje del usuario */
let i = 0; /* contador */
let UIpersonajes = document.getElementById("UIpelea");

/* Eventos para botones */
let botonPj = document.getElementById("botonCreacion");
let botonUno = document.getElementById("botonAtaque");
let botonDos = document.getElementById("botonDefensa");
let botonTres = document.getElementById("botonItems");

botonPj.addEventListener("click" , eleccionPersonaje);
botonUno.addEventListener("click" , ataqueBoton);
botonDos.addEventListener("click" , defensaBoton);
botonTres.addEventListener("click" , itemBoton);

/* Para evitar que se envíe el formulario con Enter */
let campoNombre = document.getElementById("nombreUsuario");

campoNombre.addEventListener("keydown" , e=>{
    if (e.key === "Enter") {
        e.preventDefault();
    }
})

/* Elección de nombre y clase */
function eleccionPersonaje() {
    let nombre = document.getElementById("nombreUsuario");
    let clase = document.getElementById("claseUsuario");
    if (clase.value == "barbaro"){
        usuario = new personajes (nombre.value, 15, 6, clase.value, 15);
    }else if (clase.value == "caballero") {
        usuario = new personajes (nombre.value, 20, 4, clase.value, 20);
    }
    let contenedor = document.getElementById("creacionPj");
    contenedor.innerHTML = `<p class="text-center">Bienvenido ${nombre.value}.</p>`;
    mostrarPersonajes();
    mostrarBotonera();
}


/* Función para el botón de ataque, el usuario ataca y luego comprueba si mato al enemigo o si fue vencido */
function ataqueBoton() {
    npc[i].updateVida(ataque(usuario.ataque));
    if(npc[i].vida > 0){
        usuario.updateVida(ataque(npc[i].ataque));
        
    }else{
        i++;
    }

    if(i<npc.length && usuario.vida > 0){
        mostrarPersonajes();
    }else if(usuario.vida < 1){
        UIpersonajes.innerHTML = `<p class="text-center">Lo siento ${usuario.nombre}. Has sido vencido!</p>`
        ocultarBotonera();
    }else{
        UIpersonajes.innerHTML = `<p class="text-center">Felicitaciones ${usuario.nombre}!! Has vencido!</p>`
        ocultarBotonera();
    }
    
    
}

/*  Función para el botón de defensa. Comprueba si la defensa fue efectiva, 
    sino aplica el daño correspondiente. Después comprueba la vida del usuario para dar mensaje de derrota o actualizar
    lo que se muestra en pantalla */
function defensaBoton(){
    mostrarPersonajes(); //para resetear lo que se muestra
    let danio = ataque(npc[i].ataque) - random(2,5);
    if(danio>0){
        usuario.updateVida(danio);
    }else{
        let parrafo = document.createElement("div");
        parrafo.innerHTML = `<p class="text-center">Defensa Exitosa</p>`;
        UIpersonajes.appendChild(parrafo);
    }

    if(usuario.vida < 1){
        UIpersonajes.innerHTML = `<p class="text-center">Lo siento ${usuario.nombre}. Has sido vencido!</p>`
        ocultarBotonera();
    }else if(usuario.vida>1 && danio>0){
        mostrarPersonajes();
    }
}

function itemBoton(){
    /* Sin uso por el momento */
}

/* Función para mostrar los personajes en el HTML */
function mostrarPersonajes(){
    let barraUsuario = usuario.vida * 100 / usuario.vidaMax;
    let barraEnemigo = npc[i].vida * 100 / npc[i].vidaMax;
    UIpersonajes.innerHTML = `<div class="row justify-content-center">
                                <div class="col-6">
                                    <div class="text-center">
                                        <img src="../img/${usuario.clase}.png" alt="Imagen Jugador">
                                    </div>
                                    <p>Vida ${usuario.nombre}</p>
                                    <div class="progress">
                                        <div class="progress-bar bg-success" style="width: ${barraUsuario}%;">
                                            ${usuario.vida}/${usuario.vidaMax}
                                        </div>
                                    </div>
                                </div>
                                </div>

                                <div class="row justify-content-center">
                                <div class="col-6">
                                    <div class="text-center">
                                        <img src="../img/${npc[i].nombre}.png" alt="Imagen enemigo">
                                    </div>
                                    <p>Vida ${npc[i].nombre}</p>
                                    <div class="progress">
                                        <div class="progress-bar bg-danger" style="width: ${barraEnemigo}%;">
                                        ${npc[i].vida}/${npc[i].vidaMax}
                                        </div>
                                    </div>
                                </div>
                                </div>`;
}

/* Funciones para mostrar y ocultar la botonera de acciones del usuario */
function mostrarBotonera() {
    document.getElementById('botonera').style.display = 'block';
}
function ocultarBotonera() {
    document.getElementById('botonera').style.display = 'none';
}

class producto {
    constructor (nombre,precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

let listaProductos = [];

for (let i=0;i<5;i++){
    let nombre = prompt("Ingrese el nombre del producto");
    let precio = parseInt(prompt("Ingrese el precio del producto"));
    listaProductos.push(new producto(nombre,precio));
}

console.log(listaProductos);

let opcion = parseInt(prompt (`Elija una opción \n 1 - para ordenar alfabeticamente por nombre \n 2 - para ordenar de menor a mayor por precio`));

if(opcion == 1){
    listaProductos.sort(function (a,b) {
        if (a.nombre > b.nombre) {
          return 1;
        } else if (a.nombre < b.nombre) {
          return -1;
        } 
        return 0;
      });
}else if(opcion == 2){
    listaProductos.sort(function (a, b) {
    return (a.precio - b.precio)
    })
}
console.log(listaProductos);
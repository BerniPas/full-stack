

let boleto;
let edad;
let destino;

edad = prompt("Ingrese su edad: "); //string

edad = parseInt(edad);

if(edad < 18){
    alert("Traer autorización de los padres");
}else{
    destino = prompt("Elija su destino: España, Colombia, Asia"); //string
}

console.log(destino);

if(destino === 'España'){
    window.location.href = "./espania.html";
}


//boleto = prompt("Ya tiene el boleto"); //string



// importamos express
const express = require('express');

// si no se muestra el public, importamos el path
const path = require('path');

// ejecutamos express
// y guardamos la referencia en una variable
const server = express();

let contador = 0;
// creamos nuestro middleware: es una función entre la peticion y la respuesta
// que tiene tres parametros: req, res y next

const pruebaMidd = (peticion, respuesta, next) => {

    contador++;
    console.log(`Pasó por nuesto Middleware, sos el usuario número: ${contador}`);

    //respuesta.send(`Pasó por nuesto Middleware, sos el usuario número: ${contador}`);

    // si no llamamos a next, el servidor no va a responder
    // y se va a quedar esperando la respuesta
    next();

}

// Middleware para manejar errores 500
server.use((err, req, res, next) => {
    console.error(err.stack); // Imprime el error en la consola
    res.status(500).send('<h1>500 - Error interno del servidor</h1>');
});



// usamos el middleware
server.use(pruebaMidd);

console.log(__dirname);
console.log(path.join(__dirname, 'public'));



// usamos un middleware para ver el frontend
server.use(express.static('public')); // 1
//server.use(express.static(path.join(__dirname, 'public'))); // 2

// creamos el puerto
const PORT = 3000;

// creamos un middleware para el 404 = 1
// Middleware 404 al final de todas tus rutas
server.use((req, res) => {
    console.log(`Ruta no encontrada: ${req.url}`);
    res.status(404).send('<h1>404 - Página no encontrada</h1>');
});

// creamos una ruta para específica para el 404
// Manejo de errores 404 (ruta no encontrada)
/* server.get('*', (req, res) => {
    console.log(`Ruta no encontrada: ${req.url}`);

    res.status(404).send('<h1>404 - Página no encontrada</h1>');
});  */

// levantamos el servidor en el puerto 3000
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
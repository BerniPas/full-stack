
const mongoose = require('mongoose');


// conectamos a la base de datos local
const connectDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Conectado a la base de datos: pruebaajax`); // mostramos un mensaje en la consola
    } catch (error) {
        console.error('Error al conectar a la base de datos', error); // mostramos un mensaje de error en la consola
        process.exit(1); // salimos del proceso con un error
    }
}

// exportamos la función de conexión a la base de datos
module.exports = connectDB; // exportamos la función de conexión a la base de datos
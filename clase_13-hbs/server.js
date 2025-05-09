
//importamos la configuración de dotenv
require('dotenv').config(); // importamos la configuración de dotenv

// también puede ser
const dotenv = require('dotenv'); // importamos la configuración de dotenv
dotenv.config(); // configuramos dotenv

// Importamos el servidor
const app = require('./app'); // importamos el servidor

// Importamos la conexión a la base de datos
const connectDB = require('./conexion/conecctionMongo'); // importamos la conexión a la base de datos

// Importamos el puerto
const PORT = process.env.PORT || 3000; // importamos el puerto de la configuración de dotenv o el puerto 3000 por defecto

// Importamos el URI de la base de datos
const MONGO_URI = process.env.MONGO_LOCAL; // importamos el URI de la base de datos de la configuración de dotenv


// Conexión a la base de datos
connectDB(MONGO_URI); // conectamos a la base de datos


// levantamos el servidor
app.listen(PORT, () => { // levantamos el servidor
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`); // mostramos un mensaje en la consola
}); // levantamos el servidor
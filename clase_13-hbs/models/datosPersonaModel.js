
// Importamos el paquete mongoose
const mongoose = require('mongoose');

// Creamos un esquema para la colección de personas
const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
});

// exportamos el modelo de la colección de personas
const Persona = mongoose.model('Contacto', personaSchema);

module.exports = Persona; // exportamos el modelo para usarlo en otros archivos
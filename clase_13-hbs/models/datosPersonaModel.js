
// Importamos el paquete mongoose
const mongoose = require('mongoose');


// Creamos un esquema para la colección de personas
const personaSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },
    mensaje: {
        type: String
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}); // desactivamos el id por defecto de mongoose

// exportamos el modelo de la colección de personas
const Persona = mongoose.model('Contacto', personaSchema);

module.exports = Persona; // exportamos el modelo para usarlo en otros archivos
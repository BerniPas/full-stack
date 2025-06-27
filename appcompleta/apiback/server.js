
// backend en ES6
import express from 'express'; // importamos express
import mongoose from 'mongoose'; // importamos mongoose

const app = express(); // creamos la aplicación express
const PORT = process.env.PORT || 8080; // definimos el puerto

// conectamos a la base de datos
mongoose.connect('mongodb://localhost:27017/apiback', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// definimos un esquema y modelo de ejemplo
const ejemploSchema = new mongoose.Schema({
    nombre: String,
    edad: Number
});

const Ejemplo = mongoose.model('Ejemplo', ejemploSchema);

// definimos una ruta de ejemplo
app.get('/api/ejemplo', async (req, res) => {
    const ejemplos = await Ejemplo.find();
    res.json(ejemplos);
});

// iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

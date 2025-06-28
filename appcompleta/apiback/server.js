
// backend en ES6
//const express = require('express'); // importamos express
import express from 'express'; // importamos express
import cors from 'cors'; // importamos cors

const app = express(); // creamos la aplicación express
const PORT = process.env.PORT || 8080; // definimos el puerto

app.use(cors()); // habilitamos cors
app.use(express.json()); // habilitamos el parsing de JSON

//ruta healthcheck
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Hola mundo desde el backend en express</h1>`);
});

//ruta para el registro de usuarios
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    // Aquí iría la lógica para registrar al usuario en la base de datos
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

//ruta para el login de usuarios
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    console.log(`Intentando iniciar sesión con email: ${email} y password: ${password}`);

    //try {
        
        if (email== "pepe@gmail.com" || password == "1234") {
            res.status(200).json({ message: 'Usuario logueado exitosamente' })
        }else{
            console.error('Error al iniciar sesión:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
    //} catch (error) {
        }

        
        
   // }
    
    // Aquí iría la lógica para verificar las credenciales del usuario
});



// iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



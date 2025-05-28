// importamos el modelo de datosPersona

const DatosPersona = require('../models/datosPersonaModel'); // importamos el modelo de datosPersona

// import el la respuesta del check
const { validationResult } = require('express-validator'); // importamos la respuesta del check


// importamos las validaciones
const validaciones = require('../helpers/validacionoesUsers'); // importamos las validaciones

// Importamos el paquete bcrypt para encriptar la contraseña
const bcrypt = require('bcrypt'); // importamos el paquete bcrypt para encriptar la contraseña

// importamos el UUID para crear IDs propios
const { v4: uuidv4 } = require('uuid');

// Obtenemos los datos de Usuarios de la base de datos
const getUsers = async (req, res) => {
    try {
        const usuarios = await DatosPersona.find(); // buscamos todos los datos en la base de datos

     /*    const respuesta = {
            nombre: usuarios.nombre,
            email: usuarios.email,
            mensaje: usuarios.mensaje
        } */

        console.log(usuarios); // mostramos los datos en la consola
        
        res.status(200).render('usuarios',  {
            usuarios:usuarios //enderizamos la vista usuarios.hbs y le pasamos los datos
        }); // enviamos los datos en formato json
    } catch (error) {
        console.error(error); // mostramos el error en la consola
        res.status(500).send('Error al obtener los datos'); // enviamos un mensaje de error
    }
}


// Insertamos los datos de Usuarios en la base de datos
const registrarUsers = async (req, res) => {

    const erroresValidacion = validationResult(req); // obtenemos los errores de la validacion
    if (!erroresValidacion.isEmpty()) {
        return res.status(400).render('contacto', {
            mensaje: erroresValidacion.array()[0].msg // enviamos el primer mensaje de error
        });
    }

    // Variables para respuestas
    const errorUsers = 'Error al registrar el usuario'; // mensaje de error

    const { nombre, email, password, telefono, mensaje } = req.body; // destructuramos el body de la peticion

    const datos = {
        _id: uuidv4(), // creamos un id unico para el usuario
        nombre,
        email,
        password,
        telefono,
        mensaje
    }; // creamos un objeto con los datos de la peticion

    console.log(datos._id); // mostramos los datos en la consola


   //onst validarCorrecto = validaciones.validarEmail(email, password, ); // validamos el email
 // validaciones.validarPassword(password); // validamos la contraseña
    
    // Validamos los datos
    if (!nombre || !email || !password || !telefono) {
        return res.status(400).render('contacto', { 
            mensaje: respuesta.errorUsers // enviamos un mensaje de error    
        }); // enviamos un mensaje de error
    }
    
    try {
        
            // Validamos el email unico
            const emailExistente = await DatosPersona.find({ email })//scamos el email en la base de datos
        
            console.log(`Email: ${emailExistente}`); // mostramos el email en la consola
            
        
            if (emailExistente.length > 0) {
                return res.status(400).render('contacto', {
                    mensaje: errorUsers // enviamos un mensaje de error
                });
            }
        
            console.log(datos); // mostramos los datos en la consola

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);

        console.log(`Salt: ${salt}`); // mostramos el salt en la consola
        

        datos.password = await bcrypt.hash(password, salt);

        console.log(`Password: ${datos.password}`); // mostramos la contraseña en la consola
        

        const nuevoDato = new DatosPersona(datos); // creamos un nuevo objeto de la clase DatosPersona

        // guardamos los datos en la base de datos
        await nuevoDato.save(); // guardamos el objeto en la base de datos
        
        res.status(200).render('respuesta');

    } catch (error) {
        
        console.error(error); // mostramos el error en la consola
        res.status(500).send('Error al guardar los datos'); // enviamos un mensaje de error
    }
    
}

    
module.exports = {
    registrarUsers,
    getUsers
};
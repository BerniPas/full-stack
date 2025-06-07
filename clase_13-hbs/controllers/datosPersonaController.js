// traemos las variables de entorno
const dotenv = require("dotenv");
dotenv.config();

// importamos el modelo de datosPersona
const DatosPersona = require('../models/datosPersonaModel'); // importamos el modelo de datosPersona

// librería para envío de mail
const nodemailer = require("nodemailer");

// import el la respuesta del check
const { validationResult } = require('express-validator'); // importamos la respuesta del check

// agregamos validaciones con JOI
const Joi = require('joi');

// Librería de JWT
const jwt = require('jsonwebtoken'); // importamos la librería de JWT

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

        res.status(200).render('usuarios', {
            usuarios: usuarios //enderizamos la vista usuarios.hbs y le pasamos los datos
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

        //enviar un email de bienvenida
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.GOOGLE_CLIENT,
                pass: process.env.GOOGLE_SECRET,
            },
        });

        // Wrap in an async IIFE so we can use await.
        (async () => {
            const info = await transporter.sendMail({
                from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
                to: `${email}`, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<h1>Gracias ${nombre} por registrarte en nuestra app!</h1> <br>
                <img src="https://static.educacionit.com/educacionit/assets/imagotype-it-fill-v2-color.svg">
                    <a href="https://www.educacionit.com/" target= "_blank">Visitanos</a>`,
            });

            console.log("Message sent:", info.messageId);
        })();

/*         ((email, nombre)=> {

        })(); */

        res.status(200).render('respuesta');

    } catch (error) {

        console.error(error); // mostramos el error en la consola
        res.status(500).send('Error al guardar los datos'); // enviamos un mensaje de error
    }

}


// creamos nuestra función de login para los users
const loginUsers = async (req, res) => {

    //validamos los datos del body
    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'El email es obligatorio',
            'string.empty': 'El email es obligatorio'
        }),
        password: Joi.string().min(8).required().messages({
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
            'string.empty': 'La contraseña es obligatoria'
        })
    });

    const { error } = loginSchema.validate(req.body); // validamos los datos del body
    if (error) {
        return res.status(400).render('contacto', {
            mensaje: error.details[0].message // enviamos el primer mensaje de error
        });
    }

    const { email, password } = req.body; // destructuramos el body de la peticion

    console.log(`Email: ${email}`); // mostramos el email en la consola
    console.log(`Password: ${password}`); // mostramos la contraseña en la consola

    try {
        // buscamos al usuario por email
        const usuario = await DatosPersona.findOne({ email }); // buscamos el usuario por email

        console.log(`Usuario: ${usuario}`); // mostramos el usuario en la consola
        if (!usuario) {
            return res.status(400).render('contacto', {
                mensaje: 'Favor registrarse' // enviamos un mensaje de error
            });
        }

        //verificar el password
        const passwordValido = await bcrypt.compare(password, usuario.password); // comparamos la contraseña
        console.log(`Password valido: ${passwordValido}`); // mostramos si la contraseña es valida en la consola

        if (!passwordValido) {
            return res.status(400).render('contacto', {
                mensaje: 'Usuario o contraseña incorrecta' // enviamos un mensaje de error
            });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email }, // payload del token
            process.env.JWT_SECRET, // clave secreta del token
            { expiresIn: '1h' } // tiempo de expiración del token
        );


        console.log(`Token: ${token}`); // mostramos el token en la consola




        // respondemos con a vista del admin y con el token
        res.status(200).cookie('Token', token, { httpOnly: true }).render('admin', {
            mensaje: `Bienvenido al panel de administración ${usuario.nombre}` // enviamos un mensaje de éxito
        });





    } catch (error) {
        console.error(error); // mostramos el error en la consola
        return res.status(500).render('contacto', {
            mensaje: 'Error al iniciar sesión' // enviamos un mensaje de error
        });

    }


}

// eliminamos el usuario por id
const deleteUser = async (req, res) => {

    // recuperamos el id del usuario
    const { id } = req.params; // obtenemos el id del usuario

    console.log(`ID: ${id}`); // mostramos el id en la consola


    try {
        // buscamos el usuario por id
        const usuario = await DatosPersona.findById(id);

        console.log(`Usuario: ${usuario}`); // mostramos el usuario en la consola

        if (!usuario) {
            return res.status(404).render('login', {
                mensaje: 'Usuario no encontrado' // enviamos un mensaje de error
            });
        }

        // eliminamos el usuario
        await DatosPersona.findByIdAndDelete(id);
        res.status(200).render('login', {
            mensaje: 'Usuario eliminado correctamente' // enviamos un mensaje de éxito
        });

    } catch (error) {
        console.error(error); // mostramos el error en la consola
        res.status(500).render('login', {
            mensaje: 'Error al eliminar el usuario' // enviamos un mensaje de error
        });
    }
}


module.exports = {
    registrarUsers,
    loginUsers,
    getUsers,
    deleteUser
};
// importamos el modelo de datosPersona

const DatosPersona = require('../models/datosPersonaModel'); // importamos el modelo de datosPersona


// Obtenemos los datos de Usuarios de la base de datos
const getUsers = async (req, res) => {
    try {
        const usuarios = await DatosPersona.find(); // buscamos todos los datos en la base de datos

        console.log(usuarios); // mostramos los datos en la consola
        
        res.status(200).render('usuarios',  {
            usuarios: usuarios // renderizamos la vista usuarios.hbs y le pasamos los datos
        }); // enviamos los datos en formato json
    } catch (error) {
        console.error(error); // mostramos el error en la consola
        res.status(500).send('Error al obtener los datos'); // enviamos un mensaje de error
    }
}


// Insertamos los datos de Usuarios en la base de datos
const envioDatos = async (req, res) => {
    
    const { nombre, email, telefono, mensaje } = req.body; // destructuramos el body de la peticion

    const datos = {
        nombre,
        email,
        telefono,
        mensaje
    }; // creamos un objeto con los datos de la peticion

    console.log(datos); // mostramos los datos en la consola

    try {
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
    envioDatos,
    getUsers
};
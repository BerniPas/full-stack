
const router = require('express').Router(); // importamos express router

// importamos express-validator
const { check } = require('express-validator'); // importamos express-validator

// responde a la ruta /api

// ejemplo de middleware para validar el body de la peticion
const validarPost = (req, res, next) => {
    
        const { nombre, email, password, telefono } = req.body; // destructuramos el body de la peticion
        if (!nombre || !email || !password || !telefono) {
            return res.status(400).render('contacto', { 
                mensaje: 'Error al registrar el usuario' // enviamos un mensaje de error    
            }); // enviamos un mensaje de error
        }
        next();
    }

// Importamos el controlador de la página
const {
    registrarUsers,
    loginUsers,
    getUsers,
    deleteUser
} = require('../controllers/datosPersonaController'); // importamos el controlador de la página

//router.post('/', validarPost, registrarUsers); una opción de middleware para validar el body de la peticion

// valicación de datos con express-validator
router.post('/', 
    [
        check('nombre').isString().notEmpty().withMessage('El nombre es obligatorio'), // validamos el nombre
        check('email').isString().isEmail().withMessage('El email es obligatorio'), // validamos el email
        check('password').isString().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'), // validamos la contraseña
        check('telefono').isString().notEmpty().withMessage('El telefono es obligatorio') // validamos el telefono
    ], 
    registrarUsers
); 



// ruta al login del user
router.post('/login', loginUsers);


router.get('/traermongo', getUsers);

router.delete('/delete/:id', deleteUser); // cerramos la ruta de contacto

//router.post('/editaruser/:_id', ); // cerramos la ruta de alta

//router.get('/info', ); // cerramos la ruta de contacto

module.exports = router; // exportamos el router para usarlo en otros archivos



const router = require('express').Router(); // importamos express router

// responde a la ruta /api

// Importamos el controlador de la página
const {
    envioDatos,
    getUsers
} = require('../controllers/datosPersonaController'); // importamos el controlador de la página

router.post('/', envioDatos);

router.get('/traermongo', getUsers);

//router.post('/', ); // cerramos la ruta de alta

//router.get('/info', ); // cerramos la ruta de contacto

module.exports = router; // exportamos el router para usarlo en otros archivos



// Importamos express router
const router = require('express').Router(); // importamos express router

// responde a la ruta /

// Importamos el controlador de la página
const { 
    homeApp, 
    altaApp, 
    contactoApp, 
    nosotrosApp,
    traerDatos
} = require('../controllers/controllerRouter'); // importamos el controlador de la página


router.get('/', homeApp); 

router.get('/alta', altaApp); // cerramos la ruta de alta

router.get('/contacto', contactoApp);

router.get('/nosotros', nosotrosApp);

router.get('/traerdatos', traerDatos)

module.exports = router; // exportamos el router para usarlo en otros archivos
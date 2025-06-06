const { check } = require('express-validator');

const router = require('express').Router(); 

const { 
    registrarProductos,
    formularioProductos,
    getProductos,
    getCards,
    deleteProductos,
    updateProductos,
    updateForm
} = require('../controllers/productosControllers'); 


router.post('/',
    [
        check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        check('precio').isNumeric().withMessage('El precio debe ser un número'),
        check('imagen').notEmpty().withMessage('La imagen es obligatoria')
    ], 
    registrarProductos);

router.get('/form', formularioProductos);

router.get('/', getProductos);

router.get('/cards', getCards);

router.post('/delete/:_id', deleteProductos);
router.post('/update/:_id', updateProductos);

router.get('/updateForm/:_id', updateForm);

module.exports = router; 


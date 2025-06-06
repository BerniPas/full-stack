const { validationResult } = require("express-validator");

const Producto = require('../models/productosModels');

const registrarProductos = async (req, res) => {

    const validar = validationResult(req);

    if (!validar.isEmpty()) {
        return res.status(400).render('error', { 
            error: validar.array() 
        });
    }

    const { nombre, precio, imagen, descripcion } = req.body;

    const producto = {
        nombre,
        precio,
        imagen,
        descripcion
    }

    try {

        const nuevoProducto = new Producto(producto);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);

    } catch (error) {

        console.error(error);
        return res.status(500).render('error', { 
            error: { msg: 'Error al registrar el producto' }
        });

    }
}

const formularioProductos = (req, res) => {
    res.render('formProductos');
}

const getProductos = async (req, res) => {
    try {
        const producto = await Producto.find();
        res.render('productList', { producto });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { 
            error: { msg: 'Error al obtener los productos' }
        });
    }
}

const getCards = async (req, res) => {
    try {
        const producto = await Producto.find();
        res.render('cardsProductos', { producto });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { 
            error: { msg: 'Error al obtener los productos' }
        });
    }
}

const deleteProductos = async (req, res) => {

    const { _id } = req.params;

    try {
        const producto = await Producto.findByIdAndDelete(_id);
        if (!producto) {
            return res.status(404).render('error', { 
                error: { msg: 'Producto no encontrado' }
            });
        }
        res.status(200).json({ msg: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { 
            error: { msg: 'Error al eliminar el producto' }
        });
    }
}

const updateProductos = async (req, res) => {

    const { _id } = req.params;
    const { nombre, precio, imagen, descripcion } = req.body;

    try {

        const productoViejo = await Producto.findById(_id);

        console.log(`Producto viejo: ${productoViejo}`);
        
        const producto = await Producto.findByIdAndUpdate(_id, {
            nombre,
            precio,
            imagen,
            descripcion
        }, { new: true });

        console.log(`Producto actualizado: ${producto}`);
        

        if (!producto) {
            return res.status(404).render('error', { 
                error: { msg: 'Producto no encontrado' }
            });
        }

        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { 
            error: { msg: 'Error al actualizar el producto' }
        });
    }
}

const updateForm = async (req, res) => {

    const idProduct = req.params._id;

    console.log(idProduct);

    try {

        const producto = await Producto.findById({_id: idProduct});
        console.log(producto);

        if (!producto) {
            return res.status(404).render('error', { 
                error: { msg: 'Producto no encontrado' }
            });
        }

        const _id = producto._id;
        const imagen = producto.imagen;
        const nombre = producto.nombre;
        const precio = producto.precio;
        const descripcion = producto.descripcion;
        
        console.log(imagen);
    
    
        return res.render('updateForm', {
            _id,
            imagen,
            nombre,
            precio,
            descripcion
        })
        
    } catch (error) {
        console.log(error);
        return res.render('error', {
            error: 'No se ha encontrado el producto'
        })
    }
}

module.exports = {
    registrarProductos,
    formularioProductos,
    getProductos,
    getCards,
    deleteProductos,
    updateProductos,
    updateForm
}
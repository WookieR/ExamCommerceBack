const { response } = require('express');

const Producto = require('../models/producto.model');

const obtenerProductos = async(req, res = response) => {
    try{
        const productos = await Producto.find();

        res.json({
            ok: true,
            productos
        });

    } catch(error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const obtenerProductoPorId = async(req, res = response) => {

    id = req.params.id;

    try {
        const productoDb = await Producto.findById(id);

        if(!productoDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el producto'
            });
        }

        res.json({
            ok: true,
            producto: productoDb
        });

    } catch(error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const obtenerProductoPorCodigo = async(req, res = response) => {
    
    codigo = req.params.codigo;

    try{
        const productoDb = await Producto.findOne({codigo: codigo});

        if(!productoDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el producto'
            })
        }

        res.json({
            ok: true,
            producto: productoDb
        });

    } catch(error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const crearProducto = async(req, res = response) => {
    try{
        const producto = new Producto({
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            marca: req.body.marca,
            fechaVencimiento: req.body.fechaVencimiento,
            precioUnitario: req.body.precioUnitario,
            proveedor: req.body.proveedor
        });

        const productoDb = await producto.save();

        res.json({
            ok: true,
            producto: productoDb
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    } 
}

const actualizarProducto = async(req, res = response) => {

    id = req.params.id;

    try{
        const productoDb = await Producto.findById(id);

        if(!productoDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el producto'
            });
        }

        const cambiosProducto = {
            ...req.body
        };

        const productoActualizado = await Producto.findByIdAndUpdate(id, cambiosProducto, {new: true});

        res.json({
            ok: true,
            producto: productoActualizado
        });

    } catch(error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const eliminarProducto = async(req, res = response) => {
    id = req.params.id;

    try{
        const productoDb = await Producto.findById(id);

        if(!productoDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el producto'
            });
        }

        await Producto.findByIdAndDelete(id);

        res.json({
            ok: true,
            message: 'Producto eliminado'
        });

    } catch(error){
        res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductoPorCodigo,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}
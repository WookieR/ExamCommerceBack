const { Router } = require('express');

const {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductoPorCodigo,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos.controller');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', obtenerProductoPorId);

router.get('/codigo/:codigo', obtenerProductoPorCodigo);

router.post('/', crearProducto);

router.put('/:id', actualizarProducto);

router.delete('/:id', eliminarProducto);

module.exports = router;
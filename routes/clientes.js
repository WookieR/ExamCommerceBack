const { Router } = require('express');

const {
    obtenerClientes,
    obtenerClientePorId,
    obtenerClientePorTarjeta,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} = require('../controllers/clientes.controller');

const router = Router();

router.get('/', obtenerClientes);

router.get('/:id', obtenerClientePorId);

router.get('/tarjeta/:tarjeta', obtenerClientePorTarjeta);

router.post('/', crearCliente);

router.put('/:id', actualizarCliente);

router.delete('/:id', eliminarCliente);

module.exports = router;
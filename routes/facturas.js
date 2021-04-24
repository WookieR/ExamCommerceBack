const { Router } = require('express');

const {
    obtenerFacturas,
    obtenerFacturaPorId,
    obtenerFacturasPorCliente,
    crearFactura,
    actualizarFactura,
    eliminarFactura
} = require('../controllers/facturas.controller');

const router = Router();

router.get('/', obtenerFacturas);

router.get('/:id', obtenerFacturaPorId);

router.get('/cliente/:id', obtenerFacturasPorCliente);

router.post('/', crearFactura);

router.put('/:id', actualizarFactura);

router.delete('/:id', eliminarFactura);

module.exports = router;
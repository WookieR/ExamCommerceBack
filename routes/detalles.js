const { Router } = require('express');

const {
    obtenerDetallesPorFacturaId
} = require('../controllers/detalles.controller');

const router = Router();

router.get('/:id', obtenerDetallesPorFacturaId);

module.exports = router;
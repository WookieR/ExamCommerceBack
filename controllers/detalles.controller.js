const express = require('express');
const { response } = require('express');

const Detalle = require('../models/detalle.model');

const obtenerDetallesPorFacturaId = async(req, res = response) => {
    id = req.params.id;

    try {
        const detalles = await Detalle.find({factura: id})

        res.json({
            ok: true,
            detalles
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    obtenerDetallesPorFacturaId
}
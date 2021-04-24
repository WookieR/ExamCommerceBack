const { response } = require('express');

const Empleado = require('../models/empleado.model');
const Cliente = require('../models/cliente.model');
const Factura = require('../models/factura.model');
const Detalle = require('../models/detalle.model');
const Producto = require('../models/producto.model');

const obtenerFacturas = async(req, res = response) => {
    try{
        const facturas = await Factura.find();

        res.json({
            ok: true,
            facturas
        });
    } catch(error){
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const obtenerFacturaPorId = async(req, res = response) => {

    id = req.params.id;

    try{
        const facturaDb = await Factura.findById(id).populate('cliente').populate('empleado');
        
        if(!facturaDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro la factura'
            });
        }

        const detalles = await Detalle.find({factura: id});

        res.json({
            ok: true,
            factura: facturaDb,
            detalles
        });

    } catch(error){
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const obtenerFacturasPorCliente = async(req, res = response) => {
    id = req.params.id;
    try{
        const clienteDb = await Cliente.findById(id);

        if(!clienteDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el cliente'
            });
        }

        const facturas = await Factura.find({cliente: id}).populate('cliente').populate('empleado');

        res.json({
            ok: true,
            facturas
        });

    } catch(error){
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const crearFactura = async(req, res = response) => {

    try{
        const clienteDb = await Cliente.findById(req.body.cliente);
        if(!clienteDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el cliente'
            })
        }

        const empleadoDb = await Empleado.findById(req.body.empleado);
        if(!empleadoDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el empleado'
            })
        }

        const factura = new Factura({
            numeroFactura: req.body.numeroFactura,
            cliente: clienteDb._id,
            empleado: empleadoDb._id,
            total: req.body.total,
            fecha: Date.now()
        });

        const facturaDb = await factura.save();

        if(facturaDb){
            req.body.detalles.forEach(async(detalle) => {
                const detalleNuevo = new Detalle({
                    ...detalle,
                    subtotal: detalle.precioUnitario * detalle.cantidad,
                    factura: facturaDb._id
                });
    
                await detalleNuevo.save();
            });
    
            res.json({
                ok: true,
                factura: facturaDb
            });
        }

    } catch(error){
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const actualizarFactura = async(req, res = response) => {
    id = req.params.id;

    try{
        const facturaDb = await Factura.findById(id);

        if(!facturaDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro la factura'
            });
        }

        const cambiosFactura = {
            ...req.body
        };

        const facturaActualizada = await Factura.findByIdAndUpdate(id, cambiosFactura, {new: true});

        res.json({
            ok: true,
            factura: facturaActualizada
        });

    } catch(error){
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const eliminarFactura = async(req, res = response) => {
    id = req.params.id;
    try{
        const facturaDb = await Factura.findById(id);
        if(!facturaDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro la factura'
            });
        }

        await Factura.findByIdAndDelete(id);

        res.json({
            ok: true,
            message: 'Se elimino la factura'
        });

    } catch(error){
        res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    obtenerFacturas,
    obtenerFacturaPorId,
    obtenerFacturasPorCliente,
    crearFactura,
    actualizarFactura,
    eliminarFactura
}
const express = require('express');
const { response } = require('express');

const Cliente = require('../models/cliente.model');

const obtenerClientes = async(req, res = response) => {

    try{

        const clientes = await Cliente.find();

        res.json({
            ok: true,
            clientes
        });

    } catch(error) {

        res.status(500).json({
            ok: false,
            error
        })

    }
}

const obtenerClientePorId = async(req, res = response) => {

    id = req.params.id;

    try{
        const clienteDb = await Cliente.findById(id);

        if(!clienteDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el cliente'
            });
        }

        res.json({
            ok: true,
            cliente: clienteDb
        });

    } catch(error) {
        res.status(500).json({
            ok: false,
            error
        })
    }
}

const obtenerClientePorTarjeta = async(req, res = response) => {
    tarjeta = req.params.tarjeta;

    try {
        const clienteDb = await Cliente.findOne({tarjetaCredito: tarjeta});

        if(!clienteDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el cliente'
            });
        }

        res.json({
            ok: true,
            cliente: clienteDb
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}
  

const crearCliente = async(req, res = response) => {

    try{
        
        const cliente = new Cliente({
            tarjetaCredito: req.body.tarjetaCredito,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            fechaDeNacimiento: req.body.fechaDeNacimiento,
            edad: req.body.edad
        });

        const clienteDb = await cliente.save();

        res.json({
            ok: true,
            cliente: clienteDb
        });

    }catch (error){
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const actualizarCliente = async(req, res = response) => {

    id = req.params.id;

    try{
        const clienteDb = await Cliente.findById(id);

        if(!clienteDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el cliente'
            })
        }

        const cambiosCliente = {
            ...req.body
        };

        const clienteActualizado = await Cliente.findByIdAndUpdate(id, cambiosCliente, {new: true});

        res.json({
            ok: true,
            cliente: clienteActualizado
        });

    } catch(error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const eliminarCliente = async(req, res = response) => {
    id = req.params.id;

    try{
        const clienteDb = await Cliente.findById(id);

        if(!clienteDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el cliente'
            })
        }

        await Cliente.findByIdAndDelete(id);

        res.json({
            ok: true,
            message: 'Cliente eliminado'
        });

    } catch(error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    obtenerClientePorTarjeta,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}
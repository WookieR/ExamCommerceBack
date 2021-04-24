const { response } = require('express');

const Empleado = require('../models/empleado.model');

const obtenerEmpleados = async(req, res = response) => {

    try{

        const empleados = await Empleado.find();

        res.json({
            ok: true,
            empleados
        });

    }catch (error){
        res.status(500).json({
            ok: false,
            error
        });
    }

}

const obtenerEmpleadoPorId = async(req, res = response) => {

    id = req.params.id;

    try{

        const empleadoDb = await Empleado.findById(id);

        if(!empleadoDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontró el empleado'
            });
        }

        res.json({
            ok: true,
            empleado: empleadoDb
        });

    } catch (error){
        res.status(500).json({
            ok: false,
            error
        });
    } 
}

const obtenerEmpleadoPorLegajo = async(req, res = response) => {
    legajo = req.params.legajo;

    try {

        const empleadoDb = await Empleado.findOne({legajo: legajo});

        if(!empleadoDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el empleado'
            });
        }

        res.json({
            ok: true,
            empleado: empleadoDb
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const crearEmpleado = async(req, res = response) => {
    try{
        
        const empleado = new Empleado({
            legajo: req.body.legajo,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            fechaDeNacimiento: req.body.fechaNacimiento,
            edad: req.body.edad
        });

        const empleadoDb = await empleado.save();

        res.json({
            ok: true,
            empleado: empleadoDb
        });

    }catch (error){
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const actualizarEmpleado = async(req, res = response) => {

    id = req.params.id;

    try{

        const empleadoDb = await Empleado.findById(id);

        if(!empleadoDb){
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el empleado'
            })
        }

        const cambiosEmpleado = {
            ...req.body
        };

        const empleadoActualizado = await Empleado.findByIdAndUpdate(id, cambiosEmpleado, {new: true});

        res.json({
            ok: true,
            empleado: empleadoActualizado
        });

    } catch(error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const eliminarEmpleado = async(req, res = response) => {
    id = req.params.id;

    try{
        const empleadoDb = await Empleado.findById(id);

        if(!empleadoDb){
            return res.status(404).json({
                ok: true,
                message: 'No se encontro el empleado'
            })
        }

        await Empleado.findByIdAndDelete(id);

        res.json({
            ok: true,
            message: 'Empleado eliminado'
        })

    } catch(error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    obtenerEmpleadoPorLegajo,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
}
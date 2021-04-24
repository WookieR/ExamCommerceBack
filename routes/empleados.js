const { Router } = require('express');

const {
    obtenerEmpleados,
    crearEmpleado,
    obtenerEmpleadoPorId,
    obtenerEmpleadoPorLegajo,
    actualizarEmpleado,
    eliminarEmpleado
} = require('../controllers/empleados.controller');

const router = Router();

router.get('/', obtenerEmpleados);

router.get('/:id', obtenerEmpleadoPorId);

router.get('/legajo/:legajo', obtenerEmpleadoPorLegajo);

router.post('/', crearEmpleado);

router.put('/:id', actualizarEmpleado);

router.delete('/:id', eliminarEmpleado);

module.exports = router;
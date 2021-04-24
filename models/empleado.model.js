const { Schema, model } = require('mongoose');

let empleadoSchema = Schema({
    legajo: { type: String, required: true},
    nombre: { type: String, required: true },
    apellido: {type: String, required: true},
    dni: { type: String, required: true},
    fechaDeNacimiento: { type: Date },
    edad: { type: Number}
}, { collection: 'empleados' });

empleadoSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
});

module.exports = model('Empleado', empleadoSchema);
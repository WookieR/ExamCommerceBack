const { Schema, model } = require('mongoose');

let clienteSchema = Schema({
    tarjetaCredito: { type: String, required: true},
    nombre: { type: String, required: true },
    apellido: {type: String, required: true},
    dni: { type: String, required: true},
    fechaDeNacimiento: { type: Date },
    edad: { type: Number}
}, { collection: 'clientes' });

clienteSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
});

module.exports = model('Cliente', clienteSchema);
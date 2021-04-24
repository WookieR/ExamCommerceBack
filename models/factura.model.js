const { Schema, model } = require('mongoose');

let facturaSchema = Schema({
    numeroFactura: { type: String, required: true},
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
    empleado: {type: Schema.Types.ObjectId, ref: 'Empleado', required: true},
    total: { type: Number, required: true},
    fecha: { type: Date, required: true }
}, { collection: 'facturas' });

facturaSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
});

module.exports = model('Factura', facturaSchema);
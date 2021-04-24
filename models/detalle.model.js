const { Schema, model } = require('mongoose');

let detalleSchema = Schema({
    factura: {type: Schema.Types.ObjectId, ref: 'Factura', required: true},
    producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    nombreProducto: { type: String, required: true},
    precioUnitario: { type: Number, required: true},
    cantidad: { type: Number, required: true},
    subtotal: { type: Number, required: true},
}, { collection: 'detalles' });

detalleSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
});

module.exports = model('Detalle', detalleSchema);
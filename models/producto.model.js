const { Schema, model, Number } = require('mongoose');

let productoSchema = Schema({
    codigo: { type: String, required: true},
    nombre: { type: String, required: true},
    marca: { type: String, required: true },
    fechaVencimiento: { type: Date },
    precioUnitario: { type: Number, required: true},
    proveedor: { type: String, required: true }
}, { collection: 'productos' });

productoSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
});

module.exports = model('Producto', productoSchema);
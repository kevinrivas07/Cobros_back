const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  total: Number,
  interes: Number,
  abono: Number,
  fecha: String
});

const loanSchema = new mongoose.Schema({
  nombre: String,
  monto: Number,
  interes: Number,
  total: Number,
  cuotas: Number,
  frecuencia: String,
  fecha: String,
  fechaFinal: String,
  terminado: String, // Puede ser "sí", "no", "pendiente", etc.
  pagos: [pagoSchema]
});

module.exports = mongoose.model('Loan', loanSchema);

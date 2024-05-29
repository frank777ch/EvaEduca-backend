const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  dni: { type: String, required: true },
  rol: { type: String, required: true },
  institucionID: { type: mongoose.Schema.Types.ObjectId, ref: 'InstitucionEducativa', required: true },
  celular: { type: String, required: true },
  correoContacto: { type: String, required: true },
  estado: { type: String, default: 'DESHABILITADO' }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
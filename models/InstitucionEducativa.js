const mongoose = require('mongoose');

const InstitucionEducativaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  tipo: { type: String, required: true },
  direccion: { type: String, required: true },
  ciudad: { type: String, required: true },
  estado: { type: String, required: true },
  pais: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String },
  paginaWeb: { type: String },
  contadorAdmins: { type: Number, default: 0 },
  contadorProfesores: { type: Number, default: 0 },
  contadorAlumnos: { type: Number, default: 0 }
});

module.exports = mongoose.model('InstitucionEducativa', InstitucionEducativaSchema);
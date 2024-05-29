const mongoose = require('mongoose');

const SuperAdministradorSchema = new mongoose.Schema({
  seudonimo: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true }
});

module.exports = mongoose.model('SuperAdministrador', SuperAdministradorSchema);
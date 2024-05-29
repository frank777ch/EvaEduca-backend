const express = require('express');
const InstitucionEducativa = require('../models/InstitucionEducativa');
const router = express.Router();

// Crear Institución Educativa
router.post('/create', async (req, res) => {
  try {
    const { nombre, tipo, direccion, ciudad, estado, pais, telefono, correo, paginaWeb } = req.body;
    const codigo = `IE${await InstitucionEducativa.countDocuments()}`;

    const nuevaInstitucion = new InstitucionEducativa({
      nombre,
      codigo,
      tipo,
      direccion,
      ciudad,
      estado,
      pais,
      telefono,
      correo,
      paginaWeb
    });

    await nuevaInstitucion.save();
    res.status(201).json({ message: 'Institución educativa creada exitosamente', institucion: nuevaInstitucion });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear institución educativa', error });
  }
});

// Obtener todas las Instituciones Educativas
router.get('/', async (req, res) => {
  try {
    const instituciones = await InstitucionEducativa.find();
    res.json(instituciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener instituciones educativas', error });
  }
});

module.exports = router;
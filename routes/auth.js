const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const InstitucionEducativa = require('../models/InstitucionEducativa');
const SuperAdministrador = require('../models/SuperAdministrador');
const router = express.Router();

// Registro de usuarios (Administrador, Profesor, Alumno)
router.post('/register', async (req, res) => {
  try {
    const { nombres, apellidos, usuario, contraseña, dni, rol, institucionID, celular, correoContacto } = req.body;
    const institucion = await InstitucionEducativa.findById(institucionID);

    if (!institucion) {
      return res.status(400).json({ message: 'Institución educativa no encontrada' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    let codigo;
    switch (rol) {
      case 'Administrador':
        codigo = `${institucion.codigo}ADMIN${institucion.contadorAdmins}`;
        institucion.contadorAdmins += 1;
        break;
      case 'Profesor':
        codigo = `${institucion.codigo}PROF${institucion.contadorProfesores}`;
        institucion.contadorProfesores += 1;
        break;
      case 'Alumno':
        codigo = `${institucion.codigo}ALUM${institucion.contadorAlumnos}`;
        institucion.contadorAlumnos += 1;
        break;
      default:
        return res.status(400).json({ message: 'Rol no válido' });
    }

    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
      usuario,
      contraseña: hashedPassword,
      codigo,
      dni,
      rol,
      institucionID,
      celular,
      correoContacto
    });

    await nuevoUsuario.save();
    await institucion.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const user = await Usuario.findOne({ usuario });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    if (user.estado !== 'HABILITADO') {
      return res.status(403).json({ message: 'Cuenta deshabilitada' });
    }

    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, usuario: user });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

module.exports = router;
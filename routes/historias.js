const express = require('express');
const router = express.Router();
const historiasController = require('../controllers/historiasController');

// Ruta para la página principal
router.get('/', historiasController.listarHistorias);

// Rutas para crear historias
router.get('/crear', historiasController.mostrarFormulario);
router.post('/crear', historiasController.crearHistoria);

// Rutas para ver, editar y eliminar historias
router.get('/historia/:id', historiasController.verHistoria);
router.get('/editar/:id', historiasController.mostrarFormularioEdicion);
router.post('/editar/:id', historiasController.editarHistoria);
router.post('/eliminar/:id', historiasController.eliminarHistoria);
router.post('/cambiar-estado/:id', historiasController.cambiarEstado);

module.exports = router;

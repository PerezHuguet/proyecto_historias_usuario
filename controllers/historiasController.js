const Historia = require('../models/historia');
const path = require('path');
const fileHandler = require('../utils/fileHandler');

const dataPath = path.join(__dirname, '../data/historias.json');

// Listar todas las historias
exports.listarHistorias = (req, res) => {
    try {
        const historias = fileHandler.readData(dataPath);
        res.render('index', { 
            titulo: 'Historias de Usuario',
            historias: historias
        });
    } catch (error) {
        console.error('Error al listar historias:', error);
        res.status(500).render('error', { 
            titulo: 'Error',
            mensaje: 'Error al cargar las historias de usuario'
        });
    }
};

// Mostrar formulario de creación
exports.mostrarFormulario = (req, res) => {
    res.render('crear', { 
        titulo: 'Crear Historia de Usuario',
        historia: {}
    });
};

// Crear una nueva historia
exports.crearHistoria = (req, res) => {
    try {
        const { titulo, descripcion, criterios, prioridad, estimacion } = req.body;
        
        // Validación básica
        if (!titulo || !descripcion) {
            return res.status(400).render('crear', {
                titulo: 'Crear Historia de Usuario',
                mensaje: 'El título y la descripción son obligatorios',
                historia: req.body
            });
        }
        
        const nuevaHistoria = new Historia(
            titulo,
            descripcion,
            criterios,
            prioridad,
            estimacion
        );
        
        const historias = fileHandler.readData(dataPath);
        historias.push(nuevaHistoria);
        fileHandler.writeData(dataPath, historias);
        
        res.redirect('/');
    } catch (error) {
        console.error('Error al crear historia:', error);
        res.status(500).render('error', { 
            titulo: 'Error',
            mensaje: 'Error al crear la historia de usuario'
        });
    }
};

// Ver detalles de una historia
exports.verHistoria = (req, res) => {
    try {
        const id = req.params.id;
        const historias = fileHandler.readData(dataPath);
        const historia = historias.find(h => h.id === id);
        
        if (!historia) {
            return res.status(404).render('404', { 
                titulo: 'Historia no encontrada',
                mensaje: 'La historia que buscas no existe'
            });
        }
        
        res.render('historia', { 
            titulo: historia.titulo,
            historia: historia
        });
    } catch (error) {
        console.error('Error al ver historia:', error);
        res.status(500).render('error', { 
            titulo: 'Error',
            mensaje: 'Error al cargar la historia de usuario'
        });
    }
};

// Mostrar formulario de edición
exports.mostrarFormularioEdicion = (req, res) => {
    try {
        const id = req.params.id;
        const historias = fileHandler.readData(dataPath);
        const historia = historias.find(h => h.id === id);
        
        if (!historia) {
            return res.status(404).render('404', { 
                titulo: 'Historia no encontrada',
                mensaje: 'La historia que intentas editar no existe'
            });
        }
        
        res.render('editar', { 
            titulo: 'Editar Historia de Usuario',
            historia: historia
        });
    } catch (error) {
        console.error('Error al mostrar formulario de edición:', error);
        res.status(500).render('error', { 
            titulo: 'Error',
            mensaje: 'Error al cargar el formulario de edición'
        });
    }
};

// Editar una historia existente
exports.editarHistoria = (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, descripcion, criterios, prioridad, estimacion, estado } = req.body;
        
        // Validación básica
        if (!titulo || !descripcion) {
            return res.status(400).render('editar', {
                titulo: 'Editar Historia de Usuario',
                mensaje: 'El título y la descripción son obligatorios',
                historia: { ...req.body, id }
            });
        }
        
        const historias = fileHandler.readData(dataPath);
        const index = historias.findIndex(h => h.id === id);
        
        if (index === -1) {
            return res.status(404).render('404', { 
                titulo: 'Historia no encontrada',
                mensaje: 'La historia que intentas editar no existe'
            });
        }
        
        // Mantener la fecha de creación original
        const fechaCreacion = historias[index].fechaCreacion;
        
        historias[index] = {
            id,
            titulo,
            descripcion,
            criterios,
            prioridad,
            estimacion,
            estado: estado || historias[index].estado,
            fechaCreacion
        };
        
        fileHandler.writeData(dataPath, historias);
        
        res.redirect('/');
    } catch (error) {
        console.error('Error al editar historia:', error);
        res.status(500).render('error', { 
            titulo: 'Error',
            mensaje: 'Error al editar la historia de usuario'
        });
    }
};

// Eliminar una historia
exports.eliminarHistoria = (req, res) => {
    try {
        const id = req.params.id;
        let historias = fileHandler.readData(dataPath);
        
        const index = historias.findIndex(h => h.id === id);
        
        if (index === -1) {
            return res.status(404).render('404', { 
                titulo: 'Historia no encontrada',
                mensaje: 'La historia que intentas eliminar no existe'
            });
        }
        
        historias = historias.filter(h => h.id !== id);
        fileHandler.writeData(dataPath, historias);
        
        res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar historia:', error);
        res.status(500).render('error', { 
            titulo: 'Error',
            mensaje: 'Error al eliminar la historia de usuario'
        });
    }
};

// Cambiar el estado de una historia
exports.cambiarEstado = (req, res) => {
    try {
        const id = req.params.id;
        const { estado } = req.body;
        
        if (!estado) {
            return res.status(400).json({ error: 'El estado es obligatorio' });
        }
        
        const historias = fileHandler.readData(dataPath);
        const index = historias.findIndex(h => h.id === id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Historia no encontrada' });
        }
        
        historias[index].estado = estado;
        fileHandler.writeData(dataPath, historias);
        
        res.json({ success: true, estado });
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        res.status(500).json({ error: 'Error al cambiar el estado' });
    }
};

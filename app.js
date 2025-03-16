const express = require('express');
const path = require('path');
const historiasRoutes = require('./routes/historias');
const fileHandler = require('./utils/fileHandler');

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', historiasRoutes);

// Verificar que el archivo de datos exista
const dataPath = path.join(__dirname, 'data/historias.json');
fileHandler.ensureFileExists(dataPath, []);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).render('404', { 
        titulo: 'Página no encontrada',
        mensaje: 'La página que estás buscando no existe.'
    });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        titulo: 'Error en el servidor',
        mensaje: 'Ha ocurrido un error en el servidor.',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

module.exports = app;

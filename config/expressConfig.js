/**
 * Configuración de Express
 * Este archivo centraliza la configuración de Express para mantener app.js limpio
 */
const express = require('express');
const path = require('path');

/**
 * Configura la aplicación Express con los middlewares y ajustes necesarios
 * @param {Object} app - La instancia de la aplicación Express
 */
function configurarExpress(app) {
    // Configurar el motor de plantillas EJS
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'views'));

    // Middleware para procesar datos de formularios
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Configurar carpeta de archivos estáticos
    app.use(express.static(path.join(__dirname, '..', 'public')));

    // Middleware para agregar variables globales a todas las vistas
    app.use((req, res, next) => {
        res.locals.url = req.originalUrl;
        next();
    });

    return app;
}

module.exports = configurarExpress;

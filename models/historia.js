const { v4: uuidv4 } = require('uuid');

class Historia {
    constructor(titulo, descripcion, criterios, prioridad, estimacion) {
        this.id = uuidv4();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.criterios = criterios || '';
        this.prioridad = prioridad || 'Media';
        this.estimacion = estimacion || '1';
        this.estado = 'Pendiente';
        this.fechaCreacion = new Date().toISOString();
    }
}

module.exports = Historia;

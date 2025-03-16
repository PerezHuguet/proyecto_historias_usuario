const fs = require('fs');
const path = require('path');

// Leer datos del archivo JSON
exports.readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Si el archivo no existe, crear uno vacío
            this.writeData(filePath, []);
            return [];
        }
        throw error;
    }
};

// Escribir datos en el archivo JSON
exports.writeData = (filePath, data) => {
    try {
        const dirPath = path.dirname(filePath);
        
        // Asegurar que el directorio exista
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        throw error;
    }
};

// Asegurar que el archivo exista
exports.ensureFileExists = (filePath, defaultData = []) => {
    try {
        if (!fs.existsSync(filePath)) {
            this.writeData(filePath, defaultData);
        }
    } catch (error) {
        throw error;
    }
};

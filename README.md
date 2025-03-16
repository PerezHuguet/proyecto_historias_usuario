# Gestor de Historias de Usuario

## Descripción
Este proyecto tiene como objetivo organizar y estructurar las historias de usuario de un proyecto de desarrollo de software. Las historias de usuario son descripciones cortas y simples de una funcionalidad deseada o un problema que se necesita resolver, escritas desde la perspectiva del usuario final.  Esta organización facilita la comprensión, la priorización y la gestión del desarrollo del software.
Una aplicación web desarrollada con Node.js y Express para gestionar historias de usuario en proyectos ágiles.

## Descripción

El Gestor de Historias de Usuario es una herramienta que permite crear, editar, visualizar y gestionar historias de usuario para metodologías ágiles. Facilita el seguimiento del progreso de las historias a través de diferentes estados y prioridades.

## Características

- Crear nuevas historias de usuario con título, descripción, criterios de aceptación, prioridad y estimación
- Visualizar todas las historias en un tablero principal
- Editar historias existentes
- Eliminar historias
- Cambiar el estado de las historias (Pendiente, En Progreso, Completada, etc.)
- Interfaz intuitiva y responsive

## Tecnologías utilizadas

- **Backend**: Node.js, Express
- **Frontend**: EJS (plantillas), JavaScript, CSS
- **Almacenamiento**: Sistema de archivos (JSON)
- **Otras librerías**: UUID para generación de identificadores únicos

## Requisitos previos

- Node.js (v12 o superior)
- npm (v6 o superior)

## Instalación

1. Clonar el repositorio:
git clone cd gestor-historias-usuario

2. Instalar dependencias:
npm install

3. Iniciar la aplicación:
npm start

Para desarrollo con recarga automática:
npm run dev

4. Acceder a la aplicación en el navegador:
<http://localhost:3000>

## Estructura del proyecto

├── app.js # Punto de entrada de la aplicación
├── routes # Definición de rutas
│ └── historias.js 
├── controllers # Lógica de negocio 
│ └── historiasController.js 
├── models # Modelos de datos 
│ └── historia.js 
├── views # Plantillas EJS 
│ ├── partials 
│ │ ├── header.ejs 
│ │ └── footer.ejs 
│ ├── index.ejs 
│ ├── crear.ejs 
│ ├── editar.ejs 
│ ├── error.ejs 
│ └── 404.ejs 
├── public # Archivos estáticos 
│ ├── style.css 
│ └── script.js 
├── data # Almacenamiento de datos 
│ └── historias.json 
├── utils # Utilidades 
│ └── fileHandler.js 
└── config # Configuraciones 
└── expressConfig.js

## Uso

1. **Crear una historia**: Haz clic en "Nueva Historia" y completa el formulario con título, descripción, criterios de aceptación, prioridad y estimación.

2. **Ver historias**: La página principal muestra todas las historias creadas con su información básica.

3. **Editar historia**: Haz clic en el botón "Editar" de una historia para modificar sus detalles.

4. **Eliminar historia**: Utiliza el botón "Eliminar" para borrar una historia.

5. **Cambiar estado**: Actualiza el estado de una historia para reflejar su progreso.

## Licencia

ROBERTO PÉREZ HUGUET 2025


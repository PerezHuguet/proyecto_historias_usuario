document.addEventListener('DOMContentLoaded', function() {
    // Cambiar estado de las historias
    const estadoSelects = document.querySelectorAll('.estado-select');
    
    estadoSelects.forEach(select => {
        select.addEventListener('change', function() {
            const id = this.getAttribute('data-id');
            const estado = this.value;
            
            fetch(`/cambiar-estado/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Actualizar la clase de la tarjeta para reflejar el nuevo estado
                    const card = this.closest('.historia-card');
                    card.className = 'historia-card ' + estado.toLowerCase().replace(' ', '-');
                    
                    // Actualizar el texto del estado
                    const estadoSpan = card.querySelector('.estado');
                    if (estadoSpan) {
                        estadoSpan.textContent = 'Estado: ' + estado;
                    }
                    
                    // Mostrar mensaje de éxito
                    mostrarMensaje('Estado actualizado correctamente', 'success');
                } else {
                    mostrarMensaje('Error al actualizar el estado', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarMensaje('Error al actualizar el estado', 'error');
            });
        });
    });
    
    // Función para mostrar mensajes temporales
    function mostrarMensaje(mensaje, tipo) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje ${tipo}`;
        mensajeDiv.textContent = mensaje;
        
        document.body.appendChild(mensajeDiv);
        
        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeDiv.classList.add('fadeOut');
            setTimeout(() => {
                document.body.removeChild(mensajeDiv);
            }, 500);
        }, 3000);
    }
});

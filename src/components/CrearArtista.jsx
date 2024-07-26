import { useRef } from "react";
import api from "../services/api";

export function CrearArtista() {
    // useRef para obtener el valor del input
    const nombreRef = useRef();

    // Función para agregar un nuevo artista
    async function addArtista() {
        const nombre = nombreRef.current.value;

        // Objeto artista con el nombre del input
        const artista = {
            nombre: nombre
        };

        try {
            // Realiza una petición POST para crear un nuevo artista
            await api.post('/artistas/', artista);
            alert('Artista creado');
            // Limpia el input
            nombreRef.current.value = '';
            // Redirige a la lista de artistas
            window.location.href = `/list-artistas/`;
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    return (
        <div>
            <h2>Crear artista</h2>
            {/* Input para ingresar el nombre del artista */}
            <input ref={nombreRef} type="text" placeholder="Ingrese nombre de artista" />
            {/* Botón para agregar el artista */}
            <button onClick={addArtista}>Agregar</button>
        </div>
    );
}

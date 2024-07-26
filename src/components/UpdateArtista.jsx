import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export function UpdateArtista() {
    // useParams para obtener el id de los parámetros de la URL
    const { id } = useParams();
    const nombreRef = useRef();
    
    // useEffect para obtener los datos del artista cuando el componente se monta
    useEffect(() => {
        console.log(id);
        const getArtista = async () => {
            try {
                // Realiza una petición GET para obtener los datos del artista
                const response = await api.get(`/artistas/${id}/`);
                nombreRef.current.value = response.data.nombre;
            } catch (error) {
                // Manejo de errores
                console.log(error.message);
            }
        }
        getArtista();
    }, [id]);

    // Función para actualizar los datos del artista
    async function actualizarArtista() {
        try {
            console.log(id);
            // Realiza una petición PUT para actualizar los datos del artista
            await api.put(`/artistas/${id}/`, { id: id, nombre: nombreRef.current.value });
            alert('Se actualizó artista');
            // Redirige a la lista de artistas
            window.location.href = '/list-artistas';
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    return (
        <div>
            <h2>Actualizar artista</h2>
            {/* Input para actualizar el nombre del artista */}
            <input ref={nombreRef} type="text" />
            {/* Botón para actualizar el artista */}
            <button onClick={actualizarArtista}>Actualizar</button>
        </div>
    );
}

import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export function UpdateGenero() {
    // useParams para obtener el id de los parámetros de la URL
    const { id } = useParams();
    const nameRef = useRef();

    // useEffect para obtener los datos del género cuando el componente se monta
    useEffect(() => {
        console.log(id);

        const getGenero = async () => {
            try {
                // Realiza una petición GET para obtener los datos del género
                const response = await api.get(`/generos/${id}/`);
                console.log(response.data);
                nameRef.current.value = response.data.nombre;
            } catch (error) {
                // Manejo de errores
                console.log(error.message);
            }
        }

        getGenero();
    }, [id]);

    // Función para actualizar los datos del género
    async function actualizarGenero() {
        try {
            const newGenero = {
                id: id,
                nombre: nameRef.current.value
            }

            // Realiza una petición PUT para actualizar los datos del género
            await api.put(`/generos/${id}/`, newGenero);
            alert('Se actualizó género');
            // Redirige a la lista de géneros
            window.location.href = '/list-generos';
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    return (
        <div>
            <h2>Actualizar género</h2>
            {/* Input para actualizar el nombre del género */}
            <input ref={nameRef} type="text" placeholder="Ingrese nuevo nombre del género" />
            {/* Botón para actualizar el género */}
            <button onClick={actualizarGenero}>Actualizar</button>
        </div>
    );
}

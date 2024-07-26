import { useRef } from "react";
import api from "../services/api";

export function CreateGenero() {
    // useRef para obtener el valor del input
    const nameRef = useRef();

    // Función para agregar un nuevo género
    async function addGenero() {
        const nombre = nameRef.current.value;
        console.log(nombre);
        try {
            // Realiza una petición POST para crear un nuevo género
            await api.post('/generos/', { nombre: nombre });
            alert('Género creado');
            // Limpia el input
            nameRef.current.value = '';
            // Redirige a la lista de géneros
            window.location.href = '/list-generos';
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    return (
        <div>
            {/* Input para ingresar el nombre del género */}
            <input ref={nameRef} placeholder="Ingrese nombre del género" />
            {/* Botón para agregar el género */}
            <button onClick={addGenero}>Agregar</button>
        </div>
    );
}

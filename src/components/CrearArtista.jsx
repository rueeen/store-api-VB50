import { useRef } from "react";
import api from "../services/api";

export function CrearArtista() {
    const nombreRef = useRef();

    async function addArtista(){
        const nombre = nombreRef.current.value;

        const artista = {
            nombre: nombre
        }

        try {
            await api.post('/artistas/', artista);
            alert('Artista creado');
            nombreRef.current.value = '';
            window.location.href = `/list-artistas/`;
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <h2>Crear artista</h2>
            <input ref={nombreRef} type="text" placeholder="Ingrese nombre de artista" />
            <button onClick={addArtista}>Agregar</button>
        </div>
    )
}
import { useRef } from "react";
import api from "../services/api";

export function CrearArtista() {
    const nombreRef = useRef();

    function addArtista(){
        const nombre = nombreRef.current.value;

        const artista = {
            nombre:nombre
        }

        api.post('/artistas/', artista)
        .then(response => {
            alert("Artista creado");
        }).catch(error => {
            alert(error.message);
        })
    }

    return (
        <div>
            <input ref={nombreRef} type="text" placeholder="Ingrese nombre de artista"/>
            <button onClick={addArtista}>Agregar</button>
        </div>
    )
}
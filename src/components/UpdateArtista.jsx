import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import api from "../services/api";

export function UpdateArtista() {
    const { id } = useParams();
    const nombreRef = useRef();
    
    useEffect(()=>{
        console.log(id);
        const getArtista = async () => {
            try{
                const response = await api.get(`/artistas/${id}/`);
                nombreRef.current.value = (await response).data.nombre;
            }catch(error){
                console.log(error.message);
            }
        }
        getArtista();
    }, [id]);

    async function actualizarArtista(id){
        try{
            console.log(id);
            await api.put(`/artistas/${id}/`, {id:id, nombre:nombreRef.current.value});
            alert('Se actualizo artista');
            window.location.href = '/list-artistas';
        }catch(error){
            console.log(error.message);
        }
    }

    return (
        <div>
            <h2>Actualizar artista</h2>
            <input ref={nombreRef} type="text" />
            <button onClick={() => actualizarArtista(id)}>Actualizar</button>
        </div>
    )
}
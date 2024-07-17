import { useEffect, useState } from "react"
import api from "../services/api";

export function ArtistaLista(){
    const [artistaList, setArtistaList] = useState([]);

    useEffect(() => {
        api.get('/artistas/')
        .then(response => {
            setArtistaList(response.data)
        }).catch(error => {
            console.log(error.message);
        })
    }, [])

    return(
        <div>
            <h1>Listado de artista</h1>
            {
                artistaList.map(artista => <p>ID: {artista.id} NOMBRE: {artista.nombre}</p>)
            }
        </div>
    )
}
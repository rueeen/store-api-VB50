import { useEffect, useState } from "react"
import api from "../services/api";

export function ArtistaLista() {
    const [artistaList, setArtistaList] = useState([]);

    const fetchArtistas = async () => {
        try {
            const response = await api.get('/artistas/');
            setArtistaList(response.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchArtistas();
    }, [artistaList])

    async function deleteArtista(id){
        console.log(id);
        try{
            await api.delete(`/artistas/${id}/`);
            alert('Se elimino artista');
            fetchArtistas();
        }catch(error){
            console.log(error.message);
        }
    }

    function updateArtista(id){
        console.log(id);
        window.location.href = `/update-artistas/${id}`;
    }

    return (
        <div>
            <h2>Listado de artista</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapea sobre la lista de géneros y crea una fila para cada uno */}
                    {
                        artistaList.map(artista => (
                            <tr key={artista.id}>
                                <td>{artista.id}</td>
                                <td>{artista.nombre}</td>
                                <td>
                                    {/* Botón para eliminar el género */}
                                    <button onClick={ () => deleteArtista(artista.id)}>Eliminar</button>
                                    {/* Botón para actualizar el género */}
                                    <button onClick={ () => updateArtista(artista.id)}>Actualizar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
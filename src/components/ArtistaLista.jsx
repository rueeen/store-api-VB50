import { useEffect, useState } from "react";
import api from "../services/api";

export function ArtistaLista() {
    // Estado para almacenar la lista de artistas
    const [artistaList, setArtistaList] = useState([]);

    // Función para obtener la lista de artistas desde la API
    const fetchArtistas = async () => {
        try {
            // Realiza una petición GET a la ruta /artistas/
            const response = await api.get('/artistas/');
            // Actualiza el estado con los datos obtenidos
            setArtistaList(response.data);
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    // useEffect para ejecutar fetchArtistas cuando el componente se monte
    useEffect(() => {
        fetchArtistas();
    }, []);

    // Función para eliminar un artista por su id
    async function deleteArtista(id) {
        console.log(id);
        try {
            // Realiza una petición DELETE a la ruta /artistas/{id}
            await api.delete(`/artistas/${id}/`);
            alert('Se eliminó artista');
            // Vuelve a obtener la lista de artistas para actualizar el estado
            fetchArtistas();
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    // Función para redirigir a la página de actualización de un artista
    function updateArtista(id) {
        console.log(id);
        // Redirige a la ruta de actualización con el id del artista
        window.location.href = `/update-artistas/${id}`;
    }

    return (
        <div>
            <h2>Listado de artistas</h2>
            {/* Tabla para mostrar la lista de artistas */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapea sobre la lista de artistas y crea una fila para cada uno */}
                    {
                        artistaList.map(artista => (
                            <tr key={artista.id}>
                                <td>{artista.id}</td>
                                <td>{artista.nombre}</td>
                                <td>
                                    {/* Botón para eliminar el artista */}
                                    <button onClick={() => deleteArtista(artista.id)}>Eliminar</button>
                                    {/* Botón para actualizar el artista */}
                                    <button onClick={() => updateArtista(artista.id)}>Actualizar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

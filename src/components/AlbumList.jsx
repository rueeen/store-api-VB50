import { useEffect, useState } from "react";
import api from "../services/api";

export function AlbumList() {
    // Estado para almacenar la lista de álbumes
    const [listAlbums, setListaAlbums] = useState([]);

    // Función para obtener la lista de álbumes desde la API
    async function fetchAlbums() {
        try {
            // Realiza una petición GET a la ruta /albums/
            const response = await api.get('/albums/');
            // Actualiza el estado con los datos obtenidos
            setListaAlbums(response.data);
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    // useEffect para ejecutar fetchAlbums cuando el componente se monte
    useEffect(() => {
        fetchAlbums();
    }, []);

    // Función para eliminar un álbum por su id
    async function deleteAlbum(id) {
        console.log(id);
        try {
            // Realiza una petición DELETE a la ruta /albums/{id}
            await api.delete(`/albums/${id}/`);
            alert('Se eliminó álbum');
            // Vuelve a obtener la lista de álbumes para actualizar el estado
            fetchAlbums();
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    // Función para redirigir a la página de actualización de un álbum
    function updateAlbum(id) {
        // Redirige a la ruta de actualización con el id del álbum
        window.location.href = `/update-albums/${id}`;
    }

    return (
        <div className="container">
            <h2>Listado de álbumes</h2>
            {/* Tabla para mostrar la lista de álbumes */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Publicación</th>
                        <th>Artista</th>
                        <th>Géneros</th>
                        <th>Portada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapea sobre la lista de álbumes y crea una fila para cada uno */}
                    {
                        listAlbums.map(album => (
                            <tr key={album.id}>
                                <td>{album.id}</td>
                                <td>{album.titulo}</td>
                                <td>{album.precio}</td>
                                <td>{album.stock}</td>
                                <td>{album.publicacion}</td>
                                <td>{album.artista.nombre}</td>
                                <td>
                                    <ul>
                                        {/* Mapea sobre la lista de géneros del álbum */}
                                        {
                                            album.genero.map(genero => (
                                                <li key={genero.id}>{genero.nombre}</li>
                                            ))
                                        }
                                    </ul>
                                </td>
                                <td><img src={album.portada} alt="Portada álbum" width={80} height={80} /></td>
                                <td>
                                    {/* Botón para eliminar el álbum */}
                                    <button className="btn btn-danger" onClick={() => deleteAlbum(album.id)}>Eliminar</button>
                                    {/* Botón para actualizar el álbum */}
                                    <button className="btn btn-warning" onClick={() => updateAlbum(album.id)}>Editar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

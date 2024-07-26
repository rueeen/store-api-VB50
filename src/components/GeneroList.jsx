import { useEffect, useState } from "react"
import api from "../services/api"

export function GeneroList() {
    /**
     * api es un objeto de tipo axios
     * por lo tanto tiene métodos PUT, POST, GET, DELETE
     */
    
    // Estado para almacenar la lista de géneros
    const [listadoGeneros, setListadoGeneros] = useState([]);

    // Función para obtener la lista de géneros desde la API
    const fetchGeneros = async () => {
        try {
            // Realiza una petición GET a la ruta /generos/
            const response = await api.get('/generos/');
            // Actualiza el estado con los datos obtenidos
            setListadoGeneros(response.data);
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    // useEffect para ejecutar fetchGeneros cuando el componente se monte
    useEffect(() => {
        fetchGeneros();
    }, []);

    // Función para eliminar un género por su id
    async function deleteGenero(id) {
        console.log(id);
        try {
            // Realiza una petición DELETE a la ruta /generos/{id}
            await api.delete(`/generos/${id}`);
            alert('Se eliminó género');
            // Vuelve a obtener la lista de géneros para actualizar el estado
            fetchGeneros();
        } catch (error) {
            // Manejo de errores
            console.log(error.message);
        }
    }

    // Función para redirigir a la página de actualización de un género
    function updateGenero(id) {
        console.log(id);
        // Redirige a la ruta de actualización con el id del género
        window.location.href = `/update-generos/${id}`
    }

    return (
        <div className="container">
            <h2>Listado de géneros</h2>
            {/* Tabla para mostrar la lista de géneros */}
            <table className="table">
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
                        listadoGeneros.map(g => (
                            <tr key={g.id}>
                                <td>{g.id}</td>
                                <td>{g.nombre}</td>
                                <td>
                                    {/* Botón para eliminar el género */}
                                    <button className="btn btn-danger" onClick={() => deleteGenero(g.id)}>Eliminar</button>
                                    {/* Botón para actualizar el género */}
                                    <button className="btn btn-warning" onClick={() => updateGenero(g.id)}>Actualizar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

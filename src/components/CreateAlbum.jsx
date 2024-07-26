import { useState, useEffect } from "react";
import api from "../services/api";

export function CreateAlbum() {
    /** Variables para el formulario */
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [publicacion, setPublicacion] = useState('');
    const [portada, setPortada] = useState(null);
    const [artista, setArtista] = useState(0);
    const [generos, setGeneros] = useState([]);

    /** Hooks para traer datos */
    const [artistaList, setArtistaList] = useState([]);
    const [listadoGeneros, setListadoGeneros] = useState([]);

    // Función para obtener la lista de artistas desde la API
    const fetchArtistas = async () => {
        try {
            const response = await api.get('/artistas/');
            setArtistaList(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // useEffect para ejecutar fetchArtistas cuando el componente se monte
    useEffect(() => {
        fetchArtistas();
    }, []);

    // Función para obtener la lista de géneros desde la API
    const fetchGeneros = async () => {
        try {
            const response = await api.get('/generos/');
            setListadoGeneros(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // useEffect para ejecutar fetchGeneros cuando el componente se monte
    useEffect(() => {
        fetchGeneros();
    }, []);

    // Función para manejar el envío del formulario
    const handleSubmit = async (evento) => {
        evento.preventDefault();
        console.log("Se previno la acción por defecto");

        // Capturando datos del formulario
        console.log(titulo, precio, stock, generos, artista, portada, publicacion);
        const album = new FormData(); // Clase de JS que envía datos al servidor
        album.append('titulo', titulo);
        album.append('stock', stock);
        album.append('artista', artista);
        album.append('publicacion', publicacion);
        album.append('precio', precio);
        album.append('portada', portada); // Esto es un archivo de tipo file
        generos.forEach(g => album.append('genero', g));

        try {
            await api.post('/albums/', album, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Álbum agregado');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Crear álbum</h2>
            <form onSubmit={handleSubmit}>
                <label>Título</label>
                <input type="text" className="form-control" onChange={(e) => setTitulo(e.target.value)} />

                <label>Precio</label>
                <input type="number" className="form-control" onChange={(e) => setPrecio(Number(e.target.value))} />

                <label>Stock</label>
                <input type="number" className="form-control" onChange={(e) => setStock(Number(e.target.value))} />

                <label>Publicación</label>
                <input type="date" className="form-control" onChange={(e) => setPublicacion(e.target.value)} />

                <label>Portada</label>
                <input type="file" className="form-control" onChange={(e) => setPortada(e.target.files[0])} />

                <label>Artista</label>
                <select className="form-control" onChange={(e) => setArtista(Number(e.target.value))}>
                    <option value="0" disabled selected>--Seleccione--</option>
                    {artistaList.map(artista => <option key={artista.id} value={artista.id}>{artista.nombre}</option>)}
                </select>

                <label>Géneros</label>
                <select multiple className="form-control" onChange={(e) => setGeneros(Array.from(e.target.selectedOptions, option => option.value))}>
                    {listadoGeneros.map(genero => <option key={genero.id} value={genero.id}>{genero.nombre}</option>)}
                </select>
                <button className="btn btn-success my-2">Agregar</button>
            </form>
        </div>
    );
}

import { useState, useEffect } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export function UpdateAlbum() {
    // Hook para obtener el parámetro `id` de la URL
    const { id } = useParams();

    // Variables de estado para el formulario
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [publicacion, setPublicacion] = useState('');
    const [portada, setPortada] = useState(null);
    const [artista, setArtista] = useState(0);
    const [generos, setGeneros] = useState([]);

    // Variables de estado para listas de artistas y géneros
    const [artistaList, setArtistaList] = useState([]);
    const [listadoGeneros, setListadoGeneros] = useState([]);

    // Función para obtener datos del álbum actual
    const fetchAlbum = async () => {
        try {
            const response = await api.get(`/albums/${id}/`);
            console.log(response.data);
            setTitulo(response.data.titulo);
            setPrecio(response.data.precio);
            setStock(response.data.stock);
            setPublicacion(response.data.publicacion);
            setGeneros(response.data.genero);
            setArtista(response.data.artista);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Función para obtener la lista de artistas
    const fetchArtistas = async () => {
        try {
            const response = await api.get('/artistas/');
            setArtistaList(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Función para obtener la lista de géneros
    const fetchGeneros = async () => {
        try {
            const response = await api.get('/generos/');
            setListadoGeneros(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // useEffect para cargar datos iniciales del álbum, artistas y géneros
    useEffect(() => {
        fetchAlbum();
    }, [id]);

    useEffect(() => {
        fetchArtistas();
    }, []);

    useEffect(() => {
        fetchGeneros();
    }, []);

    // Función para manejar el envío del formulario
    const handleSubmit = async (evento) => {
        evento.preventDefault();
        console.log("Se previno la acción por defecto");

        // Creación de un objeto FormData para enviar los datos
        const album = new FormData();
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
                <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                <label>Precio</label>
                <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />

                <label>Stock</label>
                <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />

                <label>Publicación</label>
                <input type="date" className="form-control" value={publicacion} onChange={(e) => setPublicacion(e.target.value)} />

                <label>Portada</label>
                <input type="file" className="form-control" onChange={(e) => setPortada(e.target.files[0])} />

                <label>Artista</label>
                <select className="form-control" value={artista} onChange={(e) => setArtista(e.target.value)}>
                    <option value="0" disabled>--Seleccione--</option>
                    {artistaList.map(artista => (
                        <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                    ))}
                </select>

                <label>Géneros</label>
                <select multiple className="form-control" value={generos} onChange={(e) => setGeneros(Array.from(e.target.selectedOptions, option => option.value))}>
                    {listadoGeneros.map(genero => (
                        <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                    ))}
                </select>
                <button className="btn btn-success my-2">Agregar</button>
            </form>
        </div>
    );
}

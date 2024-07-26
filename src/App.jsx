import { GeneroList } from "./components/GeneroList";
import { CreateGenero } from "./components/CreateGenero";
import { UpdateGenero } from "./components/UpdateGenero";
import { ArtistaLista } from "./components/ArtistaLista";
import { CrearArtista } from "./components/CrearArtista";
import { UpdateArtista } from "./components/UpdateArtista";
import { AlbumList } from "./components/AlbumList";
import { CreateAlbum } from "./components/CreateAlbum";
import { UpdateAlbum } from "./components/UpdateAlbum";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function App() {
    return (
        <Router>
            <div>
                <h1>CRUD STORE</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to='/list-generos'>Lista Generos</Link>
                        </li>
                        <li>
                            <Link to='/create-generos'>Crear Generos</Link>
                        </li>
                        <li>
                            <Link to='/list-artistas'>Lista artistas</Link>
                        </li>
                        <li>
                            <Link to='/create-artistas'>Crear artistas</Link>
                        </li>
                        <li>
                            <Link to='/list-albums'>Listar albums</Link>
                        </li>
                        <li>
                            <Link to='/create-albums'>Crear albums</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/list-generos' element={<GeneroList />} />
                    <Route path='/create-generos' element={<CreateGenero />} />
                    <Route path='/update-generos/:id' element={<UpdateGenero />} />
                    <Route path="/list-artistas" element={<ArtistaLista />} />
                    <Route path="/create-artistas" element={<CrearArtista />} />
                    <Route path="/update-artistas/:id" element={<UpdateArtista />} />
                    <Route path="/list-albums" element={<AlbumList />} />
                    <Route path="/create-albums" element={<CreateAlbum />} />
                    <Route path="/update-albums/:id" element={<UpdateAlbum />} />
                </Routes>
            </div>
        </Router>
    )
}
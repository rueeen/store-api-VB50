import { ArtistaLista } from "./components/ArtistaLista";
import { CrearArtista } from "./components/CrearArtista";
import { UpdateArtista } from "./components/UpdateArtista";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/list-artistas'>Lista artistas</Link>
                        </li>
                        <li>
                        <Link to='/create-artistas'>Crear artistas</Link>
                        </li>
                    </ul>
                </nav>
                <Routes >
                    <Route path="/list-artistas" element={<ArtistaLista />} />
                    <Route path="/create-artistas" element={<CrearArtista />} />
                    <Route path="/update-artistas/:id" element={<UpdateArtista />} />
                </Routes>
            </div>
        </Router>
    )
}
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'; {/*SACAR */}


const Navigation = () => {
    const location = useLocation();
    if (location.pathname === '/')
        return null;
    if (location.pathname === '/' || location.pathname === '/Carrito' || location.pathname === '/publicarLibro') {
        return null; // No renderiza nada en estas páginas
    }
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>

                </li>
                <li>
                    <Link to="/Libros">Novedades</Link>

                </li>
                <li>
                    <Link to="/Carrito">Carrito</Link>

                </li>
                <li>
                    <Link to="/Compra">Comprar</Link>

                </li>
                <li>
                    <Link to="/Favs">Favoritos</Link>

                </li>
                <li>
                    <Link to="/Libro">Ver libro</Link>

                </li>
                <li>
                    <Link to="/Registrarse">Registrarse</Link>

                </li>
                <li>
                    <Link to="/Usuario">Usuario</Link>

                </li>
                <li>
                    <Link to="/publicarLibro">PublicarLibro</Link>

                </li>
                <li>
                <Link to="/ListaLibros/1">Ver lista de libros del género 1</Link>

                </li>
            </ul>
        </nav>
    )
}

export default Navigation
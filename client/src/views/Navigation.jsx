import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'; {/*SACAR */}


const Navigation = () => {
    const location = useLocation();
    if (
        location.pathname === '/' || 
        location.pathname === '/Carrito' || 
        location.pathname === '/publicarLibro' || 
        location.pathname === '/Compra' ||
        location.pathname === '/Usuario' ||
        location.pathname === '/Registrarse' ||
        location.pathname === '/LoginPage' ||
        location.pathname === '/Cupones' ||
        location.pathname === '/Favs' ||
        /^\/ListaLibros\/\d+$/.test(location.pathname) || // Verifica si la ruta comienza con '/ListaLibros/' y sigue con un número
        /^\/Libro\/\d+$/.test(location.pathname) ||
        location.pathname === '/verOrdenes'||
        /^\/DetallesOrden\/\d+$/.test(location.pathname)
    ) {
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

                </li> {/* agrega cosas a la lista*/}
                <li>
                    <Link to="/publicarLibro">PublicarLibro</Link>

                </li>
                <li>
                    <Link to="/DetallesOrden">DetallesOrden</Link>

                </li>
                
            </ul>
        </nav>
    )
}

export default Navigation
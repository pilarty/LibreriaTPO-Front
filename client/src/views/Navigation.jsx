import { Link } from "react-router-dom"

const Navigation = () => {
    if (location.pathname === '/') { {/*SACAR */}
        return null; // No renderiza nada en la página del inicio
}

if (location.pathname === '/publicarLibro') { {/*SACAR */}
        return null;
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
            </ul>
        </nav>
    )
}

export default Navigation
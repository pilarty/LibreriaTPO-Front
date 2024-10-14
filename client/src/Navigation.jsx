import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'; {/*SACAR */}


const Navigation = () => {
    const location = useLocation();
    if (location.pathname === '/Singup') { {/*SACAR */}
        return null; // No renderiza nada en la página del carrito
    }
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>

                </li>
                <li>
                    <Link to="/Login">Inicio de Sesion</Link>

                </li>
                <li>
                    <Link to="/Signup">Registrarse</Link>

                </li>
            </ul>
        </nav>
    )
}

export default Navigation
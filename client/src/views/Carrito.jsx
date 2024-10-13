import { useNavigate } from 'react-router-dom';
import LibroCarritoList from '../components/LibroCarritoList';
import TotalCarrito from "../components/TotalCarrito"
import './Carrito.css'; 

const Carrito = () => {

    const navigate = useNavigate();

    const manejarSeguirComprando = () => {
        navigate("/");
    }

    return (
    <>
        <h2 className="subtitulo">Tu Carrito</h2>
        <div className="carrito-contenedor">
            <div className="lista-boton">
                    <LibroCarritoList />
                    <button className="seguir-comprando" onClick={manejarSeguirComprando}>Seguir comprando</button>
                </div>
            <div className="separator"></div>
            <TotalCarrito />
        </div>
    
    </>
);
};

export default Carrito;
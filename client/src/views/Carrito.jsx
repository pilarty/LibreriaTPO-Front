import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LibroCarritoList from '../components/LibroCarritoList';
import TotalCarrito from "../components/TotalCarrito"
import './Carrito.css'; 

const Carrito = () => {

    const navigate = useNavigate();

    const [subtotal, setSubtotal] = useState(0); // Estado para almacenar el subtotal total

    const manejarSeguirComprando = () => {
        navigate("/");
    }

    const manejarCalcularTotal = (total) => {
        setSubtotal(total); // Actualizar el subtotal cuando se calcula
    };

    return (
    <>
        <h2 className="subtitulo">Tu Carrito</h2>
        <div className="carrito-contenedor">
            <div className="lista-boton">
                    <LibroCarritoList onCalcularTotal={manejarCalcularTotal}/>
                    <button className="seguir-comprando" onClick={manejarSeguirComprando}>Seguir comprando</button>
            </div>
            <div className="separator"></div>
            <TotalCarrito subtotal={subtotal}/>
        </div>
    
    </>
);
};

export default Carrito;
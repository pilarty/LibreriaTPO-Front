import LibroCarritoList from '../components/LibroCarritoList';
import TotalCarrito from "../components/TotalCarrito"
import './Carrito.css'; 

const Carrito = () => {
    return (
    <>
        <h2 className="subtitulo">Tu Carrito</h2>
        <div className="carrito-contenedor">
            <LibroCarritoList />
            <TotalCarrito />
        </div>
    </>
);
};

export default Carrito;
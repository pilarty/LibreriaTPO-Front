import LibroCarritoList from '../components/LibroCarritoList';
import './Carrito.css'; 

const Carrito = () => {
    return (
    <>
        <h2 className="subtitulo">Tu Carrito</h2>
        <hr />
        <div className="carrito-contenedor">
            <LibroCarritoList />
            <div className="total-carrito">
                <h3>Total del carrito</h3>
                <p>$</p>
            </div>
        </div>
    </>
);
};

export default Carrito;
import LibroCarritoList from '../components/LibroCarritoList';
import './Carrito.css'; 

const Carrito = () => {
    return (
    <>
    <h2 className="subtitulo">Tu Carrito</h2>
    <hr />
    <LibroCarritoList />
    </>
);
};

export default Carrito;
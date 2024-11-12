import { useDispatch } from 'react-redux';
import { actualizarCantidadProducto } from '../Redux/productoCarritoSlice'; 
import { useState, useEffect } from 'react';

const LibroCarrito = ({ image, titulo, precio, cantidad, isbn, carrito_mail, onDelete }) => {
    const dispatch = useDispatch();
    const [cantidadActual, setCantidad] = useState(cantidad);
    
    useEffect(() => {
        setCantidad(cantidad);
    }, [cantidad]);

    const subtotal = precio * cantidadActual;
    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';

    const manejarIncrementar = () => {
        const nuevaCantidad = cantidadActual + 1;
        setCantidad(nuevaCantidad);
        dispatch(actualizarCantidadProducto({ isbn, carrito_mail, cantidad: nuevaCantidad }));
    };

    const manejarDecrementar = () => {
        if (cantidadActual > 1) {
            const nuevaCantidad = cantidadActual - 1;
            setCantidad(nuevaCantidad);
            dispatch(actualizarCantidadProducto({ isbn, carrito_mail, cantidad: nuevaCantidad }));
        }
    };

    const eliminarDelCarrito = () => {
        onDelete(isbn);
    };


    return (
        <div className="libroCarrito-contenido-libro">
            <div className="libroCarrito-producto-info">
                <div className="libroCarrito-imagen-container">
                    <button className="libroCarrito-cruz-container" onClick={eliminarDelCarrito}>
                        &#10005;
                    </button>
                    <img className="libroCarrito-imagen-libro" src={imageSrc} alt="Imagen" />
                </div>
                <div className="libroCarrito-informacion-libro">
                    <h4>{titulo}</h4>
                </div>
            </div>
            <div className="libroCarrito-precio">${precio.toFixed(2)}</div>
            <div className="libroCarrito-cantidad">
                <button onClick={manejarDecrementar}>-</button>
                <span>{cantidadActual}</span>
                <button onClick={manejarIncrementar}>+</button>
            </div>
            <div className="libroCarrito-subtotal">${subtotal.toFixed(2)}</div>
        </div>
    );
};

export default LibroCarrito;

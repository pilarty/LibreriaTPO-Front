import React, { useState, onCantidadCambio } from 'react';
const LibroCarrito = ({ libro }) => {
    

    const [cantidad, setCantidad] = useState(libro.quantity);

    const subtotal = libro.price * cantidad;
    
    const manejarIncrementar = () => {
        const nuevaCantidad = cantidad + 1;
        setCantidad(nuevaCantidad);
        // Llamamos a la función de callback para notificar el cambio
        onCantidadCambio(libro.id, nuevaCantidad);
    };

    const manejarDecrementar = () => {
        if (cantidad > 1) {
            const nuevaCantidad = cantidad - 1;
            setCantidad(nuevaCantidad);
            onCantidadCambio(libro.id, nuevaCantidad);
        }
    };

    return (
        <>
        <div className="contenido-libro">
            <img src={libro.imageUrl} className="imagen-libro" />
                <div className="informacion-libro">
                    <h4>{libro.title}</h4>
                    <p >${libro.price.toFixed(2)}</p>
                    <div className="cantidad">
                        <button onClick={manejarDecrementar}>-</button>
                        <span>{cantidad}</span>
                        <button onClick={manejarIncrementar}>+</button>
                    </div>
                    <p >${subtotal.toFixed(2)}</p>
                </div>
        </div>
    </>
    );
};

export default LibroCarrito;

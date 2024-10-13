import React, { useState } from 'react';
const LibroCarrito = ({ libro }) => {
    

    const [cantidad, setCantidad] = useState(libro.quantity);

    const subtotal = libro.price * cantidad;
    
    const manejarIncrementar = () => {
        setCantidad(cantidad+1);
    }

    const manejarDecrementar = () => {
        if (cantidad > 1){
            setCantidad(cantidad -1);
        }
    }

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

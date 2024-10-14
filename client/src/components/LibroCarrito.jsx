import React, { useState} from 'react';
const LibroCarrito = ({key, link_imagen, titulo, precio, cantidad, isbn, carrito_mail}) => {
    const [cantidadActual, setCantidad] = useState(cantidad);

    const subtotal = precio * cantidadActual;
    
    // ESTE PUT VA A MODIFICAR LA CANTIDAD DEL PRODUCTO CARRITO Y TMB EL TOTAL EN CARRITO
    const actualizarCantidadEnServidor = (nuevaCantidad) => {
        const url = `http://localhost:4002/productosCarrito/ActualizarCantLibro`;
        const data = {
            cantidad: nuevaCantidad,
            isbn: isbn,
            carrito_mail: carrito_mail,
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar la cantidad');
            }
            return response.json();
        })
        .then(data => {
            console.log('Cantidad actualizada:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const manejarIncrementar = () => {
        const nuevaCantidad = cantidadActual + 1;
        setCantidad(nuevaCantidad);
        actualizarCantidadEnServidor(nuevaCantidad);
    };

    const manejarDecrementar = () => {
        if (cantidadActual > 1) {
            const nuevaCantidad = cantidadActual - 1;
            setCantidad(nuevaCantidad);
            actualizarCantidadEnServidor(nuevaCantidad);
        }
    };

    return (
        <>
        <div className="contenido-libro">
            <img src={link_imagen} className="imagen-libro" />
                <div className="informacion-libro">
                    <h4>{titulo}</h4>
                    <p>${precio.toFixed(2)}</p>
                    <div className="cantidad">
                        <button onClick={manejarDecrementar}>-</button>
                        <span>{cantidad}</span>
                        <button onClick={manejarIncrementar}>+</button>
                    </div>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
        </div>
    </>
    );
};

export default LibroCarrito;

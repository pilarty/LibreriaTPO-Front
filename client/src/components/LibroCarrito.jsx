import React, { useState } from 'react';

const LibroCarrito = ({ image, titulo, precio, cantidad, isbn, carrito_mail, onDelete }) => {
    const [cantidadActual, setCantidad] = useState(cantidad);
    const subtotal = precio * cantidadActual;
    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';

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

    const eliminarDelCarrito = () => {
        const url = `http://localhost:4002/productosCarrito/EliminarprodCarrito`;
        const data = {
            isbn: isbn,
            carrito_mail: carrito_mail, 
        };

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al eliminar el libro del carrito');
            }
            return response.json();
        })
        .then(data => {
            console.log('Libro eliminado del carrito:', data);
            onDelete(isbn);  // Llama a onDelete para eliminar el libro del estado
        })
        .catch(error => {
            console.error('Error:', error);
        });
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

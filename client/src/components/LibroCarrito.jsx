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
        <div className="contenido-libroPILAR">
            <div className="producto-infoPILAR">
                <div className="imagen-container">
                    <button className="cruz-container" onClick={eliminarDelCarrito}>
                        &#10005; {/* Unicode 'x' symbol */}
                    </button>
                    {/*<img src={link_imagen} className="imagen-libro" alt={titulo} />*/}
                    <img className="imagen-libroPILAR" src={imageSrc} alt="Imagen" />
                </div>
                <div className="informacion-libroPILAR">
                    <h4>{titulo}</h4>
                </div>
            </div>
            <div className="precioPILAR">${precio.toFixed(2)}</div>
            <div className="cantidadPILAR">
                <button onClick={manejarDecrementar}>-</button>
                <span>{cantidadActual}</span>
                <button onClick={manejarIncrementar}>+</button>
            </div>
            <div className="subtotalPILAR">${subtotal.toFixed(2)}</div>
        </div>
    );
};

export default LibroCarrito;

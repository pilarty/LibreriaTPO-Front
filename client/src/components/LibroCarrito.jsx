import React, { useState } from 'react';

const LibroCarrito = ({ link_imagen, titulo, precio, cantidad, isbn, carrito_mail, onDelete }) => {
    const [cantidadActual, setCantidad] = useState(cantidad);
    const [isDeleting, setIsDeleting] = useState(false);  // Estado para manejar la eliminación
    const subtotal = precio * cantidadActual;

    // Función para eliminar del servidor
    const eliminarDelServidor = () => {
        const url = `http://localhost:4002/productosCarrito/EliminarprodCarrito`;
        const data = {
            isbn: isbn,
            carrito_mail: carrito_mail,  // Asegurar que se pasa el email del usuario para eliminar correctamente
        };

        return fetch(url, {
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
        });
    };

    // Función que maneja la eliminación visualmente y en el servidor
    const manejarEliminacion = () => {
        setIsDeleting(true);  // Cambiar estado para mostrar el spinner

        eliminarDelServidor()
            .then((data) => {
                console.log('Libro eliminado del carrito:', data);
                setTimeout(() => {
                    onDelete(isbn);  // Llama a la función onDelete para actualizar la lista en el componente padre
                }, 500);  // Añade un pequeño retraso para mostrar el spinner
            })
            .catch((error) => {
                console.error('Error al eliminar el libro:', error);
                setIsDeleting(false);  // Si hay un error, ocultar el spinner
            });
    };

    // Función para incrementar la cantidad
    const manejarIncrementar = () => {
        const nuevaCantidad = cantidadActual + 1;
        setCantidad(nuevaCantidad);
        // Aquí se llamaría la función de actualización de cantidad, si fuera necesario
    };

    // Función para decrementar la cantidad
    const manejarDecrementar = () => {
        if (cantidadActual > 1) {
            const nuevaCantidad = cantidadActual - 1;
            setCantidad(nuevaCantidad);
            // Aquí se llamaría la función de actualización de cantidad, si fuera necesario
        }
    };

    return (
        <div className="contenido-libro-wrapper">
            <div className={`contenido-libro ${isDeleting ? 'eliminando' : ''}`}>
                <div className="producto-info">
                    <div className="imagen-container">
                        {/* Botón para eliminar con la función manejarEliminacion */}
                        <button className="cruz-container" onClick={manejarEliminacion} disabled={isDeleting}>
                            &#10005;
                        </button>
                        <img src={link_imagen} className="imagen-libro" alt={titulo} />
                    </div>
                    <div className="informacion-libro">
                        <h4>{titulo}</h4>
                    </div>
                </div>
                <div className="precio">${precio.toFixed(2)}</div>
                <div className="cantidad">
                    <button onClick={manejarDecrementar} disabled={isDeleting}>-</button>
                    <span>{cantidadActual}</span>
                    <button onClick={manejarIncrementar} disabled={isDeleting}>+</button>
                </div>
                <div className="subtotal">${subtotal.toFixed(2)}</div>
            </div>
            {isDeleting && (
                <div className="overlay-cargando">
                    <div className="loading-spinner"></div> {/* Spinner de carga */}
                </div>
            )}
        </div>
    );
};

export default LibroCarrito;

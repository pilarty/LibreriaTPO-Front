import LibroCarrito from './LibroCarrito';
import { useState, useEffect } from 'react';

const LibroCarritoList = ({ productosCarrito, emailUsuario }) => {
    const [detallesLibros, setDetallesLibros] = useState([]);

    useEffect(() => {
        if (productosCarrito.length > 0 && emailUsuario) {
            const fetchDetallesLibros = async () => {
                try {
                    const detalles = await Promise.all(
                        productosCarrito.map((producto) =>
                            fetch(`http://localhost:4002/libros/${producto.libro.isbn}`)
                                .then((response) => response.json())
                        )
                    );
                    setDetallesLibros(detalles);
                } catch (error) {
                    console.error("Error al obtener los detalles de los libros:", error);
                }
            };
            fetchDetallesLibros();
        }
    }, [productosCarrito, emailUsuario]);

    return (
        <>
        <div className="lista-libros">
            <div className="encabezado-libro">
                <p>Producto/s</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Subtotal</p>
            </div>

            {detallesLibros.map((libro, index) => (
                <div key={libro.isbn}>
                    <LibroCarrito 
                    link_imagen={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNtOHlFQI6XGe8MZck5PMDhwEXpyf1odO9Q&s"} // CAMBIAR, HAY QUE PONER EL LINK ADECUADO (NECESITO EL GET DE LA IMAGEN)
                    titulo={libro.titulo} 
                    precio={libro.precio}
                    cantidad={productosCarrito[index].cantidad} // Obtiene la cantidad que está guardada en producto carrito 
                    isbn={libro.isbn}
                    carrito_mail={emailUsuario}
                    />
                    {index !== detallesLibros.length - 1 && <hr />}
                </div>
            ))}
        </div>
        </>
    );
};

export default LibroCarritoList;

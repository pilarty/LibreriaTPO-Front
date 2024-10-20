import LibroCarrito from './LibroCarrito';

const LibroCarritoList = ({ productosCarrito, emailUsuario, onDelete }) => {

    return (
        <>
            <div className="encabezado-libro">
                <p>Producto/s</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Subtotal</p>
            </div>

            {productosCarrito.map((producto, index) => (
                <div key={producto.libro.isbn}>
                    <LibroCarrito 
                        key={producto.libro.isbn}
                        //link_imagen={producto.libro.link_imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNtOHlFQI6XGe8MZck5PMDhwEXpyf1odO9Q&s"} // Usa el link de la imagen si está disponible
                        image={producto.libro.image}
                        titulo={producto.libro.titulo} 
                        precio={producto.libro.precio}
                        cantidad={producto.cantidad} // Obtiene la cantidad que está guardada en producto carrito 
                        isbn={producto.libro.isbn}
                        carrito_mail={emailUsuario}
                        onDelete={onDelete} // Pasamos la función onDelete
                    />
                    {index !== productosCarrito.length - 1 && <hr />}
                </div>
            ))}
        </>
    );
};

export default LibroCarritoList;

import LibroCarrito from './LibroCarrito';

const LibroCarritoList = ({ productosCarrito, emailUsuario, onDelete }) => {

    return (
        <>
            <div className="libroCarritoList-encabezado-libro">
                <p>Producto/s</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Subtotal</p>
            </div>

            {productosCarrito.map((producto, index) => (
                <div key={producto.libro.isbn}>
                    <LibroCarrito 
                        key={producto.libro.isbn}
                        image={producto.libro.image}
                        titulo={producto.libro.titulo} 
                        precio={producto.libro.precio}
                        cantidad={producto.cantidad} 
                        isbn={producto.libro.isbn}
                        carrito_mail={emailUsuario}
                        onDelete={onDelete} 
                    />
                    {index !== productosCarrito.length - 1 && <hr />}
                </div>
            ))}
        </>
    );
};

export default LibroCarritoList;

const LibroCarrito = ({ libro }) => {
    const subtotal = libro.price * libro.quantity; // Calcular el subtotal

    return (
    <div className="tarjeta-libro">
    <div className="encabezado-libro">
        <h3>Producto/s</h3>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Subtotal</p>
    </div>
    <div className="contenido-libro">
        <img src={libro.imageUrl} alt={libro.title} className="imagen-libro" />
        <div className="detalles-libro">
        <p>{libro.title}</p>
        <p>Precio: ${libro.price.toFixed(2)}</p>
        <p>Cantidad: {libro.quantity}</p>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        </div>
    </div>
    </div>
);
};

export default LibroCarrito;
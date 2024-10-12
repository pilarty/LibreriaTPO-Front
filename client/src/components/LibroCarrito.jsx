const LibroCarrito = ({ libro }) => {
    const subtotal = libro.price * libro.quantity; // Calcular el subtotal

    return (
        <div className="libro">
            <div className="contenido-libro">
                <img src={libro.imageUrl} className="imagen-libro" />
                <div className="detalles-libro">
                    
                    <div className="informacion-libro">
                        <h4>{libro.title}</h4>
                        <p className="precio">${libro.price.toFixed(2)}</p>
                        <p className="cantidad">{libro.quantity}</p>
                        <p className="subtotal">${subtotal.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibroCarrito;

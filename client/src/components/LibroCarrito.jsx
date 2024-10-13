const LibroCarrito = ({ libro }) => {
    const subtotal = libro.price * libro.quantity; // Calcular el subtotal

    return (
        <>
        <div className="contenido-libro">
            <img src={libro.imageUrl} className="imagen-libro" />
                <div className="informacion-libro">
                    <h4>{libro.title}</h4>
                    <p >${libro.price.toFixed(2)}</p>
                    <p >{libro.quantity}</p>
                    <p >${subtotal.toFixed(2)}</p>
                </div>
        </div>
    </>
    );
};

export default LibroCarrito;

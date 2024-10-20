import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TotalCarrito = ({ emailUsuario }) => {
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    /*
    useEffect(() => {
        const URL_CARRITO = `http://localhost:4002/carritos/${emailUsuario}`;

        fetch(URL_CARRITO)
            .then((response) => response.json())
            .then((carrito) => {
                setSubtotal(carrito.total); 
            })
            .catch((error) => {
                console.error("Error al obtener el total del carrito:", error);
            });
    }, [emailUsuario]);

    */
    const manejarFinalizarCompra = () => {
        navigate("/Compra");
    };

    return (
        <div className="recuadro-total"> 
            <h3>Total del carrito</h3>
            <p>Envío: Podrás cambiar datos de envío y/o calcular el costo en el próximo paso.</p>
            {/*<p>Subtotal: ${subtotal.toFixed(2)}</p> */}
            <p>Subtotal: ${100}</p>
            <button onClick={manejarFinalizarCompra}>Comprar</button>
        </div>
    );
};

export default TotalCarrito;

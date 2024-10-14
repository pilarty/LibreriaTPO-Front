import { useNavigate } from "react-router-dom";

const TotalCarrito = ({subtotal}) => {
    const navigate = useNavigate();

    const manejarFinalizarCompra = () => {
        navigate("/Compra");
    }

    return(
        <>
        <div className = "recuadro-total" > 
            <h3>Total del carrito</h3>
            <p>Envío: Podrás cambiar datos de envío y/o calcular el costo en el próximo paso.</p>
            <p>Subtotal: ${subtotal.toFixed(2)}</p> 
            <button onClick={manejarFinalizarCompra}>Finalizar Compra</button>
        </div>
        </>
    );
};
export default TotalCarrito;
import { useNavigate } from "react-router-dom";


const TotalCarrito = () => {

    const navigate = useNavigate();

    const manejarFinalizarCompra = () => {
        navigate("/Compra");
    }

    return(
        <>
        <div className = "recuadro-total" > 
            <h3>Total del carrito</h3>
            <p>Subtotal: $11111111</p> 
            <button onClick={manejarFinalizarCompra}>Finalizar Compra</button>
        </div>
        </>
    );
};
export default TotalCarrito;
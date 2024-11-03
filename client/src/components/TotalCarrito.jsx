import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarrito } from "../Redux/carritoSlice";

const TotalCarrito = ({ emailUsuario }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productosCarrito = useSelector((state) => state.productoCarrito.productos);
    const loading = useSelector((state) => state.carrito.loading);
    const error = useSelector((state) => state.carrito.error);

    useEffect(() => {
        if (emailUsuario) {
            dispatch(getCarrito(emailUsuario));
        }
    }, [dispatch, emailUsuario]);

    
    const calcularSubtotal = (carrito) => {
        let subtotal = 0;
        carrito.forEach((producto) => {
            subtotal += producto.libro.precio * producto.cantidad;
        });
        return subtotal;
    };
    
    const subtotal = calcularSubtotal(productosCarrito);

    const manejarFinalizarCompra = () => {
        navigate("/Compra");
    };

    return (
        <div className="libroCarrito-recuadro-total"> 
            <h3>Total del carrito</h3>
            <p>Envío: Podrás cambiar datos de envío y/o calcular el costo en el próximo paso.</p>
            <p>Subtotal: ${subtotal.toFixed(2)}</p> 
            <button onClick={manejarFinalizarCompra}>Comprar</button>
        </div>
    );
};

export default TotalCarrito;

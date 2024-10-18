import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LibroCarritoList from '../components/LibroCarritoList';
import TotalCarrito from "../components/TotalCarrito";
import './Carrito.css'; 

const Carrito = () => {
    const navigate = useNavigate();
    
    const manejarSeguirComprando = () => {
        navigate("/");
    };

    const [Carrito, setCarrito] = useState([]); // mail y total
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [subtotal, setSubtotal] = useState(0); 

    const emailUsuario = "pgarcia@uade.edu.ar"; // CAMBIAR, USAR SESSIONSTORAGE

    useEffect(() => {
        const URL_CARRITO = `http://localhost:4002/carritos/${emailUsuario}`;
        const URL_PRODUCTOS = `http://localhost:4002/productosCarrito/${emailUsuario}/listaDeProductosCarritoByMail`;

        // Hacer la solicitud al carrito
        fetch(URL_CARRITO)
            .then((response) => response.json())
            .then((carrito) => {
                setCarrito(carrito);
                setSubtotal(carrito?.total || 0); 

                return fetch(URL_PRODUCTOS);
            })
            .then((response) => response.json())
            .then((productos) => {
                setProductosCarrito(productos);
            })
            .catch((error) => {
                console.log("Error al obtener los datos del carrito", error);
            });
    }, [emailUsuario]);

    return (
        <>
            <h2 className="subtitulo">Tu Carrito</h2>
            <div className="carrito-contenedor">
                <div className="lista-boton">
                    <LibroCarritoList 
                        productosCarrito={productosCarrito}
                        emailUsuario={emailUsuario} 
                    />
                    
                    <button className="seguir-comprando" onClick={manejarSeguirComprando}>Seguir comprando</button>
                </div>
                <div className="separator"></div>
                <TotalCarrito emailUsuario={emailUsuario} />
            </div>
        </>
    );
};

export default Carrito;

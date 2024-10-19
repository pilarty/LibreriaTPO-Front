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

    const [productosCarrito, setProductosCarrito] = useState([]);

    const emailUsuario = "pgarcia@uade.edu.ar";

    useEffect(() => {
        const URL_PRODUCTOS = `http://localhost:4002/productosCarrito/${emailUsuario}/listaDeProductosCarritoByMail`;
        fetch(URL_PRODUCTOS)
            .then((response) => response.json())
            .then((productos) => {
                setProductosCarrito(productos);
            })
            .catch((error) => {
                console.log("Error al obtener los productos del carrito", error);
            });
    }, [emailUsuario]);

    const eliminarLibroDelCarrito = (isbn) => {
        setProductosCarrito((prevProductos) =>
            prevProductos.filter((producto) => producto.libro.isbn !== isbn)
        );
    };

    return (
        <>
            <h2 className="subtitulo">Tu Carrito</h2>
            <div className="carrito-contenedor">
                <div className="lista-boton">
                    <LibroCarritoList 
                        productosCarrito={productosCarrito}
                        emailUsuario={emailUsuario} 
                        onDelete={eliminarLibroDelCarrito}
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

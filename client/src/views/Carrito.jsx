import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LibroCarritoList from '../components/LibroCarritoList';
import TotalCarrito from "../components/TotalCarrito";
import './Carrito.css'; 

const Carrito = () => {
    const navigate = useNavigate();
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

    const manejarSeguirComprando = () => {
        navigate("/");
    };

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
                    {productosCarrito.length === 0 ? ( // Condición para mostrar el mensaje de carrito vacío
                        <div className="carrito-vacio">
                            <h3>Tu carrito está vacío.</h3>
                            <button className="volver-tiendas" onClick={manejarSeguirComprando}>
                                Volver a la tienda
                            </button>
                        </div>
                    ) : (
                        <>
                            <LibroCarritoList 
                                productosCarrito={productosCarrito}
                                emailUsuario={emailUsuario} 
                                onDelete={eliminarLibroDelCarrito}
                            />
                            <button className="seguir-comprando" onClick={manejarSeguirComprando}>Seguir comprando</button>
                        </>
                    )}
                </div>
                {productosCarrito.length > 0 && ( // Solo mostrar el separador y el total si hay productos en el carrito
                    <>
                        <div className="separator"></div>
                        <TotalCarrito emailUsuario={emailUsuario} />
                    </>
                )}
            </div>
        </>
    );
};

export default Carrito;

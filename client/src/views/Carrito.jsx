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
    const [emailUsuario, setEmailUsuario] = useState('');
    const [subtotal, setSubtotal] = useState(0); 

    const userId = 2; // CAMBIAR, USAR LOCALSTORAGE

    const URL_USUARIO = `http://localhost:4002/usuarios/${userId}`;

    useEffect(() => {
        // Obtengo el mail del usuario
        fetch(URL_USUARIO)
            .then((response) => response.json())
            .then((usuario) => {
                console.log("Usuario obtenido:", usuario);
                setEmailUsuario(usuario.mail);
        
                // Definir las URLs usando el mail del usuario
                const URL_CARRITO = `http://localhost:4002/carritos/${usuario.mail}`;
                const URL_PRODUCTOS = `http://localhost:4002/productosCarrito/${usuario.mail}/listaDeProductosCarritoByMail`;

                // Hacer la solicitud al carrito
                fetch(URL_CARRITO)
                    .then((response) => response.json())
                    .then((carrito) => {
                        setCarrito(carrito);
                        setSubtotal(carrito?.total || 0); // Asegúrate de que total no sea undefined
                        
                        // Hacer la solicitud a los productos
                        console.log("Carrito obtenido:", carrito); 
                        return fetch(URL_PRODUCTOS);
                    })
                    .then((response) => response.json())
                    .then((productos) => {
                        setProductosCarrito(productos);
                        console.log("Productos del carrito:", productos);
                    })
                    .catch((error) => {
                        console.log("Error al obtener los datos del carrito", error);
                    });
            })
            .catch((error) => {
                console.log("Error al obtener los datos del usuario", error);
            });
    }, [userId]);

    return (
        <>
            <h2 className="subtitulo">Tu Carrito</h2>
            <div className="carrito-contenedor">
                <div className="lista-boton">
                    <LibroCarritoList 
                        productosCarrito={productosCarrito}
                        emailUsuario={emailUsuario} // Asegúrate de pasar el email correctamente
                    />
                    <button className="seguir-comprando" onClick={manejarSeguirComprando}>Seguir comprando</button>
                </div>
                <div className="separator"></div>
                <TotalCarrito subtotal={subtotal} /> {/* HAGO UN GET DEL TOTAL DE CARRITO */}
            </div>
        </>
    );
};

export default Carrito;

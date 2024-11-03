import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Hamburguesa from '../assets/hamburguesa.png';
import MenuDesplegable from "../components/MenuDesplegable";
import LibroCarritoList from '../components/LibroCarritoList';
import TotalCarrito from "../components/TotalCarrito";
import { getProductosCarrito } from '../Redux/productoCarritoSlice';
import './Carrito.css';

const Carrito = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const emailUsuario = sessionStorage.getItem('mail');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productosCarrito = useSelector((state) => state.productoCarrito.productos);
    const loading = useSelector((state) => state.productoCarrito.loading);
    const error = useSelector((state) => state.productoCarrito.error);

    useEffect(() => {
        if (!emailUsuario) {
            navigate('/LoginPage'); 
        } else {
            dispatch(getProductosCarrito(emailUsuario));
        }
    }, [emailUsuario, navigate, dispatch]);

    const manejarSeguirComprando = () => {
        navigate("/");
    };

    const manejarHamburguesa = () => {
        setMenuVisible(!menuVisible);
    };

    const manejarUsuario = () => {
        navigate("/Usuario");
    };

    return (
        <>
            <div className="header-2">
                <a href="/" className="boton-inicio">
                    <img className="logo" src={logo} alt="Logo" />
                    <span className="subtitulo">The Golden Feather</span>
                </a>
                <button className="boton-hamburguesa" onClick={manejarHamburguesa}>
                    <img className="img-hamburguesa" src={Hamburguesa} alt="Hamburguesa" />
                </button>
                <button className="boton-usuario" onClick={manejarUsuario}>
                    <img className="img-usuario" src={Usuario} alt="Usuario" />
                </button>
            </div>

            {menuVisible && <MenuDesplegable />}

            <h2 className="carrito-subtitulo">Tu Carrito</h2>
            <div className="carrito-contenedor">
                <div className="carrito-listaLibros-seguirComprando">
                    {productosCarrito.length === 0 ? (
                        <div className="carrito-carrito-vacio">
                            <h3>Tu carrito está vacío.</h3>
                            <button onClick={manejarSeguirComprando}>
                                Volver a la tienda
                            </button>
                        </div>
                    ) : (
                        <>
                            <LibroCarritoList 
                                productosCarrito={productosCarrito}
                                emailUsuario={emailUsuario}
                            />
                            <button className="carrito-seguir-comprando" onClick={manejarSeguirComprando}>Seguir comprando</button>
                        </>
                    )}
                </div>
                {productosCarrito.length > 0 && (
                    <>
                        <div className="carrito-separador"></div>
                        <TotalCarrito emailUsuario={emailUsuario} />
                    </>
                )}
            </div>
        </>
    );
};

export default Carrito;
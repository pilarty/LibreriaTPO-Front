//. --> esta en la misma carpeta; ..---> esta en otra carpeta 
import { useState, useEffect } from 'react';
import "./Compra.css";
import logo from '../assets/logo.png'; 
import Usuario from '../assets/Usuario.png'; 
import Hamburguesa from '../assets/hamburguesa.png'; 
import MenuDesplegable from "../components/MenuDesplegable"; 
import { useNavigate } from 'react-router-dom';
import FormularioCompra from "../components/FormularioCompra"; 
import ListaLibrosCompra from "../components/ListaLibrosCompra"; 
import TotalCompra from "../components/TotalCompra"; 
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito } from '../Redux/carritoSlice';

const Compra = () => {
    // MUESTRA EL MENU
    const [menuVisible, setMenuVisible] = useState(false);
    const mailUsuario = sessionStorage.getItem('mail');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const carrito = useSelector((state) => state.carrito.items_carrito);
    const loading = useSelector((state) => state.carrito.loading);
    const error = useSelector((state) => state.carrito.error);

    useEffect(() => {
        if (mailUsuario) {
            dispatch(getCarrito(mailUsuario));
        }
    }, [dispatch, mailUsuario]);

    const totalSinDescuento = carrito.total ?? 0; 
    const totalFinal = carrito.total ?? 0;

    if (loading) {
        return <div>Cargando carrito...</div>;
    }

    if (error) {
        return <div>Error al cargar el carrito: {error}</div>;
    }

    const manejarUsuario = () => {
        navigate("/Usuario");
    };

    const manejarHamburguesa = () => {
        setMenuVisible(!menuVisible);
    };
    
    // Libros disponibles para la compra --> esto se cambia en el back

    return (
        <div>
            <div className="header-2">
                <a href="/" className="boton-inicio">
                    <img className="logo" src={logo} alt="Logo" />
                    <span className="subtitulo">The Golden Feather</span>
                </a>
                <button className="boton-hamburguesa" onClick={manejarHamburguesa}>
                    <img className="img-hamburguesa" src={Hamburguesa} alt="Menú" />
                </button>
                <button className="boton-usuario" onClick={manejarUsuario}>
                    <img className="img-usuario" src={Usuario} alt="Usuario" />
                </button>
            </div>

            {/* es un if */}
            {menuVisible && <MenuDesplegable />}

            <div className="Compra-container">
                <FormularioCompra
                />

                {/* lista de libros y totales */}
                <div className="Compra-lista-totales">
                    <ListaLibrosCompra /> 
                <TotalCompra totalSinDescuento={totalSinDescuento} totalFinal={totalFinal} /> 
                </div>
            </div>
        </div>
    );
};

export default Compra;
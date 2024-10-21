//. --> esta en la misma carpeta; ..---> esta en otra carpeta 
import React, { useState } from "react";
import "./Compra.css";
import logo from '../assets/logo.png'; 
import Usuario from '../assets/Usuario.png'; 
import Hamburguesa from '../assets/hamburguesa.png'; 
import MenuDesplegable from "../components/MenuDesplegable"; 
import { useNavigate } from 'react-router-dom';
import FormularioCompra from "../components/FormularioCompra"; 
import ListaLibrosCompra from "../components/ListaLibrosCompra"; 
import TotalCompra from "../components/TotalCompra"; 

const Compra = () => {
    // Funciones
    const navigate = useNavigate();

    const manejarUsuario = () => {
        navigate("/Usuario");
    };

    // MUESTRA EL MENU
    const [menuVisible, setMenuVisible] = useState(false);

    const manejarHamburguesa = () => {
        setMenuVisible(!menuVisible);
    };

    // Libros disponibles para la compra --> esto se cambia en el back
    

    return (
        <div>
            <div className="header-2">
                <img className="logo" src={logo} alt="Logo" />
                <span className="subtitulo">The Golden Feather</span>
                <button className="boton-hamburguesa" onClick={manejarHamburguesa}>
                    <img className="img-hamburguesa" src={Hamburguesa} alt="Menú" />
                </button>
                <button className="boton-usuario" onClick={manejarUsuario}>
                    <img className="img-usuario" src={Usuario} alt="Usuario" />
                </button>
            </div>

            {/* es un if */}
            {menuVisible && <MenuDesplegable />}

            <div className="compra-container">
                <FormularioCompra
                />

                {/* lista de libros y totales */}
                <div className="lista-totales">
                    <ListaLibrosCompra /> 
                 {/*}   <TotalCompra totalSinDescuento={totalSinDescuento} totalFinal={totalFinal} /> */}
                </div>
            </div>
        </div>
    );
};

export default Compra;
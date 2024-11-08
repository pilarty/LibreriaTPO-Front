import React, { useState } from "react";
import logo from '../assets/logo.png'; 
import Usuario from '../assets/Usuario.png'; 
import Hamburguesa from '../assets/hamburguesa.png'; 
import MenuDesplegable from "../components/MenuDesplegable"; 
import { useNavigate } from 'react-router-dom';
import './Cupones.css';

const Cupones = () => {
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

            


        </div>
    );
};

export default Cupones
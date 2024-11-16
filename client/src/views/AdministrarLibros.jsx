import React from "react";
import "./App.css";
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import MenuDesplegable from "../components/MenuDesplegable";
import { useNavigate } from 'react-router-dom';

const AdministrarLibros = () => {

    const navigate = useNavigate();

    const [menuVisible, setMenuVisible] = useState(false);
  
    const manejarUsuario = () => {
      navigate("/Usuario");
    }
    const manejarCarrito = () => {
      navigate("/Carrito");
    }
  
    const manejarHamburguesa = () => {
      setMenuVisible(!menuVisible);
    }

    return (
        <div>
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
          <button className="boton-carrito" onClick={manejarCarrito}>
            <img className="img-carrito" src={Carrito} alt="Carrito" />
          </button>
        </div>

        {menuVisible && (
          <MenuDesplegable></MenuDesplegable>
        )}
        </div>
    );
};
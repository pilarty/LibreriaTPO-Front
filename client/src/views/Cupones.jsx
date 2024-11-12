import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import MenuDesplegable from "../components/MenuDesplegable";
import "./App.css";
import React from "react";
import "./Cupones.css";

const Cupones = () => {
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

        <div className="cupones-container">
            <h2>Cupones de Libros</h2>
            <div className="cupon">
            <div className="cupon-content">
            <div className="cupon-icono">
                📚
            </div>
            <div className="cupon-info">
                <h3>5% OFF en Libros de Ciencia</h3>
                <p>En productos seleccionados</p>
                <p>Compra mínima: $3000</p>
                <p>Tope: $5000</p>
            </div>
            <button className="Cupon-boton-aplicar">Aplicar</button>
            <div class="cupon-bottom-space"></div>
         </div>
        </div>
    </div>

        </div>
    );
};

export default Cupones;

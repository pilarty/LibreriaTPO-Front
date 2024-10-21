import React from "react";
import "./LibroSolo.css";
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LibroSolo = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();
  
    // Funciones de navegación y menú
    const manejarHamburguesa = () => {
      setMenuVisible(!menuVisible);
    };
  
    const manejarUsuario = () => {
      navigate('/Usuario');
    };
  
    const manejarCarrito = () => {
      navigate('/Carrito');
    };
  
    return (
    <div>
      {/* Header */}
      <div className="header-2">
        <img className="logo" src={logo} alt="Logo" />
        <span className="subtitulo">The Golden Feather</span>

        <button className="boton-hamburguesa" onClick={manejarHamburguesa}>
          <img className="img-hamburguesa" src={Hamburguesa} alt="Menú" />
        </button>

        <button className="boton-usuario" onClick={manejarUsuario}>
          <img className="img-usuario" src={Usuario} alt="Usuario" />
        </button>

        <button className="boton-carrito" onClick={manejarCarrito}>
          <img className="img-carrito" src={Carrito} alt="Carrito" />
        </button>
      </div>

      {/* Mostrar menú si está visible */}
      {menuVisible && <MenuDesplegable />}

      {/* Tarjeta del libro */}
      <div className="libro-container">
        {/* Imagen y Título */}
        <div className="libro-imagen-seccion">
          <div className="libro-imagen-placeholder">
            <img src="https://via.placeholder.com/300x400" alt="Imagen del Libro" />
          </div>
          <h2 className="titulo-libro">LA MUJER MEDICINA. EL ORÁCULO</h2>
        </div>

        {/* Detalles del libro */}
        <div className="libro-detalles">
          <p className="precio">$50</p>
          <button className="boton-agregar">Agregar al carrito</button>

          <div className="libro-info"> {/* esto lo voy a tener que cambiar en el back*/}
            <h3>CATHERINE MAILLARD</h3>
            <p>
              El oráculo de la Mujer Medicina proporciona las claves para
              reconectarse con la sabiduría atávica de las mujeres, sanar las
              heridas y abrirse al empoderamiento femenino.
            </p>
            <p>
              <strong>Editorial:</strong> Editorial Sirio<br />
              <strong>Año:</strong> 2024<br />
              <strong>Idioma:</strong> Español<br />
              <strong>Páginas:</strong> 256<br />
              <strong>ISBN13:</strong> 9788499865650<br />
              <strong>Géneros:</strong> Animismo, chamanismo, paganismo, druidismo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
  
  export default LibroSolo;
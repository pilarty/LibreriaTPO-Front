import React from "react";
import "./Homepage.css";
import "./App.css";
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import lupa from '../assets/lupa.png';
import CardLibroList from "../components/CardLibroList";
import CardLibroListNovedades from "../components/CardLibroListNovedades";
import MenuDesplegable from "../components/MenuDesplegable";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Homepage = () => {
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

  const manejarBusqueda = () => {
    navigate("/Libros"); 
  }

  
    return (
        <div>
          <div className="header-2">
            <a href="/" className="boton-inicio">
              <img className="logo" src={logo} alt="Logo" />
              <span className="subtitulo">The Golden Feather</span>
            </a>
            <div className="homepage-buscador-container">
              <input className="homepage-buscador" type="text" placeholder="Buscar..." />
              <button className="homepage-boton-lupa" onClick={manejarBusqueda}>
                <img className="homepage-img-lupa" src={lupa} alt="Buscar" />
              </button>
            </div>
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

          <div className="homepage-subtitulo-2">Recomendados</div>
          <CardLibroList></CardLibroList>
          <div className="homepage-header-3">
            <Link className="homepage-text-vermas" to="/Libros">Ver más</Link>
          </div>
          <div className="homepage-subtitulo-3">Novedades</div>
          <div className="homepage-lista-libros-2">
            <CardLibroList></CardLibroList>
          </div>
          <div className="homepage-header-4">
          <Link className="homepage-text-vermas" to="/Libros">Ver más</Link>
          </div>
        </div>
      );
    };

export default Homepage
import React from "react";
import "./Homepage.css";
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import lupa from '../assets/lupa.png';
import CardLibroList from "../components/CardLibroList";
import MenuDesplegable from "../components/MenuDesplegable";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


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
            <img className="logo" src={logo} alt="Logo" />
            <span className="subtitulo">The Golden Feather</span>

            <div className="buscador-container">
              <input className="buscador" type="text" placeholder="Buscar..." />
              <button className="boton-lupa" onClick={manejarBusqueda}>
                <img className="img-lupa" src={lupa} alt="Buscar" />
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

          <div className="subtitulo-2">Recomendados</div>
          <CardLibroList></CardLibroList>
          <div className="header-3">
            <Link className="text-vermas" to="/Libros">Ver más</Link>
          </div>
          <div className="subtitulo-3">Novedades</div>
          <div className="lista-libros-2">
            <CardLibroList></CardLibroList>
          </div>
          <div className="header-4">
          <Link className="text-vermas" to="/Libros">Ver más</Link>
          </div>
        </div>
      );
    };

export default Homepage
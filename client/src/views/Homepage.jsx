import React from "react";
import "./Homepage.css";
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import CardLibroList from "../components/CardLibroList";
import { Link } from "react-router-dom"

const Homepage = () => {
    return (
        <div>
          <div className="header-2">
            <img className="logo" src={logo} alt="Logo" />
            <span className="subtitulo">The Golden Feather</span>
            <input className="buscador" type="text" />
            <img className="img-usuario" src={Usuario} alt="Usuario" />
            <img className="img-carrito" src={Carrito} alt="Carrito" />
            <img className="img-hamburguesa" src={Hamburguesa} alt="Hamburguesa" />
          </div>

          <div className="subtitulo-2">Recomendados</div>
          <CardLibroList></CardLibroList>
          <div className="header-3">
            <Link className="text-vermas" to="/Libros">Ver más</Link>
          </div>
          <div className="subtitulo-3">Novedades</div>
          <div className="lista-libros-altura">
            <CardLibroList></CardLibroList>
          </div>
          <div className="header-4">
          <Link className="text-vermas" to="/Libros">Ver más</Link>
          </div>
        </div>
      );
    };

export default Homepage
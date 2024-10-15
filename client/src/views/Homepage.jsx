import React from "react";
import "./Homepage.css";
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import CardLibroList from "../components/CardLibroList";
import { Link, useNavigate } from "react-router-dom"

const navigate = useNavigate();

const manejarUsuario = () => {
  navigate("/Usuario");
}
const manejarCarrito = () => {
  navigate("/Carrito");
}

const manejarHamburguesa = () => {
  //ToDo
}

const Homepage = () => {
    return (
        <div>
          <div className="header-2">
            <img className="logo" src={logo} alt="Logo" />
            <span className="subtitulo">The Golden Feather</span>
            <input className="buscador" type="text" />
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
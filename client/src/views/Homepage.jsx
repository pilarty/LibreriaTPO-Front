import React from "react";
import "./Homepage.css";
import logo from '../assets/logo.png'
import CardLibroList from "../components/CardLibroList";
import { Link } from "react-router-dom"

const Homepage = () => {
    return (
        <div>
          <div className="header-2">
            <img className="image-1-4" src={logo} alt="Logo" />
            <span className="subtitulo">The Golden Feather</span>
          </div>
          <div>
            <input className="buscador" type="text" />
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
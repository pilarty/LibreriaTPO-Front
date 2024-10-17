import "./PublicarLibro.css";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import MenuDesplegable from "../components/MenuDesplegable";
import { useState } from 'react';

const PublicarLibro = () => {

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

      const manejarPublicar = ({isbn, titulo, precio, catnPaginas, descripcion, strock, editoial, idioma, genero, autor, imagen}) => {
        //ToDo
      }

    return (
      <div>
          <div className="header-2">
            <img className="logo" src={logo} alt="Logo" />
            <span className="subtitulo">The Golden Feather</span>
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

        <div className="container">
            <div className="book-image">
                <img src="ruta_a_la_imagen" alt="imagen"/>
            </div>


            <div className="book-details">
                <input type="text" className="input-field" placeholder="Título..."/>
                <textarea className="textarea-field" placeholder="Sinopsis..."></textarea>
                <input type="text" className="input-field" placeholder="Editorial..."/>
                <input type="number" className="input-field" placeholder="Año..."/>
                <input type="text" className="input-field" placeholder="Idioma..."/>
                <input type="number" className="input-field" placeholder="N° páginas..."/>
                <input type="text" className="input-field" placeholder="ISBN..."/>
                <input type="text" className="input-field" placeholder="Géneros..."/>
                <input type="number" className="input-field book-price" placeholder="Precio..."/>
                <button className="boton-publicar" onClick={manejarPublicar}>Publicar</button>
            </div>
        </div>
      </div>

    )
} 

export default PublicarLibro;
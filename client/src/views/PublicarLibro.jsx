import "./PublicarLibro.css";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import MenuDesplegable from "../components/MenuDesplegable";
import MenuDesplegableGeneros from "../components/MenuDesplegableGeneros";
import { useState, useRef, useEffect} from 'react';

const PublicarLibro = () => {

    const navigate = useNavigate();
    const generosRef = useRef(null);
    const buttonGenerosRef = useRef(null);

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuGenerosVisible, setMenuGenerosVisible] = useState(false);
    const [generoSeleccionado, setGeneroSeleccionado] = useState("Genero...");
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [editorial, setEditorial] = useState("")
    const [año, setAño] = useState("")
    const [idioma, setIdioma] = useState("")
    const [numPaginas, setNumPaginas] = useState("");
    const [isbn, setIsbn] = useState("");
    const [precio, setPrecio] = useState("");

    const manejarUsuario = () => {
        navigate("/Usuario");
      }
      const manejarCarrito = () => {
        navigate("/Carrito");
      }
      
      const manejarGeneros = () => {
        setMenuGenerosVisible(!menuGenerosVisible);
      }

      const manejarHamburguesa = () => {
        setMenuVisible(!menuVisible);
      }

      const manejarPublicar = () => {
        console.log({
          titulo,
          descripcion,
          editorial,
          año,
          idioma,
          numPaginas,
          isbn,
          precio,
          genero: generoSeleccionado,
      });
      }

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            generosRef.current && 
            !generosRef.current.contains(event.target) && 
            !buttonGenerosRef.current.contains(event.target)
          ) {
            setMenuGenerosVisible(false);
          }
        };
    
        if (menuGenerosVisible) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [menuGenerosVisible]);
    


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
    
          {menuVisible && <MenuDesplegable></MenuDesplegable>}
    
          <div className="container">
            <div className="book-image">
              <img src="ruta_a_la_imagen" alt="imagen" />
            </div>
    
            <div className="book-details">
              <input
                type="text"
                className="input-field"
                placeholder="Título..."
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <textarea
                className="textarea-field"
                placeholder="Sinopsis..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Editorial..."
                value={editorial}
                onChange={(e) => setEditorial(e.target.value)}
              />
              <input
                type="number"
                className="input-field"
                placeholder="Año..."
                value={año}
                onChange={(e) => setAño(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Idioma..."
                value={idioma}
                onChange={(e) => setIdioma(e.target.value)}
              />
              <input
                type="number"
                className="input-field"
                placeholder="N° páginas..."
                value={numPaginas}
                onChange={(e) => setNumPaginas(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="ISBN..."
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
              <button 
                className="generos-field" 
                onClick={manejarGeneros} r
                ef={buttonGenerosRef}>
                {generoSeleccionado}
                <span className="arrow">▼</span>
              </button>
              <input
                type="number"
                className="input-field book-price"
                placeholder="Precio..."
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
              <button className="boton-publicar" onClick={manejarPublicar}>
                Publicar
              </button>
            </div>
          </div>
    
          {menuGenerosVisible && (
            <div ref={generosRef}>
              <MenuDesplegableGeneros onGeneroSeleccionado={setGeneroSeleccionado} />
            </div>
          )}
        </div>
      );
    };

export default PublicarLibro;
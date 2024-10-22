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
    const [titulop, setTitulo] = useState("")
    const [descripcionp, setDescripcion] = useState("")
    const [editorialp, setEditorial] = useState("")
    const [edicionp, setEdicion] = useState("")
    const [idiomap, setIdioma] = useState("")
    const [numPaginasp, setNumPaginas] = useState("");
    const [isbnp, setIsbn] = useState("");
    const [autorp, setAutor] = useState([]);
    const [stockp, setStock] = useState("");
    const [preciop, setPrecio] = useState("");
    const [posts, setPost] = useState([]);
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

      const handleAutorChange = (e) => {
        const autores = e.target.value.split(',').map(autor => autor.trim());
        setAutor(autores);
      };

      const transformarGenero = async () => {
        const response = await fetch(`http://localhost:4002/generos/${generoSeleccionado}/idByNombre`);
        const data = await response.json();
        console.log("Genero ID:", data);
        return data; 
      };

      const manejarPublicar = async () => {
        const generoIdp = await transformarGenero();
        console.log(generoIdp);
        fetch("http://localhost:4002/libros", {
        method: 'post',
          headers: {
          //'Authorization': 'Bearer ${token}'
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({isbn: isbnp,
                                titulo: titulop,
                                precio: preciop,
                                cantPaginas: numPaginasp,
                                descripcion: descripcionp,
                                stock: stockp,
                                editorial: editorialp,
                                edicion: edicionp,
                                idioma: idiomap,
                                generoId: generoIdp,
                                autor: autorp
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          })
          .catch((error) => {
            console.error("Error al obtener los datos: ", error)
          })
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
                value={titulop}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <textarea
                className="textarea-field"
                placeholder="Sinopsis..."
                value={descripcionp}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Editorial..."
                value={editorialp}
                onChange={(e) => setEditorial(e.target.value)}
              />
              <input
                type="number"
                className="input-field"
                placeholder="Edición..."
                value={edicionp}
                onChange={(e) => setEdicion(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Idioma..."
                value={idiomap}
                onChange={(e) => setIdioma(e.target.value)}
              />
              <input
                type="number"
                className="input-field"
                placeholder="N° páginas..."
                value={numPaginasp}
                onChange={(e) => setNumPaginas(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="ISBN..."
                value={isbnp}
                onChange={(e) => setIsbn(e.target.value)}
              />
              <button 
                className="generos-field" 
                onClick={manejarGeneros}
                ef={buttonGenerosRef}>
                {generoSeleccionado}
                <span className="arrow">▼</span>
              </button>
              <input
                type="text"
                className="input-field"
                placeholder="Autor..."
                value={autorp.join(', ')}
                onChange={handleAutorChange}
              />
              <input
                type="number"
                className="input-field"
                placeholder="Stock..."
                value={stockp}
                onChange={(e) => setStock(e.target.value)}
              />
              <input
                type="number"
                className="input-field book-price"
                placeholder="Precio..."
                value={preciop}
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
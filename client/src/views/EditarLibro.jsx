import "./PublicarLibro.css";
import "./App.css";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import MenuDesplegable from "../components/MenuDesplegable";
import { useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import { getLibroByIsbn } from "../Redux/librosSlice";
import { useParams } from 'react-router-dom';
import EditarLibroFormulario from "../components/EditarLibroFormulario";
import LoadingSpinner from '../components/LoadingSpinner';

const EditarLibro = () => {

    const {isbn } = useParams();
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
        
      const dispatch = useDispatch()
      const {items, loading, error, libro} = useSelector((state)=> state.libros)
      console.log(libro)

      useEffect(()=>{
        dispatch(getLibroByIsbn(isbn))
      }, [dispatch, isbn])

      if (loading || libro === null) return <LoadingSpinner></LoadingSpinner>;
      if (error) return <p>Error al cargar las publicaciones: {error}</p>

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
    
          {menuVisible && <MenuDesplegable></MenuDesplegable>}
          <EditarLibroFormulario
            key = {libro.isbn}
            currentISBN = {libro.isbn}
            currentTitulo = {libro.titulo}
            currentSinopsis = {libro.descripcion}
            currentEditorial = {libro.editorial}
            currentEdicion = {libro.edicion}
            currentIdioma = {libro.idioma}
            currentPaginas = {libro.cantPaginas}
            currentAutor = {libro.autor}
            currentStock = {libro.stock}
            currentPrecio = {libro.precio}
            currentImagen = {libro.image}
            currentNovedad = {libro.novedad}
            currentRecomendado = {libro.recomendado}
            currentGenero = {libro.genero}
          ></EditarLibroFormulario>
        </div>
      );
    };

export default EditarLibro;
import React, { useState } from "react";
import "./LibroSolo.css";
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Carrito from '../assets/Carrito.png';
import Hamburguesa from '../assets/hamburguesa.png';
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { getLibroByIsbn } from '../Redux/librosSlice';
import { createProductoCarrito } from '../Redux/productoCarritoSlice';

const LibroSolo = () => {

    const {isbn } = useParams();
    //const isbn = 1005;
    const dispatch = useDispatch();
    const [menuVisible, setMenuVisible] = useState(false);
    const [cantidad, setCantidad] = useState(1); // Estado para la cantidad seleccionada
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

    // Manejar cambio en la cantidad de libros
    const manejarCambioCantidad = (event) => {
        setCantidad(event.target.value);
    };

    const emailUsuario = sessionStorage.getItem('mail');
 

    //const [libro, setlibro] = useState([]);
    //const [isbn, setisbn] = useState([]);

    const manejarAgregarACarrito = (isbn, cantidad) => {
        if (!emailUsuario) {
            navigate('/LoginPage');
        } else {
            const requestBody = {
                cantidad: cantidad,
                isbn: isbn,
                carrito_mail: emailUsuario
            };

            dispatch(createProductoCarrito(requestBody))
                .then((response) => {
                    if (response.error) {
                        throw new Error("No se pudo agregar el producto al carrito");
                    }
                    console.log("Producto agregado al carrito:", response.payload);
                    alert("Producto agregado al carrito");
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("No se pudo agregar el producto al carrito. Intente de nuevo.");
                });
        }
    };



  const {items: items, loading, error, libro} = useSelector((state)=> state.libros)
  console.log(libro)

  useEffect(()=>{
    dispatch(getLibroByIsbn(isbn))
  }, [dispatch, isbn])

  if (loading || libro === null) return <p>Cargando publicacion...</p>;
  if (error) return <p>Errro al cargar la publicacion: {error}</p>


    const imageSrc = libro.image ? `data:image/jpeg;base64,${libro.image}` : 'default-image-path.jpg';


    return (
        <div>
            
            <div className="header-2">
                <a href="/" className="boton-inicio">
                    <img className="logo" src={logo} alt="Logo" />
                    <span className="subtitulo">The Golden Feather</span>
                </a>
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

            {/* Tarjeta del libro */}
            <div className="libroSolo-container">
                {/* Imagen y Título */}
                <div className="libroSolo-imagen-seccion">
                    <div className="libroSolo-imagen-placeholder">
                        <img src={imageSrc} alt="Imagen del Libro" />
                    </div>
                    <h2 className="titulo-libroSolo">{libro.titulo}</h2>

                    <div className="LibroSolo-precio-cantidad">
                        <p className="LibroSolo-precio">${libro.precio}</p>

                    {/* Selector de cantidad */}

                <div className="LibroSolo-selector-cantidad">
                <label htmlFor="LibroSolo-cantidad" className="LibroSolo-cantidad-label">Cantidad: </label>
                <select id="LibroSolo-cantidad" value={cantidad} onChange={manejarCambioCantidad}>
                {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                        {n + 1}
                    </option>
                ))}
                 </select>

                </div>
                </div>
                </div>

                {/* Detalles del libro */}
                <div className="libroSolo-detalles">
                    <div className="libroSolo-info">
                    <h3>{libro.autor}</h3>
                    <p className="LibroSolo-sinopsis-titulo">Sinopsis:</p>
                        <p>
                            {libro.descripcion}
                        </p>
                        <p>
                            <strong>Editorial:</strong> {libro.editorial}<br />
                            <strong>Edicion:</strong> {libro.edicion}<br />
                            <strong>Idioma:</strong> {libro.idioma}<br />
                            <strong>Páginas:</strong> {libro.cantPaginas}<br />
                            <strong>ISBN:</strong> {libro.isbn}<br />
                            <strong>Géneros:</strong> {libro.genero} <br />
                        </p>
                    </div>

                    <button className="LibroSolo-boton-agregar" onClick={() => manejarAgregarACarrito(libro.isbn, cantidad)}>
                        Agregar {cantidad} al carrito
                    </button>
                </div>
            </div>
    </div>
    
    );
};

export default LibroSolo;

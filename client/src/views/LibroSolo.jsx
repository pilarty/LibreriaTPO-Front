import React, { useState } from "react";
import "./LibroSolo.css";
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Carrito from '../assets/Carrito.png';
import Hamburguesa from '../assets/hamburguesa.png';
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { useParams } from 'react-router-dom';

const LibroSolo = () => {
    //const { isbn } = useParams()
    const isbn = 1005;
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

    const emailUsuario = "pgarcia@uade.edu.ar";
    // const emailUsuario = sessionStorage.getItem('userEmail'); // DESCOMENTARLO
 

    const [post, setPost] = useState([]);
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
   
            fetch(`http://localhost:4002/productosCarrito`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo agregar el producto al carrito");
                }
                return response.json();
            })
            .then(data => {
                console.log("Producto agregado al carrito:", data);
                alert("Producto agregado al carrito");
            })
            .catch(error => {
                console.error("Error:", error);
                alert("No se pudo agregar el producto al carrito. Intente de nuevo.");
            });
        }
    };

    

    useEffect(() => {
      fetch(`http://localhost:4002/libros/${isbn}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setPost(data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos: ", error)
        })
    }, []);

    const imageSrc = post.image ? `data:image/jpeg;base64,${post.image}` : 'default-image-path.jpg';


    return (
        <div>
            
            <div className="header-2">
                <img className="logo" src={logo} alt="Logo" />
                <span className="subtitulo">The Golden Feather</span>

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
            <div className="libro-container">
                {/* Imagen y Título */}
                <div className="libro-imagen-seccion">
                    <div className="libro-imagen-placeholder">
                        <img src={imageSrc} alt="Imagen del Libro" />
                    </div>
                    <h2 className="titulo-libro">{post.titulo}</h2>
                </div>

                {/* Detalles del libro */}
                <div className="libro-detalles">
                    <div className="libro-info">
                        <h3>{post.autor}</h3>
                        <p>
                            {post.descripcion}
                        </p>
                        <p>
                            <strong>Editorial:</strong> {post.editorial}<br />
                            <strong>Edicion:</strong> {post.edicion}<br />
                            <strong>Idioma:</strong> {post.idioma}<br />
                            <strong>Páginas:</strong> {post.cantPaginas}<br />
                            <strong>ISBN:</strong> {post.isbn}<br />
                            <strong>Géneros:</strong> {post.genero} <br />
                        </p>
                    </div>
                    <p className="precio">${post.precio}</p>

                    {/* Selector de cantidad */}
                    <div className="selector-cantidad">
                        <label htmlFor="cantidad">Cantidad: </label>
                        <select id="cantidad" value={cantidad} onChange={manejarCambioCantidad}>
                            {[...Array(10).keys()].map((n) => (
                                <option key={n + 1} value={n + 1}>
                                    {n + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="boton-agregar" onClick={() => manejarAgregarACarrito(post.isbn, cantidad)}>
                        Agregar {cantidad} al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LibroSolo;

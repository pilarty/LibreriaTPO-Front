import React, { useState, useEffect } from "react";
import "./Favoritos.css";
import logo from '../assets/logo.png';
import Estrella from '../assets/Estrella.png';
import Usuario from '../assets/Usuario.png';
import Carrito from '../assets/Carrito.png';
import Hamburguesa from '../assets/hamburguesa.png';
import Basura from '../assets/Basura.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from '../components/LoadingSpinner';
import MenuDesplegable from "../components/MenuDesplegable";
import { getLibros } from '../Redux/librosSlice';
import { createProductoCarrito } from '../Redux/productoCarritoSlice';

const Favoritos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const emailUsuario = sessionStorage.getItem('mail');

    // Favoritos guardados en localStorage
    const favoritosKey = `favoritos_${emailUsuario}`;
    const [favoritos, setFavoritos] = useState(
        JSON.parse(localStorage.getItem(favoritosKey)) || []
    );

    const { items: libros, loading, error } = useSelector((state) => state.libros);

    useEffect(() => {
        if (!emailUsuario) {
            navigate('/LoginPage'); 
        } else {
            dispatch(getLibros()); // Cargar todos los libros desde el backend
        }
    }, [emailUsuario, navigate, dispatch]);

    if (loading || !libros.content) return <LoadingSpinner />;
    if (error) return <p>Error al cargar los libros: {error}</p>;

    // Filtrar libros que están marcados como favoritos
    const librosFavoritos = libros.content.filter((libro) => favoritos.includes(libro.isbn));

    // Manejar eliminación de un favorito
    const manejarEliminarFavorito = (isbn) => {
        const nuevosFavoritos = favoritos.filter((favoritoIsbn) => favoritoIsbn !== isbn);
        localStorage.setItem(favoritosKey, JSON.stringify(nuevosFavoritos));
        setFavoritos(nuevosFavoritos); // Actualizar el estado local
        alert("El libro fue eliminado de tus favoritos");
    };

    /* Manejar agregar al carrito o redirigir al login
    const manejarAgregarCarrito = (libro) => {
        if (!emailUsuario) {
            alert("Debes iniciar sesión para agregar libros al carrito.");
            navigate('/login');
        } else {
            const carritoKey = `carrito_${emailUsuario}`;
            const carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];
            carrito.push(libro);
            localStorage.setItem(carritoKey, JSON.stringify(carrito));
            alert(`${libro.titulo} se agregó al carrito.`);
        }
    };*/
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

    const manejarHamburguesa = () => {
        setMenuVisible(!menuVisible);
    };

    const manejarUsuario = () => {
        navigate('/Usuario');
    };

    const manejarCarrito = () => {
        navigate('/Carrito');
    };

    const manejarLibros = (isbn) => {
        navigate(`/Libro/${isbn}`);
    };

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
            {menuVisible && <MenuDesplegable />}

            <div className="favoritos-container">
                <h1 className="favoritosTitulo">
                    Mis Favoritos <img src={Estrella} className="favoritosEstrella" alt="Favoritos" />
                </h1>
                {favoritos.length === 0 ? (
                    <p>No tienes libros en favoritos</p>
                ) : (
                    <div className="favoritos-lista">
                        {librosFavoritos.map((libro) => (
                            <div key={libro.isbn} className="favorito-item">
                                
                                <img
                                    className="favorito-imagen"
                                    src={libro.image ? `data:image/jpeg;base64,${libro.image}` : '/assets/imageError.png'}
                                    alt={libro.titulo}
                                    onClick={() => manejarLibros(libro.isbn)}
                                />
                                <div className="favorito-detalles">
                                    <h3>{libro.titulo}</h3>
                                    <p><strong>Autor:</strong> {libro.autor}</p>
                                    <p><strong>Precio:</strong> ${libro.precio}</p>
                                    <div className="favorito-botones">
                                        <button
                                            className="favorito-eliminar"
                                            onClick={() => manejarEliminarFavorito(libro.isbn)}
                                        >
                                            <img src={Basura} alt="Eliminar" className="favorito-basura-icon" />
                                        </button>
                                        <button
                                            className="favorito-agregar-carrito"
                                            onClick={() => manejarAgregarACarrito(libro.isbn, 1)}
                                        >
                                            <img src={Carrito} alt="Agregar al Carrito" />
                                        </button>
                                    </div>
                                </div>
                             
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favoritos;

import React, { useState, useEffect } from "react";
import "./Favoritos.css";
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Carrito from '../assets/Carrito.png';
import Hamburguesa from '../assets/hamburguesa.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
//import { getFavoritos } from '../Redux/favoritosSlice'; 
//import { removeFavorito } from '../Redux/favoritosSlice'; 
import LoadingSpinner from '../components/LoadingSpinner';

const Favoritos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    // Obtener favoritos del estado de Redux
    const { favoritos, loading, error } = useSelector((state) => state.favoritos);

    const emailUsuario = sessionStorage.getItem('mail');

    useEffect(() => {
        if (emailUsuario) {
            dispatch(getFavoritos(emailUsuario)); 
        } else {
            navigate('/LoginPage'); // Redirigir al login si no está autenticado
        }
    }, [dispatch, emailUsuario, navigate]);

    const manejarHamburguesa = () => {
        setMenuVisible(!menuVisible);
    };

    const manejarUsuario = () => {
        navigate('/Usuario');
    };

    const manejarCarrito = () => {
        navigate('/Carrito');
    };

    const manejarEliminarFavorito = (isbn) => {
        dispatch(removeFavorito({ email: emailUsuario, isbn }))
            .then((response) => {
                if (response.error) {
                    throw new Error("No se pudo eliminar el favorito");
                }
                alert("Libro eliminado de favoritos");
            })
            .catch((error) => {
                console.error("Error al eliminar favorito:", error);
                alert("Hubo un error al intentar eliminar el libro de favoritos");
            });
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error al cargar los favoritos: {error}</p>;

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

            <div className="favoritos-container">
                <h1>Mis Favoritos</h1>
                {favoritos.length === 0 ? (
                    <p>No tienes libros en favoritos</p>
                ) : (
                    <div className="favoritos-lista">
                        {favoritos.map((libro) => (
                            <div key={libro.isbn} className="favorito-item">
                                <img
                                    className="favorito-imagen"
                                    src={libro.image ? `data:image/jpeg;base64,${libro.image}` : 'default-image-path.jpg'}
                                    alt={libro.titulo}
                                />
                                <div className="favorito-detalles">
                                    <h3>{libro.titulo}</h3>
                                    <p>Autor: {libro.autor}</p>
                                    <p>Precio: ${libro.precio}</p>
                                    <button
                                        className="favorito-eliminar"
                                        onClick={() => manejarEliminarFavorito(libro.isbn)}
                                    >
                                        Eliminar de Favoritos
                                    </button>
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

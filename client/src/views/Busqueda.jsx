import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneroById } from '../Redux/generosSlice';
import { getLibrosByTitulo } from '../Redux/librosSlice';
import ListaLibrosListaLibros from '../components/ListaLibrosListaLibros';
import './ListaLibros.css';
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Hamburguesa from '../assets/hamburguesa.png';
import Carrito from '../assets/Carrito.png';
import MenuDesplegable from "../components/MenuDesplegable";
import LoadingSpinner from '../components/LoadingSpinner';

const Busqueda = () => {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    const { text } = useParams();
    const dispatch = useDispatch();
    
    const generoNombre = useSelector((state) => state.generos.genero?.nombre);

    useEffect(() => {
        if (text) {
            dispatch(getLibrosByTitulo(text));
        }
    }, [text, dispatch]);

    const {items, loading, error} = useSelector((state => state.libros));

    const manejarHamburguesa = () => {
        setMenuVisible(!menuVisible);
    };

    const manejarUsuario = () => {
        navigate("/Usuario");
    };

    const manejarCarrito = () => {
        navigate("/Carrito");
    };

    if (loading || !items.length === 0) return <LoadingSpinner />;
    if (error) return <p>Error al cargar los libros: {error}</p>;

    return (
        <>
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

            {menuVisible && <MenuDesplegable />}

            <div className="listaLibros-container">
                <div className="listaLibros-title-container">
                    <h1 className="listaLibros-subtitle" style={{ marginTop: '60px' }}>Busqueda para "{text}"</h1>
                </div>
            <hr />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {items.length > 0 && (
                        <ListaLibrosListaLibros libros={items} />
                    )}
                </>
            )}
        </div>

        </>
    );
};

export default Busqueda;
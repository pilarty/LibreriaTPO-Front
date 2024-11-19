import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneroById } from '../Redux/generosSlice';
import { getLibros } from '../Redux/librosSlice';
import ListaLibrosListaLibros from '../components/ListaLibrosListaLibros';
import './ListaLibros.css';
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Hamburguesa from '../assets/hamburguesa.png';
import Carrito from '../assets/Carrito.png';
import MenuDesplegable from "../components/MenuDesplegable";
import LoadingSpinner from '../components/LoadingSpinner';

const ListaLibros = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(6); //aca se cambia la cantidad de libros que se muestran
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    const { generoId } = useParams();
    const dispatch = useDispatch();
    
    const generoNombre = useSelector((state) => state.generos.genero?.nombre);

    useEffect(() => {
        if (generoId) {
            dispatch(getGeneroById(generoId));
        }
    }, [generoId, dispatch]);

    const {items, loading, error} = useSelector((state => state.libros));

    useEffect(() => {
        dispatch(getLibros({ page: currentPage, size: pageSize }));
    }, [dispatch, currentPage, pageSize]);

    let librosFiltrados = [];
    if (items.content && generoNombre) {
        librosFiltrados = items.content.filter(libro => libro.genero === generoNombre);
    }

    const manejarHamburguesa = () => {
        setMenuVisible(!menuVisible);
    };

    const manejarUsuario = () => {
        navigate("/Usuario");
    };

    const manejarCarrito = () => {
        navigate("/Carrito");
    };

    const handleNextPage = () => {
        if (!items.last) {
        setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (!items.first) {
        setCurrentPage(prev => prev - 1);
        }
    }; 

    if (loading || !items.content) return <LoadingSpinner />;
    if (error) return <p>Error al cargar los libros: {error}</p>;

    return (
        <>
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

            {menuVisible && <MenuDesplegable />}

            <div className="listaLibros-container">
                <div className="listaLibros-title-container">
                    <h1 className="listaLibros-title">{generoNombre}</h1>
                    <h2 className="listaLibros-subtitle">Nuestras recomendaciones de {generoNombre}</h2>
                    <h2 className="listaLibros-subtitle">Libros del género {generoNombre}</h2>
                </div>
                <hr />
                {loading ? (
                    <LoadingSpinner></LoadingSpinner>
                ) : (
                    <ListaLibrosListaLibros libros={librosFiltrados} />
                )}
                
                <div className="listaLibros-paginacion-container">
                <button 
                    className="listaLibros-botonPagina"
                    onClick={handlePrevPage}
                    disabled={items.first}
                >
                    ←
                </button>
                <span>{items.number + 1} de {items.totalPages}</span>
                <button 
                    className="listaLibros-botonPagina"
                    onClick={handleNextPage}
                    disabled={items.last}
                >
                    →
                </button>
                </div>
            </div>
        </>
    );
};

export default ListaLibros;

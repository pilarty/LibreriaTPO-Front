import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLibros } from '../Redux/librosSlice';
import ListaLibrosListaLibros from '../components/ListaLibrosListaLibros';
import './ListaLibros.css';
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Hamburguesa from '../assets/hamburguesa.png';
import Carrito from '../assets/Carrito.png';
import MenuDesplegable from "../components/MenuDesplegable";
import LoadingSpinner from '../components/LoadingSpinner';

const Recomendados = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(6);
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getLibros({page: currentPage, size: pageSize}));
    }, [dispatch, currentPage, pageSize])

    const {items, loading, error} = useSelector((state => state.libros));

    if (loading || !items.length === 0) return <LoadingSpinner />;
    if (error) return <p>Error al cargar los libros: {error}</p>;

    const LibrosRecomendados = items.content.filter(libro => libro.recomendado)

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
                    <h1 className="listaLibros-subtitle" style={{ marginTop: '60px' }}>Nuestras recomendaciones</h1>
                </div>
            <hr />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {LibrosRecomendados.length > 0 && (
                        <ListaLibrosListaLibros libros={LibrosRecomendados} />
                    )}
                </>
            )}
        </div>

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

        </>
    );
};

export default Recomendados;
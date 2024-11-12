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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { generoId } = useParams();

    const generoNombre = useSelector((state) => state.generos.genero?.nombre);
    //const libros = useSelector((state) => state.libros.items);
    //const loading = useSelector((state) => state.libros.loading);
    //const totalPages = useSelector((state) => state.libros.totalPages); 

    const [menuVisible, setMenuVisible] = useState(false);
    const [page, setPage] = useState(0);
    const [libros, setLibros] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (generoId) {
            dispatch(getGeneroById(generoId));
        }
    }, [generoId, dispatch]);

    {/*
    useEffect(() => {
        dispatch(getLibros());
    }, [page, dispatch]);
    */}

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:4002/libros?page=${page}&size=10`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const librosFiltrados = data.content.filter(libro => libro.genero === generoNombre);
                console.log(librosFiltrados);
                setLibros(librosFiltrados);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error("Error al obtener los libros: ", error);
            })
            .finally(() => {
                setLoading(false); // Finaliza la carga
            });
    }, [page, generoNombre]);

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
        if (page < totalPages - 1) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(prevPage => prevPage - 1);
        }
    };

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
                    <ListaLibrosListaLibros libros={libros} />
                )}
                
                <div className="listaLibros-paginacion-container">
                    <button onClick={handlePrevPage} disabled={page === 0}>Anterior</button>
                    <span>Página {page + 1} de {totalPages}</span>
                    <button onClick={handleNextPage} disabled={page >= totalPages - 1}>Siguiente</button>
                </div>
            </div>
        </>
    );
};

export default ListaLibros;

import React from "react";
import "./App.css";
import "./AdministrarLibros.css"
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import MenuDesplegable from "../components/MenuDesplegable";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { getLibros } from '../Redux/librosSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import AdministrarLibrosLista from '../components/AdministrarLibrosLista';

const AdministrarLibros = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(6); //aca se cambia la cantidad de libros que se muestran
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
    const { items, loading, error } = useSelector((state) => state.libros);
    console.log(items)
  
    useEffect(()=>{
      dispatch(getLibros({page: currentPage, size: pageSize}));
    }, [dispatch, currentPage, pageSize])
  
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

    if (loading) return <LoadingSpinner />; 
if (error) return <p>Error al cargar las publicaciones: {error}</p>;
if (items.length === 0) return <p>No se encontraron libros</p>;


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

          {menuVisible && (
            <MenuDesplegable></MenuDesplegable>
          )}
          <div className="AdministrarLibros-container">
              <h2 className="AdministrarLibros-subtitle">Administrar libros</h2>
                  <AdministrarLibrosLista libros={items.content} />
          </div>

          <div className="AdministrarLibros-paginacion-container">
                <button 
                    className="AdministrarLibros-botonPagina"
                    onClick={handlePrevPage}
                    disabled={items.first}
                >
                    ←
                </button>
                <span>{items.number + 1} de {items.totalPages}</span>
                <button 
                    className="AdministrarLibros-botonPagina"
                    onClick={handleNextPage}
                    disabled={items.last}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default AdministrarLibros
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListaLibrosListaLibros from '../components/ListaLibrosListaLibros';
import './ListaLibros.css';
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Hamburguesa from '../assets/hamburguesa.png';
import Carrito from '../assets/Carrito.png'
import MenuDesplegable from "../components/MenuDesplegable";

const ListaLibros = () => {
    const { generoId } = useParams();
    const [generoNombre, setGeneroNombre] = useState(null);
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        if (!generoId) return;

        fetch(`http://localhost:4002/generos/${generoId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setGeneroNombre(data.nombre);
                if (data.libro && Array.isArray(data.libro)) {
                    setLibros(data.libro);
                } else {
                    console.error("No se encontró la lista de libros en la respuesta.");
                }
            })
            .catch((error) => {
                console.error("Error al obtener el género: ", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [generoId]);

    const manejarHamburguesa = () => {
        setMenuVisible(!menuVisible);
    };

    const manejarUsuario = () => {
        navigate("/Usuario");
    };

    const manejarCarrito = () => {
        navigate("/Carrito");
    }

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

        <div className="container">
            <div className="title-container">
                <h1 className="title">{generoNombre}</h1>
                <h2 className="subtitle">Libros del género {generoNombre}</h2>
            </div>
            
            <ListaLibrosListaLibros libros={libros} loading={loading} />
            
        </div>
        </>
    );
};

export default ListaLibros;
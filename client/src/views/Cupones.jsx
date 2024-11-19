import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { getUsuario } from "../Redux/usuariosSlice";
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Carrito from '../assets/Carrito.png';
import Hamburguesa from '../assets/hamburguesa.png';
import MenuDesplegable from "../components/MenuDesplegable";
import "./App.css";
import React from "react";
import "./Cupones.css";

const Cupones = () => {
    const navigate = useNavigate();
    const emailUsuario = sessionStorage.getItem('mail');
    const dispatch = useDispatch();

    const [menuVisible, setMenuVisible] = useState(false);
    const [esAdmin, setEsAdmin] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false); 
    const [nuevoCupon, setNuevoCupon] = useState({
        descuento: '',
        compraMinima: '',
        topeCompra: ''
    });

    const manejarUsuario = () => {
      navigate("/Usuario");
    };

    const manejarCarrito = () => {
      navigate("/Carrito");
    };

    const manejarHamburguesa = () => {
      setMenuVisible(!menuVisible);
    };

    const abrirModal = () => {
      setMostrarModal(true);
    };

    const cerrarModal = () => {
      setMostrarModal(false);
    };

    const manejarCambio = (e) => {
      const { name, value } = e.target;
      setNuevoCupon({ ...nuevoCupon, [name]: value });
    };

    useEffect(() => {
        dispatch(getUsuario(emailUsuario))
          .unwrap()
          .then((data) => {
            console.log(data);
            setEsAdmin(data.role === "ADMIN");
          })
          .catch((error) => {
            console.error("Error al obtener los datos del usuario: ", error);
          });
      }, [dispatch, emailUsuario]);

    const agregarCupon = () => {
      console.log("Cupon agregado:", nuevoCupon);
      // Aquí puedes agregar la lógica para guardar el cupón en tu backend o estado global
      cerrarModal();
    };

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

            {menuVisible && <MenuDesplegable />}

            <div className="cupones-container">
            <div className="cupones-header">
        <h2>Cupones de Libros</h2>
        {esAdmin && (
            <button className="boton-agregar-cupon" onClick={abrirModal}>
                Agregar Nuevo Cupón
            </button>
        )}
    </div>
                <div className="cupon">
        <div className="cupon-content">
            <div className="cupon-icono">📚</div>
            <div className="cupon-info">
                <h3>5% OFF en Libros de Ciencia</h3>
                <p>En productos seleccionados</p>
                <p>Compra mínima: $3000</p>
                <p>Tope: $5000</p>
            </div>
            <button className="Cupon-boton-aplicar">Aplicar</button>
            <div className="cupon-bottom-space"></div>
                    </div>
                </div>
            </div>

            {mostrarModal && (
    <div className="modal">
        <div className="modal-content">
            <h2>Agregar Nuevo Cupón</h2>
            <label>Descuento:</label>
            <input
                type="text"
                name="descuento"
                value={nuevoCupon.descuento}
                onChange={manejarCambio}
            />
            <label>Compra Mínima:</label>
            <input
                type="text"
                name="compraMinima"
                value={nuevoCupon.compraMinima}
                onChange={manejarCambio}
            />
            <label>Tope de Compra:</label>
            <input
                type="text"
                name="topeCompra"
                value={nuevoCupon.topeCompra}
                onChange={manejarCambio}
            />
            {/* Contenedor para los botones */}
            <div className="botones">
                <button onClick={agregarCupon}>Guardar</button>
                <button onClick={cerrarModal}>Cerrar</button>
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default Cupones;

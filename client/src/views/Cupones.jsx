import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { getUsuario } from "../Redux/usuariosSlice";
import { getAllGiftCards } from "../Redux/giftCardSlice";
import { postGiftCard } from "../Redux/giftCardSlice";
import logo from '../assets/logo.png';
import Usuario from '../assets/Usuario.png';
import Carrito from '../assets/Carrito.png';
import Hamburguesa from '../assets/hamburguesa.png';
import MenuDesplegable from "../components/MenuDesplegable";
import "./App.css";
import React from "react";
import "./Cupones.css";
import LoadingSpinner from '../components/LoadingSpinner';

const Cupones = () => {
    const navigate = useNavigate();
    const emailUsuario = sessionStorage.getItem('mail');
    const dispatch = useDispatch();

    const {items: items, loading, error, giftCard} = useSelector((state)=> state.giftcard)
    console.log(items)
    
    

    const [menuVisible, setMenuVisible] = useState(false);
    const [esAdmin, setEsAdmin] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false); 
    const [nuevoCupon, setNuevoCupon] = useState({
        descuento: '',
        titulo: '',
        descripcion: '',
        codigo: ''
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

    const aplicarGift = ( codigo ) => {
        sessionStorage.setItem('codigo', codigo);
        console.log(sessionStorage.getItem('codigo'));
    };




    useEffect (() => {
        if (!emailUsuario){
            navigate("/LoginPage");
        } else {
            dispatch(getAllGiftCards( ));
        }
        }, [emailUsuario, navigate, dispatch]);
    

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
        dispatch(postGiftCard(nuevoCupon))
      console.log("Cupon agregado:", nuevoCupon);
      
      cerrarModal();
    };

    if (loading || items.length === 0) return <LoadingSpinner></LoadingSpinner>;
    if (error) return <p>Errro al acrgar las publicaciones: {error}</p>

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
    
            {/* Título y botón para agregar cupones */}
            <div className="cupones-header">
                <h2>Cupones de Libros</h2>
                {esAdmin && (
                    <button className="boton-agregar-cupon" onClick={abrirModal}>
                        Agregar Nuevo Cupón
                    </button>
                )}
            </div>
    

            <div className="cupones-container">
                {items.length > 0 ? (
                    <div className="cupones-grid">
                        {items.map((GiftCard) => (
                            <div className="cupon" key={GiftCard.codigo}> {/* Asegúrate de tener una clave única */}
                                <div className="cupon-content">
                                    <div className="cupon-icono">📚</div>
                                    <div className="cupon-info">
                                        <h3>{GiftCard.titulo}</h3>
                                        <p>{GiftCard.descripcion}</p>
                                        <p>{GiftCard.codigo}</p>
                                    </div>
                                    <button onClick={aplicarGift(GiftCard.codigo)} className="Cupon-boton-aplicar">Aplicar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay cupones disponibles.</p>
                )}
            </div>
    
            {/* Modal */}
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
                        <label>Titulo del cupon:</label>
                        <input
                            type="text"
                            name="titulo"
                            value={nuevoCupon.titulo}
                            onChange={manejarCambio}
                        />
                        <label>Descripcion del cupon:</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={nuevoCupon.descripcion}
                            onChange={manejarCambio}
                        />
                        <label>Codigo de Cupon:</label>
                        <input
                            type="text"
                            name="codigo"
                            value={nuevoCupon.codigo}
                            onChange={manejarCambio}
                        />
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

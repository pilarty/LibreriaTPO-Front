
import "../views/Compra.css";
import React, { useState } from "react";
import { useEffect } from 'react';
import {postOrdenes} from '../Redux/ordenesSlice';
import {useDispatch} from 'react-redux';


const FormularioCompra = () => {
    const dispatch = useDispatch();
    const [formulario, setFormulario] = useState({
        nombre: '',
        apellido: '',
        codigoPostal: '',
        direccion: '',
        piso: '',
        medioPago: '',
        numeroTarjeta: '',
        numeroSeguridad: '',
        fechaVencimiento: '',
        giftCard: ''
    });
 
    const [compraRealizada, setCompraRealizada] = useState(false); // Nuevo estado para el popup

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };
    const handleChangeGift = (e) => {
        setFormulario({
          ...formulario,
          [e.target.name]: e.target.value 
        });
      
        obtenerGift(); // Llamada a la función para obtener el valor
      };
      

    const [newOrden, setNewOrden] = useState(null)

    const handleRealizarCompra = () => {
        const ordenData = { 
            mail: sessionStorage.getItem('mail'),
            codigo: formulario.gifcard
        }
        setNewOrden(ordenData)
        dispatch(postOrdenes(newOrden))
        setCompraRealizada(true); // Muestra el popup
    };

    const handleRedirigirHome = () => {
        window.location.href = "/"; // Redirige a la homepage
    };

    /*const [posts, setPost] = useState([]);
    console.log(posts)
    */

    const obtenerGift = () => {
        if (!formulario.giftCard) {  // Asegúrate de usar giftCard con "C" mayúscula
            console.error("El campo Gift Card está vacío");
            return;
        }
    
        fetch(`http://localhost:4002/giftcards/byCodigo/${formulario.giftCard}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // setPost(data); // Descomentar si `setPost` está definido y es necesario
            })
            .catch((error) => {
                console.error("Error al ingresar la GiftCard: ", error);
            });
    };
    
    

    return (
        <div className='Compra-seccion-formulario'>
            <h1>Formulario de Compra</h1>

            <form>
                <div className='Compra-form-group'>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='Compra-form-group'>
                    <input
                        type="text"
                        name="apellido"
                        id="apellido"
                        placeholder="Apellido"
                        value={formulario.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='Compra-form-group'>
                    <input
                        type="text"
                        name="codigoPostal"
                        id="codigoPostal"
                        placeholder="Código Postal"
                        value={formulario.codigoPostal}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='Compra-form-group'>
                    <input
                        type="text"
                        name="direccion"
                        id="direccion"
                        placeholder="Dirección"
                        value={formulario.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='Compra-form-group'>
                    <input
                        type="text"
                        name="piso"
                        id="piso"
                        placeholder="Piso/Departamento"
                        value={formulario.piso}
                        onChange={handleChange}
                    />
                </div>
                <div className='Compra-form-group'>
                    <input
                        type="text"
                        name="giftCard"  // El nombre debe coincidir con el nombre de la propiedad en el estado
                        value={formulario.giftCard || ""}  // Vincula el valor al estado
                        onChange={handleChangeGift}  // Llama a la función handleChangeGift para actualizar el estado
                        placeholder="Ingrese el código de la Gift Card"
                    /> 
                    
                </div>
                <div className='Compra-form-group'>
                    <select
                        name="medioPago"
                        id="medioPago"
                        value={formulario.medioPago}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un medio de pago</option>
                        <option value="tarjetaCredito">Tarjeta de Crédito</option>
                        <option value="tarjetaDebito">Tarjeta de Débito</option>
                        <option value="mercadoPago">Mercado Pago</option>
                    </select>
                </div>

                {(formulario.medioPago === 'tarjetaCredito' || formulario.medioPago === 'tarjetaDebito') && (
                    <>
                        <div className='Compra-form-group'>
                            <input
                                type="text"
                                name="numeroTarjeta"
                                id="numeroTarjeta"
                                placeholder="Número de Tarjeta"
                                value={formulario.numeroTarjeta}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='Compra-form-group'>
                            <input
                                type="text"
                                name="numeroSeguridad"
                                id="numeroSeguridad"
                                placeholder="Número de Seguridad"
                                value={formulario.numeroSeguridad}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='Compra-form-group'>
                            <input
                                type="text"
                                name="fechaVencimiento"
                                id="fechaVencimiento"
                                placeholder="MM/AA"
                                value={formulario.fechaVencimiento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                )}
            </form>

            <div className="boton-comprar">
                <button onClick={handleRealizarCompra}>
                    Realizar Compra
                </button>
            </div>

            {compraRealizada && (
                <div className="popup-compra">
                    <div className="Compra-popup-contenido">
                        <h2>¡Tu compra fue realizada con éxito!</h2>
                        <button onClick={handleRedirigirHome}>Volver a la homepage</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioCompra;



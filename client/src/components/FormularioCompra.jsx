
import "../views/Compra.css";
import React, { useState } from "react";
import { useEffect } from 'react';


const FormularioCompra = () => {
    const [formulario, setFormulario] = useState({
        nombre: '',
        apellido: '',
        codigoPostal: '',
        direccion: '',
        piso: '',
        medioPago: '',
        numeroTarjeta: '',
        numeroSeguridad: '',
        fechaVencimiento: ''
    });
 
    const [compraRealizada, setCompraRealizada] = useState(false); // Nuevo estado para el popup

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
        obtenerGift()
    };

    const handleRealizarCompra = () => {
        setCompraRealizada(true); // Muestra el popup
    };

    const handleRedirigirHome = () => {
        window.location.href = "/"; // Redirige a la homepage
    };

    const [posts, setPost] = useState([]);
    console.log(posts)

    const obtenerGift = () => { 
        fetch(`http://localhost:4002/giftcards/byCodigo/${formulario.giftcard}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setPost(data);
          })
          .catch((error) => {
            console.error("Error al ingresar la GiftCard: ", error)
          })
      };

    return (
        <div className='seccion-formulario'>
            <h1>Formulario de Compra</h1>

            <form>
                <div className='form-group'>
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
                <div className='form-group'>
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
                <div className='form-group'>
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
                <div className='form-group'>
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
                <div className='form-group'>
                    <input
                        type="text"
                        name="piso"
                        id="piso"
                        placeholder="Piso/Departamento"
                        value={formulario.piso}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type="text"
                        id="giftCard"
                        placeholder="Gift Card"
                        value={formulario.gifcard}
                        onChange={handleChange}
                    /> 
                    
                </div>
                <div className='form-group'>
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
                        <div className='form-group'>
                            <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
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
                        <div className='form-group'>
                            <label htmlFor="numeroSeguridad">Número de Seguridad</label>
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
                        <div className='form-group'>
                            <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
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
                    <div className="popup-contenido">
                        <h2>¡Tu compra fue realizada con éxito!</h2>
                        <button onClick={handleRedirigirHome}>Volver a la homepage</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioCompra;



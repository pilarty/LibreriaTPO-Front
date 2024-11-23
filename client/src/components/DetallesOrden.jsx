import '../views/VerOrdenes.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdenesById } from '../Redux/ordenesSlice';
import { useState, useEffect } from 'react';
import {getUsuarioById} from '../Redux/usuariosSlice';

const DetallesOrden = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, loading: ordenesLoading, error: ordenesError } = useSelector((state) => state.ordenes);
    const { usuario, loading: usuarioLoading, error: usuarioError } = useSelector((state) => state.usuarios);

    useEffect(() => {
        dispatch(getOrdenesById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (items && items.usuario && items.usuario.id) {  
            dispatch(getUsuarioById(items.usuario.id));
        }
    }, [dispatch, items]);
    
    if (ordenesLoading || usuarioLoading) {
        return <p>Cargando...</p>;
    }

    if (ordenesError || usuarioError) {
        return <p>Error: {ordenesError || usuarioError}</p>;
    }
    let productos = [];
    if (items.productosComprados) {
        try {
            productos = JSON.parse(items.productosComprados);
        } catch (e) {
            console.error("Error al parsear productosComprados:", e);
        }
    }

    return (
        <div className="detallesOrden-container">

        <div className="detallesOrden-paper">
            <div className="detallesOrden-headerBand">
            <h1 className="detallesOrden-titulo">ORDEN DE COMPRA</h1>
            </div>
            
            <div className="detallesOrden-header">
            <div className="detallesOrden-empresa">
                <h2>EMPRESA</h2>
                <div className="detallesOrden-empresaInfo">
                <div>The Golden Feather</div>
                </div>
            </div>
            <div className="detallesOrden-numero">
                <div className="detallesOrden-numeroOrden">Nº ORDEN <span>{items.id}</span></div>
                <div className="detallesOrden-fecha">FECHA <span>{items.fecha}</span></div>
            </div>
            </div>

            <div className="detallesOrden-enviar">
            <div className="detallesOrden-seccionTitulo">ENVIAR A:</div>
            <div className="detallesOrden-proveedor">
                <div className="detallesOrden-proveedor-info">
                <div className="detallesOrden-infoRow"><span>DOMICILIO</span> {usuario.direccion.split(",")[0].trim()}</div>
                <div className="detallesOrden-infoRow"><span>CIUDAD</span> {usuario.direccion.split(",")[1]?.trim()}</div>
                <div className="detallesOrden-infoRow"><span>NOMBRE</span> {usuario.nombre} {usuario.apellido}</div>
                <div className="detallesOrden-infoRow"><span>MAIL</span> {usuario.mail}</div>
                </div>
                {/* 
                <div className="detallesOrden-entrega">
                <div className="detallesOrden-infoRow"><span>ENTREGA</span> Envío a domicilio</div>
                <div className="detallesOrden-infoRow"><span>PLAZO</span> 15 días</div>
                <div className="detallesOrden-infoRow"><span>PAGO</span> Transferencia bancaria</div>
                </div>
                */}
            </div>
            </div>

            <div className="detallesOrden-tablaContainer">
            <table className="detallesOrden-tabla">
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th>LIBRO</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO UNITARIO</th>
                        <th>PRECIO TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                {productos.length > 0 && (
                    productos.map((producto, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{producto.titulo}</td>
                            <td>{producto.cantidad}</td>
                            <td>$ {producto.precioUnitario.toFixed(2)}</td>
                            <td>$ {(producto.precioUnitario * producto.cantidad).toFixed(2)}</td>
                        </tr>
                    ))
                )}

                {productos.length === 0 && (
                    <tr>
                        <td colSpan="5">No se encontraron productos en la orden.</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>

            <div className="detallesOrden-total">
            <div className="detallesOrden-totalRow"><span>SUBTOTAL</span> ${items.totalSinDescuento}</div>
            <div className="detallesOrden-totalRow"><span>DESCUENTO</span> {items.descuento * 100}%</div>
            <div className="detallesOrden-totalFinal"><span>TOTAL</span> ${items.totalConDescuento}</div>
            </div>

            <div className="detallesOrden-firmas">
            <div className="detallesOrden-firma">
                <div className="detallesOrden-linea"></div>
                <span>Firma del vendedor</span>
            </div>
            <div className="detallesOrden-firma">
                <div className="detallesOrden-linea"></div>
                <span>Firma del comprador</span>
            </div>
            </div>
        </div>
        
        <div className="detallesOrden-back">
                <button className="detallesOrden-backButton" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
            </div>
        </div>
    );
    };

export default DetallesOrden;
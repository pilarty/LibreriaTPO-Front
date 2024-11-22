import '../views/VerOrdenes.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdenesById } from '../Redux/ordenesSlice';
import { useState, useEffect } from 'react';

const DetallesOrden = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.ordenes);

    useEffect(() => {
        dispatch(getOrdenesById(id));
    }, [dispatch, id]);
    
    if (loading) {
        return <p>Cargando...</p>;
    }
    
    if (error) {
        return <p>Error al obtener la orden: {error}</p>;
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
                <div className="detallesOrden-infoRow"><span>DOMICILIO</span> Rioja 398 -</div>
                <div className="detallesOrden-infoRow"><span>CIUDAD</span> Palo Bajo</div>
                <div className="detallesOrden-infoRow"><span>CONTACTO</span> Juan</div>
                <div className="detallesOrden-infoRow"><span>TELÉFONO</span> 333-5212</div>
                </div>
                <div className="detallesOrden-entrega">
                <div className="detallesOrden-infoRow"><span>ENTREGA</span> Envío a domicilio</div>
                <div className="detallesOrden-infoRow"><span>PLAZO</span> 15 días</div>
                <div className="detallesOrden-infoRow"><span>PAGO</span> Transferencia bancaria</div>
                </div>
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
                <tr>
                    <td>1</td>
                    <td>Cable de red</td>
                    <td>2</td>
                    <td>$ 12,00</td>
                    <td>$ 24,00</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Extensión</td>
                    <td>1</td>
                    <td>$ 5,00</td>
                    <td>$ 5,00</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Triple</td>
                    <td>1</td>
                    <td>$ 4,00</td>
                    <td>$ 4,00</td>
                </tr>
                </tbody>
            </table>
            </div>

            <div className="detallesOrden-total">
            <div className="detallesOrden-totalRow"><span>SUBTOTAL</span> $ 33,00</div>
            <div className="detallesOrden-totalRow"><span>DESCUENTO</span> 15%</div>
            <div className="detallesOrden-totalFinal"><span>TOTAL</span> $ 39,93</div>
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
        </div>
    );
    };

export default DetallesOrden;
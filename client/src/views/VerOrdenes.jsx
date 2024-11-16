import React from 'react';
import './VerOrdenes.css';

const VerOrdenes = () => {
  const ordenes = [
    {
      id: '#242',
      cliente: 'Juan Pérez',
      fecha: '11 Sep, 2023',
      estado: 'En espera',
      direccion: 'Calle Principal 123, Ciudad',
      envio: 'vía Envío Express',
      total: '€3.25'
    },
    {
      id: '#212',
      cliente: 'María García',
      fecha: '6 Sep, 2023',
      estado: 'En espera',
      direccion: 'Avenida Central 456, Ciudad',
      envio: 'vía Envío Express',
      total: '€4.50'
    },
    {
      id: '#108',
      cliente: 'Carlos López',
      fecha: '5 Sep, 2023',
      estado: 'En espera',
      direccion: 'Plaza Mayor 789, Ciudad',
      envio: 'vía Envío Express',
      total: '€5.63'
    }
  ];

  return (
    <div className="VerOrdenes-contenedor">
      <div className="VerOrdenes-cabecera">
        <h1 className="VerOrdenes-titulo">Órdenes de Compra</h1>
        
      </div>

      <div className="VerOrdenes-estadisticas">
        <div className="VerOrdenes-contadores">
          <span>Todas (323)</span>
          <span>|</span>
          <span>En Proceso (41)</span>
          <span>|</span>
          <span>En Espera (203)</span>
          <span>|</span>
          <span>Completadas (43)</span>
          <span>|</span>
          <span>Canceladas (36)</span>
        </div>
      </div>

      <div className="VerOrdenes-herramientas">
        
        <select className="VerOrdenes-selectFechas">
          <option>Todas las fechas</option>
        </select>
        <div className="VerOrdenes-filtroCliente">
          <select>
            <option>Filtrar por cliente</option>
          </select>
        </div>
        <button className="VerOrdenes-botonFiltrar">Filtrar</button>
        
        <span className="VerOrdenes-totalItems">323 items</span>
        <div className="VerOrdenes-paginacion">
          <button className="VerOrdenes-botonPagina">⟪</button>
          <button className="VerOrdenes-botonPagina">←</button>
          <span>17 de 17</span>
          <button className="VerOrdenes-botonPagina">→</button>
          <button className="VerOrdenes-botonPagina">⟫</button>
        </div>
      </div>

      <table className="VerOrdenes-tabla">
        <thead>
          <tr className="VerOrdenes-encabezadoTabla">
            <th className="VerOrdenes-columna">
              <input type="checkbox" className="VerOrdenes-checkboxPrincipal" />
            </th>
            <th className="VerOrdenes-columna">Orden</th>
            <th className="VerOrdenes-columna">Fecha</th>
            <th className="VerOrdenes-columna">Estado</th>
            <th className="VerOrdenes-columna">Dirección de Envío</th>
            <th className="VerOrdenes-columna">Total</th>
            <th className="VerOrdenes-columna">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.id} className="VerOrdenes-fila">
              <td className="VerOrdenes-celda">
                <input type="checkbox" className="VerOrdenes-checkboxOrden" />
              </td>
              <td className="VerOrdenes-celda">
                <div className="VerOrdenes-infoOrden">
                  <span className="VerOrdenes-idCliente">
                    {orden.id} {orden.cliente}
                  </span>
                </div>
              </td>
              <td className="VerOrdenes-celda">{/*{orden.fecha}*/} 13/11/2003</td>
              <td className="VerOrdenes-celda">
                <span className="VerOrdenes-estadoEtiqueta">
                  {/*{orden.estado} */} En espera
                </span>
              </td>
              <td className="VerOrdenes-celda">
                <div className="VerOrdenes-infoEnvio">
                  <div className="VerOrdenes-direccion">{orden.direccion}</div>
                  <div className="VerOrdenes-metodoEnvio">{orden.envio}</div>
                </div>
              </td>
              <td className="VerOrdenes-celda">
                <span className="VerOrdenes-total">{orden.total}</span>
              </td>
              <td className="VerOrdenes-celda">
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerOrdenes;
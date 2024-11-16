
import './VerOrdenes.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdenes } from '../Redux/ordenesSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const VerOrdenes = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const dispatch = useDispatch();
  const {items: items, loading, error} = useSelector((state) => state.ordenes);
  
  useEffect(() => {
    dispatch(getOrdenes()); {/*{ page: currentPage } */}
  }, [dispatch, currentPage]);
  
  if (loading || items.length === 0) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <p>Errro al cargar las ordenes: {error}</p>

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
          {items.content.map((orden) => (
            <tr key={orden.id} className="VerOrdenes-fila">
              <td className="VerOrdenes-celda">
                <input type="checkbox" className="VerOrdenes-checkboxOrden" />
              </td>
              <td className="VerOrdenes-celda">
                <div className="VerOrdenes-infoOrden">
                  <span className="VerOrdenes-idCliente">
                    #{orden.id} {orden.usuario.nombre} {orden.usuario.apellido}
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
                  <div className="VerOrdenes-direccion">{orden.usuario.direccion}</div>
                </div>
              </td>
              <td className="VerOrdenes-celda">
                <span className="VerOrdenes-total">{orden.totalConDescuento}</span>
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
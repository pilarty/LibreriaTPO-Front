import './VerOrdenes.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdenes } from '../Redux/ordenesSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import "./App.css";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Usuario from '../assets/Usuario.png'
import Carrito from '../assets/Carrito.png'
import Hamburguesa from '../assets/hamburguesa.png'
import MenuDesplegable from "../components/MenuDesplegable";

const VerOrdenes = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.ordenes);
  
  useEffect(() => {
    dispatch(getOrdenes({ page: currentPage, size: pageSize }));
  }, [dispatch, currentPage, pageSize]);

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

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(items.totalPages - 1);
  };

  const manejarUsuario = () => {
    navigate("/Usuario");
  }
  const manejarCarrito = () => {
    navigate("/Carrito");
  }
  
  const manejarHamburguesa = () => {
    setMenuVisible(!menuVisible);
  }
  
  if (loading || !items.content) return <LoadingSpinner />;
  if (error) return <p>Error al cargar las ordenes: {error}</p>;

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
    
          {menuVisible && <MenuDesplegable></MenuDesplegable>}

    <div className="VerOrdenes-contenedor">
      <div className="VerOrdenes-cabecera">
        <h1 className="VerOrdenes-titulo">Órdenes de Compra</h1>
        
      </div>

      <div className="VerOrdenes-estadisticas">
        <div className="VerOrdenes-contadores">
          <span>Todas ({items.totalElements})</span>
          <span>|</span>
          <span>En Proceso (41)</span>
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
        
        <span className="VerOrdenes-totalItems">{items.totalElements} Ordenes</span>
        <div className="VerOrdenes-paginacion">
          <button 
            className="VerOrdenes-botonPagina" 
            onClick={handleFirstPage}
            disabled={items.first}
          >
            ⟪
          </button>
          <button 
            className="VerOrdenes-botonPagina"
            onClick={handlePrevPage}
            disabled={items.first}
          >
            ←
          </button>
          <span>{items.number + 1} de {items.totalPages}</span>
          <button 
            className="VerOrdenes-botonPagina"
            onClick={handleNextPage}
            disabled={items.last}
          >
            →
          </button>
          <button 
            className="VerOrdenes-botonPagina"
            onClick={handleLastPage}
            disabled={items.last}
          >
            ⟫
          </button>
        </div>
      </div>

      <table className="VerOrdenes-tabla">
        <thead>
          <tr className="VerOrdenes-encabezadoTabla">
            
            <th className="VerOrdenes-columna">Orden</th>
            <th className="VerOrdenes-columna">Fecha</th>
            <th className="VerOrdenes-columna">Estado</th>
            <th className="VerOrdenes-columna">Dirección de Envío</th>
            <th className="VerOrdenes-columna">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.content.map((orden) => (
            <tr key={orden.id} className="VerOrdenes-fila">
              
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
    </div>
  );
};

export default VerOrdenes;
import React from 'react';
import "../views/AdministrarLibros.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lapiz from "../assets/lapiz.png"
import lapiz_solo from "../assets/lapiz_solo.png"
import basura from "../assets/basura.png"
import { deleteLibro } from '../Redux/librosSlice';
import { getLibroByIsbn } from '../Redux/librosSlice';
import { putLibro } from '../Redux/librosSlice';
import EliminarLibroConfirmacionPopUp from './EliminarLibroConfirmacionPopUp';
import EliminarLibroNotificacionPopUp from './EliminarLibroNotificacionPopUp';


const AdministrarLibrosLibros = ({ isbn}) => {
    const navigate = useNavigate();
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

    const dispatch = useDispatch()
    const libro = useSelector(state => state.libros.items.content.find((libro) => libro.isbn === isbn));

    if (!libro) {
        return <p>Cargando información del libro...</p>; // Placeholder mientras se cargan los datos
      }

    const {titulo, autor, precio, image, stock, cantPaginas, sinopsis, editorial, edicion, idioma, generoId,} = libro;

    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';

    const eliminarLibro = () =>{
        setMostrarConfirmacion(true);
    } 

    const confirmarEliminacion = () => {
        setMostrarConfirmacion(false);
        dispatch(deleteLibro(isbn)).then(() => {
            //setMostrarNotificacion(true);
            alert(`Libro con ISBN ${isbn} eliminado correctamente.`);
        });
    };

    const cerrarNotificacion = () => {
        setMostrarNotificacion(false);
    };

    const editarLibro = () =>{
        navigate(`/EditarLibro/${isbn}`);
    }

    const reducirStock = () => {
        if (stock > 1) {
          const nuevoStock = stock - 1;
          const updatedLibro = { ...libro, stock: nuevoStock };
          dispatch(putLibro({ isbn, updatedLibro }));
        }
      };

    const aumentarStock = () => {
        const nuevoStock = stock + 1;
        const updatedLibro = { ...libro, stock: nuevoStock };
        dispatch(putLibro({ isbn, updatedLibro }));
    }
    
    return (
        <div className="AdministrarLibros-book-container">
            <img src={imageSrc} alt={titulo} className="AdministrarLibros-book-image" />
            <div className="AdministrarLibros-book-details">
                <div className="AdministrarLibros-book-header">
                    <div className="AdministrarLibros-title-container">
                        <h3 className="AdministrarLibros-book-title">
                            {titulo}
                        </h3>
                    </div>
                </div>
                <p className="AdministrarLibros-book-author">{autor}</p>
                <div className="AdministrarLibros-price-button-container">
                    <span className="AdministrarLibros-book-price">${precio}</span>
                </div>
            </div>
            <div className="AdministrarLibros-botones-contenedor">
                <div className='AdministrarLibros-botones-1'>
                    <div className="AdministrarLibros-stock-controls">
                        <button onClick={reducirStock} className="AdministrarLibros-stock-button">-</button>
                        <span className="AdministrarLibros-stock-display">{stock}</span>
                        <button onClick={aumentarStock} className="AdministrarLibros-stock-button">+</button>
                    </div>
                    <button onClick={eliminarLibro} className="AdministrarLibros-delete-button">
                        <img className="AdministrarLibros-img-lapiz" src={basura} alt="basura" />
                    </button>
                    {mostrarConfirmacion && (
                        <EliminarLibroConfirmacionPopUp
                            mensaje={`¿Estás seguro de que deseas eliminar el libro  ${titulo}?`}
                            onConfirm={confirmarEliminacion}
                            onCancel={() => setMostrarConfirmacion(false)}
                        />
                    )}
                    {mostrarNotificacion && (
                        <EliminarLibroNotificacionPopUp
                            mensaje={`El libro ${titulo} fue eliminado correctamente.`}
                            onClose={cerrarNotificacion}
                        />
                    )}
                </div>
                <div className='AdministrarLibros-botones-2'>
                    <button onClick={editarLibro} className="AdministrarLibros-edit-button">
                        <img className="AdministrarLibros-img-lapiz" src={lapiz_solo} alt="lapiz" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdministrarLibrosLibros;

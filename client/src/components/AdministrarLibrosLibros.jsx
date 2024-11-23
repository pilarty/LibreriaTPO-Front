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
import LoadingSpinner from './LoadingSpinner';


const AdministrarLibrosLibros = ({ libro}) => {
    const navigate = useNavigate();
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

    const dispatch = useDispatch()
    //const libro = useSelector(state => state.libros.items.content.find((libro) => libro.isbn === isbn));

    const imageSrc = libro.image ? `data:image/jpeg;base64,${libro.image}` : 'default-image-path.jpg';

    const eliminarLibro = () =>{
        setMostrarConfirmacion(true);
    } 

    const confirmarEliminacion = () => {
        setMostrarConfirmacion(false);
        dispatch(deleteLibro(libro.isbn)).then(() => {
            //setMostrarNotificacion(true);
            alert(`Libro con ISBN ${libro.isbn} eliminado correctamente.`);
        });
    };

    const cerrarNotificacion = () => {
        setMostrarNotificacion(false);
    };

    const editarLibro = () =>{
        navigate(`/EditarLibro/${libro.isbn}`);
    }

    
    return (
        <div className="AdministrarLibros-book-container">
            <img src={imageSrc} alt={libro.titulo} className="AdministrarLibros-book-image" />
            <div className="AdministrarLibros-book-details">
                <div className="AdministrarLibros-book-header">
                    <div className="AdministrarLibros-title-container">
                        <h3 className="AdministrarLibros-book-title">
                            {libro.titulo}
                        </h3>
                    </div>
                </div>
                <p className="AdministrarLibros-book-author">{libro.autor}</p>
                <div className="AdministrarLibros-price-button-container">
                    <span className="AdministrarLibros-book-price">${libro.precio}</span>
                </div>
            </div>
            <div className="AdministrarLibros-botones-contenedor">
                <div className='AdministrarLibros-botones-1'>
                    <div className="AdministrarLibros-stock-controls">
                        <span className="AdministrarLibros-stock-display">Stock: </span>
                        <span className="AdministrarLibros-stock-display">{libro.stock}</span>
                    </div>
                    <button onClick={eliminarLibro} className="AdministrarLibros-delete-button">
                        <img className="AdministrarLibros-img-lapiz" src={basura} alt="basura" />
                    </button>
                    {mostrarConfirmacion && (
                        <EliminarLibroConfirmacionPopUp
                            mensaje={`¿Estás seguro de que deseas eliminar el libro  ${libro.titulo}?`}
                            onConfirm={confirmarEliminacion}
                            onCancel={() => setMostrarConfirmacion(false)}
                        />
                    )}
                    {mostrarNotificacion && (
                        <EliminarLibroNotificacionPopUp
                            mensaje={`El libro ${libro.titulo} fue eliminado correctamente.`}
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

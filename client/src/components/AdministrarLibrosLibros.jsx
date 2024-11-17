import React from 'react';
import "../views/AdministrarLibros.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import lapiz from "../assets/lapiz.png"
import lapiz_solo from "../assets/lapiz_solo.png"
import basura from "../assets/basura.png"
import { deleteLibro } from '../Redux/librosSlice';


const AdministrarLibrosLibros = ({ isbn, titulo, autor, precio, image, stock }) => {
    const navigate = useNavigate();
    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';

    const dispatch = useDispatch()

    const eliminarLibro = () =>{
        dispatch(deleteLibro(isbn))
    } 

    const editarLibro = () =>{}
    const reducirStock = () =>{}
    const aumentarStock = () =>{}
    
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

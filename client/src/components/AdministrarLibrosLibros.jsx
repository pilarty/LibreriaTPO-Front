import React from 'react';
import "../views/AdministrarLibros.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const AdministrarLibrosLibros = ({ isbn, titulo, autor, precio, sinopsis, image }) => {
    const navigate = useNavigate();
    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';
    const [mensaje, setMensaje] = useState('');

    const manejarLibros = (isbn) => {
        navigate(`/Libro/${isbn}`);
    }
    
    return (
        <div className="AdministrarLibros-book-container">
            <img src={imageSrc} alt={titulo} className="AdministrarLibros-book-image" />
            <div className="AdministrarLibros-book-details">
                <div className="AdministrarLibros-book-header">
                    <div className="AdministrarLibros-title-container">
                        <h3 className="AdministrarLibros-book-title" onClick={() => manejarLibros(isbn)}>
                            {titulo}
                        </h3>
                    </div>
                    
                </div>
                <p className="AdministrarLibros-book-author">{autor}</p>
                <div className="AdministrarLibros-price-button-container">
                    <span className="AdministrarLibros-book-price">${precio}</span>
                </div>
            </div>
        </div>
    );
};

export default AdministrarLibrosLibros;

import React from 'react';
import "../views/ListaLibros.css";
import Carrito from '../assets/Carrito.png';

const LibroListaLibros = ({ titulo, autor, precio, sinopsis, image }) => {
    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';
    
    return (
        <>
            <div className="book-container">
            <img src={imageSrc} alt={titulo} className="book-image" />
                <div className="book-details">
                    <div className="book-header">
                        <div>
                            <h3 className="book-title">{titulo}</h3>
                            <p className="book-author">{autor}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="book-price">${precio}</span>
                            <button className="cart-button">
                                <img className="img-carrito" src={Carrito} alt="Carrito" />
                            </button>
                        </div>
                    </div>
                    <h4 className="synopsis-title">Sinopsis</h4>
                    <p className="synopsis-text">{sinopsis}</p>
                </div>
            </div>
        </>
    );
};

export default LibroListaLibros;

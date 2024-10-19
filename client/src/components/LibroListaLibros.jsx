import React from 'react';
import { ShoppingCart } from 'lucide-react';
import './ListaLibros.css';

const LibroListaLibros = ({ titulo, autor, precio, sinopsis, urlImagen }) => (
    <div className="book-container">
        <img src={urlImagen} alt={titulo} className="book-image" />
        <div className="book-details">
            <div className="book-header">
                <div>
                    <h3 className="book-title">{titulo}</h3>
                    <p className="book-author">{autor}</p>
                </div>
                <div className="flex items-center">
                    <span className="book-price">${precio}</span>
                    <button className="cart-button">
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
            <h4 className="synopsis-title">Sinopsis</h4>
            <p className="synopsis-text">{sinopsis}</p>
        </div>
    </div>
);

export default LibroListaLibros;

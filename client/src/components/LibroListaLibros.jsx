import React from 'react';
import "../views/ListaLibros.css";
import Carrito from '../assets/Carrito.png';
import { useNavigate } from 'react-router-dom';
import Estrella from '../assets/Estrella.png'

const LibroListaLibros = ({ isbn, titulo, autor, precio, sinopsis, image }) => {
    const navigate = useNavigate();
    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';

    
    const emailUsuario = sessionStorage.getItem('mail');

    const manejarAgregarACarrito = (isbn) => {
        if (!emailUsuario) {
            navigate('/LoginPage'); 
        } else {
            const requestBody = {
                cantidad: 1,
                isbn: isbn, 
                carrito_mail: emailUsuario
            };
    
            fetch(`http://localhost:4002/productosCarrito`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo agregar el producto al carrito");
                }
                return response.json(); 
            })
            .then(data => {
                console.log("Producto agregado al carrito:", data);
                alert("Producto agregado al carrito");
            })
            .catch(error => {
                console.error("Error:", error);
                alert("No se pudo agregar el producto al carrito. Intente de nuevo.");
            });
        }
    };
    
    return (
        <div className="libroListaLibros-book-container">
            <img src={imageSrc} alt={titulo} className="libroListaLibros-book-image" />
            <div className="libroListaLibros-book-details">
                <div className="libroListaLibros-book-header">
                    <div className="libroListaLibros-title-container">
                        <h3 className="libroListaLibros-book-title">{titulo}</h3>
                        <button className="libroListaLibros-star-button" onClick={() => manejarFavorito(isbn)}>
                            <img src={Estrella} alt="Estrella" className="libroListaLibros-star-icon" />
                        </button>
                    </div>
                    <div className="libroListaLibros-price-button-container">
                        <span className="libroListaLibros-book-price">${precio}</span>
                        <button className="libroListaLibros-cart-button" onClick={() => manejarAgregarACarrito(isbn)}>
                            <img className="libroListaLibros-img-carrito" src={Carrito} alt="Carrito" />
                        </button>
                    </div>
                </div>
                <p className="libroListaLibros-book-author">{autor}</p>
                <h4 className="libroListaLibros-synopsis-title">Sinopsis</h4>
                <p className="libroListaLibros-synopsis-text">{sinopsis}</p>
            </div>
        </div>
    );
    
    
    
};

export default LibroListaLibros;

import React from 'react';
import "../views/ListaLibros.css";
import Carrito from '../assets/Carrito.png';
import { useNavigate } from 'react-router-dom';
import Estrella from '../assets/Estrella.png'
import { useState } from 'react';

const LibroListaLibros = ({ isbn, titulo, autor, precio, sinopsis, image }) => {
    const navigate = useNavigate();
    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';
    const emailUsuario = sessionStorage.getItem('mail');
    const [mensaje, setMensaje] = useState('');

    const manejarLibros = (isbn) => {
        navigate(`/Libro/${isbn}`);
    }

    const mostrarMensaje = (texto) => {
        setMensaje(texto);
        setTimeout(() => setMensaje(''), 3000);
    };

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
                mostrarMensaje("Producto agregado al carrito");
            })
            .catch(error => {
                mostrarMensaje("No se pudo agregar el producto al carrito. Intente de nuevo.");
            });
        }
    };

    const manejarFavorito = (isbn) => {
        if (!emailUsuario) {
            navigate('/LoginPage'); 
            return;
        }

        const favoritosKey = `favoritos_${emailUsuario}`;
        const favoritosGuardados = JSON.parse(localStorage.getItem(favoritosKey)) || [];
        
        const yaEsFavorito = favoritosGuardados.includes(isbn);
    
        if (yaEsFavorito) {
            mostrarMensaje("Este libro ya está en favoritos");
        } else {
            favoritosGuardados.push(isbn);
            localStorage.setItem(favoritosKey, JSON.stringify(favoritosGuardados));
            console.log(`Libro agregado a favoritos: ${isbn}`); // Log para verificar que se agregó
            console.log(`Favoritos actuales: ${JSON.parse(localStorage.getItem(favoritosKey))}`); // Ver lista actual de favoritos
            mostrarMensaje("Libro agregado a favoritos");
        }
    };
    
    return (
            <div className="libroListaLibros-book-container">
                {mensaje && <p className="libroListaLibros-mensaje-general">{mensaje}</p>}
                <img src={imageSrc} alt={titulo} className="libroListaLibros-book-image" />
                <div className="libroListaLibros-book-details">
                    <div className="libroListaLibros-book-header">
                        <div className="libroListaLibros-title-container">
                        <h3
                        className="libroListaLibros-book-title"
                        onClick={() => manejarLibros(isbn)} // Acción al hacer clic
                    >
                        {titulo}
                    </h3>
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

import React from 'react';
import "../views/ListaLibros.css";
import Carrito from '../assets/Carrito.png';
import { useNavigate } from 'react-router-dom';

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
        <div className="book-containerPILAR">
            <img src={imageSrc} alt={titulo} className="book-imagePILAR" />
            <div className="book-detailsPILAR">
                <div className="book-headerPILAR">
                    <div>
                        <h3 className="book-titlePILAR">{titulo}</h3>
                        <p className="book-authorPILAR">{autor}</p>
                    </div>
                    <div className="flex items-center">
                        <span className="book-pricePILAR">${precio}</span>
                        <button className="cart-buttonPILAR" onClick={() => manejarAgregarACarrito(isbn)}>
                            <img className="img-carrito" src={Carrito} alt="Carrito" />
                        </button>
                    </div>
                </div>
                <h4 className="synopsis-titlePILAR">Sinopsis</h4>
                <p className="synopsis-textPILAR">{sinopsis}</p>
            </div>
        </div>
    );
};

export default LibroListaLibros;

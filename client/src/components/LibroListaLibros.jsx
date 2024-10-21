import React from 'react';
import "../views/ListaLibros.css";
import Carrito from '../assets/Carrito.png';
import { useNavigate } from 'react-router-dom';

const LibroListaLibros = ({ isbn, titulo, autor, precio, sinopsis, image }) => {
    const navigate = useNavigate();
    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';
    
    const emailUsuario = "pgarcia@uade.edu.ar";
    // const emailUsuario = sessionStorage.getItem('userEmail'); // DESCOMENTARLO
    /*
    const manejarAgregarACarrito = (isbn) => {
        if (!emailUsuario) {
            navigate('/LoginPage'); 
        } else {
            const requestBody = {
                cantidad: 1,
                isbn: isbn, 
                carrito_mail: emailUsuario
            };

            const URL_PRODUCTOS = `http://localhost:4002/productosCarrito/${emailUsuario}/listaDeProductosCarritoByMail`;

            fetch(URL_PRODUCTOS)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(isbn);
                    // Verifica si el ISBN ya está en la lista de productos (sin asumir estructuras anidadas)
                    const libroExistente = data.find(producto_carrito => producto_carrito.libro.isbn === isbn);
                    if (libroExistente) {
                        const nuevaCantidad = libroExistente.cantidad + 1; // Aumentar la cantidad en 1
                        actualizarCantidadEnServidor(nuevaCantidad, isbn);
                    } else {
                        agregarProductoACarrito(requestBody);
                    }
                })
                .catch(error => {
                    console.error("Error al obtener productos del carrito:", error);
                });
        }
    };

    const agregarProductoACarrito = (requestBody) => {
        fetch(`http://localhost:4002/productosCarrito`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); 
        })
        .then(data => {
            console.log("Success:", data);
            alert("Producto agregado al carrito");
        })
        .catch(error => {
            console.error("Error:", error);
            alert("No se pudo agregar el producto al carrito. Intente de nuevo.");
        });
    };

    const actualizarCantidadEnServidor = async (nuevaCantidad, isbn) => {
        const url = `http://localhost:4002/productosCarrito/ActualizarCantLibro`;
        const data = {
            cantidad: nuevaCantidad,
            isbn: isbn,
            carrito_mail: emailUsuario,
        };
    
        try {
            console.log('Actualizando cantidad:', nuevaCantidad, 'ISBN:', isbn, 'Email:', emailUsuario);
    
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error al actualizar la cantidad: ${response.status} ${errorMessage}`);
            }
    
            const responseData = await response.json();
            console.log('Cantidad actualizada:', responseData);
            alert("Cantidad actualizada en el carrito");
            
        } catch (error) {
            console.error('Error:', error);
            alert("No se pudo actualizar la cantidad. Intente de nuevo.");
        }
    };
    */

    return (
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
                        <button className="cart-button" /*onClick={() => manejarAgregarACarrito(isbn)}*/>
                            <img className="img-carrito" src={Carrito} alt="Carrito" />
                        </button>
                    </div>
                </div>
                <h4 className="synopsis-title">Sinopsis</h4>
                <p className="synopsis-text">{sinopsis}</p>
            </div>
        </div>
    );
};

export default LibroListaLibros;

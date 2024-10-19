import React, { useState, useEffect } from 'react';
import ListaLibrosListaLibros from '../components/ListaLibrosListaLibros';

const ListaLibros = ({ generoId }) => {
    const [generoNombre, setGeneroNombre] = useState(null);
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        // Fetch para obtener el nombre del género
        fetch(`http://localhost:4002/generos/${generoId}`)
            .then((response) => response.json())
            .then((data) => {
                setGeneroNombre(data.nombre); // Asumiendo que el nombre del género viene en 'data.nombre'
            })
            .catch((error) => {
                console.error("Error al obtener el género: ", error);
            });
    }, [generoId]);

    useEffect(() => {
        // Fetch para obtener todos los libros
        fetch("http://localhost:4002/libros")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Filtrar los libros que coinciden con generoId
                const librosFiltrados = data.content.filter(libro => libro.generoId === generoId);
                setLibros(librosFiltrados); // Guardar los libros filtrados
            })
            .catch((error) => {
                console.error("Error al obtener los datos: ", error);
            });
    }, [generoId]);

    if (libros.length === 0 || !generoNombre) return <div>Cargando...</div>; // Cambia el mensaje a "Cargando..." cuando no hay libros o el género no se ha cargado

    return (
        <div className="container">
            <h1 className="title">Libros del género {generoNombre}</h1> {/* Muestra el nombre del género */}
            <h2 className="subtitle">
                Libros del género {generoNombre}
            </h2>
            <ListaLibrosListaLibros libros={libros} />
        </div>
    );
};

export default ListaLibros;

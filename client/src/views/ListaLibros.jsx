import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Asegúrate de importar useParams
import ListaLibrosListaLibros from '../components/ListaLibrosListaLibros';

const ListaLibros = () => {
    const { generoId } = useParams(); // Obtener el ID del género desde la URL
    console.log("generoId:", generoId); // Para verificar que se obtiene el ID correctamente

    const [generoNombre, setGeneroNombre] = useState(null);
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        if (!generoId) return;

        // Fetch para obtener el nombre del género
        fetch(`http://localhost:4002/generos/${generoId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setGeneroNombre(data.nombre);
            })
            .catch((error) => {
                console.error("Error al obtener el género: ", error);
            });
    }, [generoId]);

    useEffect(() => {
        fetch("http://localhost:4002/libros")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log("Datos de libros:", data); // Para verificar la respuesta
                // Filtrar los libros usando 'genero_id' que corresponde a la propiedad en la base de datos
                const librosFiltrados = data.content.filter(libro => {
                    console.log("Libro genero_id:", libro.genero_id); // Para ver el id de género de cada libro
                    return libro.genero_id === Number(generoId); // Comparar como número
                });
                console.log("Libros filtrados:", librosFiltrados); // Para ver los libros filtrados
                setLibros(librosFiltrados);
            })
            .catch((error) => {
                console.error("Error al obtener los libros: ", error);
            });
    }, [generoId]);

    if (libros.length === 0 || !generoNombre) {
        return <div>Cargando...</div>; // Mensaje mientras se cargan los libros
    }

    return (
        <div className="container">
            <h1 className="title">Libros del género {generoNombre}</h1>
            <h2 className="subtitle">Libros del género {generoNombre}</h2>
            <ListaLibrosListaLibros libros={libros} />
        </div>
    );
};

export default ListaLibros;

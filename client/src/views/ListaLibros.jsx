import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListaLibrosListaLibros from '../components/ListaLibrosListaLibros';

const ListaLibros = () => {
    const { generoId } = useParams(); // Obtener el ID del género desde la URL
    const [generoNombre, setGeneroNombre] = useState(null);
    const [libros, setLibros] = useState([]); // Estado para almacenar los libros
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        if (!generoId) return;

        // Fetch para obtener el nombre del género y los libros
        fetch(`http://localhost:4002/generos/${generoId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setGeneroNombre(data.nombre);
                console.log(data.nombre);

                // Asegúrate de que data.libros sea un array
                if (data.libro && Array.isArray(data.libro)) {
                    setLibros(data.libro);
                    data.libro.forEach(libro => {
                        console.log(libro.isbn); // Imprime cada ISBN
                    });
                } else {
                    console.error("No se encontró la lista de libros en la respuesta.");
                }
            })
            .catch((error) => {
                console.error("Error al obtener el género: ", error);
            })
            .finally(() => {
                setLoading(false); // Cambia el estado de carga a false
            });
    }, [generoId]);

    return (
        <div className="container">
            <div className="title-container"> {/* Contenedor para el título y subtítulo */}
            <h1 className="title">{generoNombre}</h1>
            <h1 className="subtitle">Libros del género {generoNombre}</h1>
        </div>
            <ListaLibrosListaLibros libros={libros} loading={loading} />
        </div>
    );
};

export default ListaLibros;

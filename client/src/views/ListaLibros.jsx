import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListaLibrosListaLibros from '../components/ListaLibrosListaLibros';
import './ListaLibros.css';

const ListaLibros = () => {
    const { generoId } = useParams();
    const [generoNombre, setGeneroNombre] = useState(null);
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!generoId) return;

        fetch(`http://localhost:4002/generos/${generoId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setGeneroNombre(data.nombre);
                if (data.libro && Array.isArray(data.libro)) {
                    setLibros(data.libro);
                } else {
                    console.error("No se encontró la lista de libros en la respuesta.");
                }
            })
            .catch((error) => {
                console.error("Error al obtener el género: ", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [generoId]);

    return (
        <div className="container">
            <div className="title-container">
                <h1 className="title">{generoNombre}</h1>
                <h2 className="subtitle">Libros del género {generoNombre}</h2>
            </div>
            
            <div className="lista-libros-container">
                <ListaLibrosListaLibros libros={libros} loading={loading} />
            </div>
        </div>
    );
};

export default ListaLibros;
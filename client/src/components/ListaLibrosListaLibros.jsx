import React from 'react';
import LibroListaLibros from "./LibroListaLibros";
import { useNavigate } from 'react-router-dom';

const ListaLibrosListaLibros = ({ libros, loading }) => {
    const navigate2 = useNavigate();

    const manejarLibros = (isbn) => {
        navigate2(`/Libro/${isbn}`);
    }
    
    if (loading) {
        return <div>Cargando...</div>; // Mensaje mientras se cargan los libros
    }

    if (libros.length === 0) {
        return <div>No se encontraron libros.</div>; // Mensaje si no hay libros
    }

    return (
        <>
        <div className="listaLibrosListaLibros-libros-container
        ">
                {libros.map((libro) => (
                    //<button className= "listaLibroslistaLibros-boton-libros" onClick={()=>manejarLibros(libro.isbn)}>
                    <LibroListaLibros 
                        key={libro.isbn}
                        isbn={libro.isbn}
                        titulo={libro.titulo}
                        autor={libro.autor}
                        precio={libro.precio}
                        sinopsis={libro.descripcion} 
                        image={libro.image} 
                    />
                ))}
            </div>
        </>
    );
};

export default ListaLibrosListaLibros;

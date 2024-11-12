import React from 'react';
import LibroListaLibros from "./LibroListaLibros";
import LoadingSpinner from './LoadingSpinner';

const ListaLibrosListaLibros = ({ libros, loading }) => {
    
    if (loading) {
        return <div><LoadingSpinner></LoadingSpinner></div>;
    }

    if (libros.length === 0) {
        return <div>No se encontraron libros.</div>;
    }

    return (
        <>
        <div className="listaLibrosListaLibros-libros-container
        ">
                {libros.map((libro) => (
                    
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

import React from 'react';
import LibroListaLibros from "./LibroListaLibros";

const ListaLibrosListaLibros = ({ libros, loading }) => {
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

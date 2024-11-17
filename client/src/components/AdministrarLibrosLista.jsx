import React from 'react';
import AdministrarLibrosLibros from "./AdministrarLibrosLibros";
import LoadingSpinner from './LoadingSpinner';

const AdministrarLibrosLista = ({ libros, loading }) => {
    
    if (loading) {
        return <div><LoadingSpinner></LoadingSpinner></div>;
    }

    if (libros.length === 0) {
        return <div>No se encontraron libros.</div>;
    }

    return (
        <>
        <div className='AdministrarLibros-LibrosContainer'>
                {libros.map((libro) => (
                    
                    <AdministrarLibrosLibros 
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

export default AdministrarLibrosLista;
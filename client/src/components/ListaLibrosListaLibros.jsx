import React from 'react';
import LibroListaLibros from "./LibroListaLibros";

const ListaLibrosListaLibros = ({ libros }) => {
    return (
        <div>
            {libros.map((libro) => (
                <LibroListaLibros 
                    key={libro.isbn}
                    titulo={libro.titulo}
                    autor={libro.autor}
                    precio={libro.precio}
                    sinopsis={libro.descripcion} 
                    image={libro.image} 
                />
            ))}
        </div>
    );
};

export default ListaLibrosListaLibros;

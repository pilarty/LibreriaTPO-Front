import React from 'react';
import LibroListaLibros from "./LibroListaLibros";

const ListaLibrosListaLibros = ({ libros }) => (
    <div>
        {libros.map((libro, index) => (
            <LibroListaLibros 
                key={libro.isbn} // Asegúrate de usar 'libro' aquí
                titulo={libro.titulo} // Cambia 'post' a 'libro'
                autor={libro.autor} // Asegúrate de tener esta propiedad
                precio={libro.precio}
                sinopsis={libro.sinopsis} // Asegúrate de tener esta propiedad
                urlImagen={libro.image} // Cambia 'image' a 'urlImagen' para coincidir con el nombre de la prop
            />
        ))}
    </div>
);

export default ListaLibrosListaLibros;

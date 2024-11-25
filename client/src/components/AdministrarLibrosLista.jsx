import React from 'react';
import AdministrarLibrosLibros from "./AdministrarLibrosLibros";

const AdministrarLibrosLista = ({ libros }) => {
    
    return (
        <>
        <div className='AdministrarLibros-LibrosContainer'>
                {libros.map((libro) => (
                    
                    <AdministrarLibrosLibros 
                        key={libro.isbn}
                        libro={libro}
                    />
                ))}
            </div>
        </>
    );
};

export default AdministrarLibrosLista;
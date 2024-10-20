import "../views/Compra.css";

const ListaLibros = ({ libros }) => (
    <ul className='lista-libros'>
        {libros.map((libro, index) => (
            <li key={index}>
                <span>{libro.nombre}</span>
                <span>{libro.precio}</span>
            </li>
        ))}
    </ul>
);

export default ListaLibros;


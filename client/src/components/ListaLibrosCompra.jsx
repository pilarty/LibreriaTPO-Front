import "../views/Compra.css";

const ListaLibros = ({ libros }) => (
    <ul className='lista-libros'>
        {libros.map((libro, index) => ( //recorre cada elemento del array libros y devuelve un nuevo array con los elementos renderizados como JSX.
            <li key={index}> {/*Es necesario en React cuando se renderizan listas*/}
                <span>{libro.nombre}</span>
                <span>{libro.precio}</span>
            </li>
        ))}
    </ul>
);

export default ListaLibros;


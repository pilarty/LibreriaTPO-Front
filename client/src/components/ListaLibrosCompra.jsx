import "../views/Compra.css";
import { useEffect, useState } from 'react';
const ListaLibros = ( ) => {
    const libros = [
        { nombre: 'Libro1', precio: 89 },
        { nombre: 'Libro2', precio: 10 },
        { nombre: 'Libro3', precio: 70 },
        { nombre: 'Otro libro', precio: 100 },
        { nombre: 'Libro especial', precio: 850 }
    ];
    const mailUsuario = "pgarcia@uade.edu.ar"

    const [posts, setPost] = useState([]);
    console.log(posts)
    //conectar con el back COMO LA MINA
    useEffect(() => { 
        fetch('http://localhost:4002/productosCarrito/pgarcia@uade.edu.ar/listaDeProductosCarritoByMail')
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setPost(data);
          })
          .catch((error) => {
            console.error("Error al obtener los datos: ", error)
          })
      }, [ ]);

    return(
    <ul className='lista-libros'>
        {posts.map((post) => ( 
            <li key={post.id}> {/*Es necesario en React cuando se renderizan listas*/}
                <span>{post.libro.titulo}</span>
                <span>{post.libro.precio}</span>
            </li>
        ))}
    </ul>
    )
};

export default ListaLibros;


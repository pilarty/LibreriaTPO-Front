import "../views/Compra.css";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductosCarrito } from '../Redux/productoCarritoSlice';

const ListaLibros = ( ) => {
    const mailUsuario = sessionStorage.getItem('mail');
    const dispatch = useDispatch();

    const productosCarrito = useSelector((state) => state.productoCarrito.productos);
    const loading = useSelector((state) => state.productoCarrito.loading);
    const error = useSelector((state) => state.productoCarrito.error);

    useEffect(() => {
      dispatch(getProductosCarrito(mailUsuario));
    }, [dispatch, mailUsuario]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al cargar los datos: {error}</div>;
    }

    return(
    <ul className='list-libros'>
        {productosCarrito.map((producto) => ( 
            <li key={producto.id}> {/*Es necesario en React cuando se renderizan listas*/}
                <span>{producto.libro.titulo}</span>
                <span>{producto.libro.precio}</span>
            </li>
        ))}
    </ul>
    )
};

export default ListaLibros;


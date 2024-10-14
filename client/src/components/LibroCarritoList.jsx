import LibroCarrito from './LibroCarrito';
import { useState, useEffect } from 'react';

{/* 
const librosSimulados = [
    {
    id: 1,
    title: "Cien años de soledad",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ919f9HRwod-WikobZ1GbmxA7WDdXOBeehSP6C1U0hRlVdjVSI1wCHdQ2AjnDM-9go7j0&usqp=CAU",
    price: 15000, 
    quantity: 1, 
    },
    {
    id: 2,
    title: "El amor en los tiempos del cólera",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNtOHlFQI6XGe8MZck5PMDhwEXpyf1odO9Q&s",
    price: 19000,
    quantity: 2,
    },
    {
    id: 3,
    title: "1984",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXnK34Ff9WsOstGPGmtzQktAE0hxnnNV0ewWUeNQicjco2Y6ZUblEvbcUK1EftWqb7a3I&usqp=CAU",
    price: 10000,
    quantity: 1,
        
}
];
*/}

const LibroCarritoList = ({productosCarrito, emailUsuario}) => {
    const [detallesLibros, setDetallesLibros] = useState([]);

    useEffect(() => {
        if (productosCarrito.length > 0 && emailUsuario) {
            const fetchDetallesLibros = async () => {
                try {
                    const detalles = await Promise.all(
                        productosCarrito.map((producto) =>
                            fetch(`http://localhost:4002/libros/${producto.isbn}`)
                                .then((response) => response.json())
                        )
                    );
                    setDetallesLibros(detalles);
                } catch (error) {
                    console.error("Error al obtener los detalles de los libros:", error);
                }
            };
            fetchDetallesLibros();
        }
    }, [productosCarrito, emailUsuario]);

    return (
        <>
        <div className="lista-libros">
            <div className="encabezado-libro">
                <p>Producto/s</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Subtotal</p>
            </div>

            {detallesLibros.map((libro, index) => (
                <div >
                    <LibroCarrito 
                    key={libro.id}
                    link_imagen={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNtOHlFQI6XGe8MZck5PMDhwEXpyf1odO9Q&s"} //CAMBIAR, HAY QUE PONER EL LINK ADECUADO (NECESITO EL GET DE LA IMAGEN)
                    titulo={libro.titulo} 
                    precio={libro.precio}
                    cantidad={productosCarrito[index].cantidad} //Obtiene la cantidad que esta guardada en producto carrito 
                    isbn={libro.isbn}
                    carrito_mail={emailUsuario}
                    />
                    {index !== detallesLibros.length - 1 && <hr />}
                </div>
            ))}
        </div>
        </>
    );
};
export default LibroCarritoList;

    {/* 
    const [totalSubtotal, setTotalSubtotal] = useState(0);

    useEffect(() => {
        // Calcular el total de subtotales de todos los libros
        const total = librosSimulados.reduce((acumulado, libro) => {
            return acumulado + libro.price * libro.quantity;
        }, 0);

        setTotalSubtotal(total);

        // Pasar el total al componente Carrito a través de onCalcularTotal
        if (onCalcularTotal) {
            onCalcularTotal(total);
        }
    }, [librosSimulados, onCalcularTotal]);


    return (
        <>
    <div className="lista-libros">
        <div className="encabezado-libro">
                <p>Producto/s</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Subtotal</p>
            </div>
            {librosSimulados.map((libro, index) => (
                <div key={libro.id}>
                    <LibroCarrito libro={libro} />
                    {index !== librosSimulados.length - 1 && <hr />}
                </div>
            ))}
    </div>
    </>
    );
};


export default LibroCarritoList;
*/}
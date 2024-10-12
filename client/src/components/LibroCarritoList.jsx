import LibroCarrito from './LibroCarrito';
const librosSimulados = [
    {
    id: 1,
    title: "Cien años de soledad",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ919f9HRwod-WikobZ1GbmxA7WDdXOBeehSP6C1U0hRlVdjVSI1wCHdQ2AjnDM-9go7j0&usqp=CAU",
    price: 15.99, 
    quantity: 1, 
    },
    {
    id: 2,
    title: "El amor en los tiempos del cólera",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNtOHlFQI6XGe8MZck5PMDhwEXpyf1odO9Q&s",
    price: 12.99,
    quantity: 2,
    },
    {
    id: 3,
    title: "1984",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXnK34Ff9WsOstGPGmtzQktAE0hxnnNV0ewWUeNQicjco2Y6ZUblEvbcUK1EftWqb7a3I&usqp=CAU",
    price: 10.99,
    quantity: 1,
        
}
];

const LibroCarritoList = () => {
    return (
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
                    {index < librosSimulados.length - 1 && <hr />} {/* Agregar línea excepto después del último libro */}
                </div>
            ))}
    </div>
    );
};

export default LibroCarritoList;

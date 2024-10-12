import LibroCarrito from './LibroCarrito';
const librosSimulados = [
    {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    description: "Una novela sobre la historia de la familia Buendía en Macondo.",
    imageUrl: "https://www.google.com/imgres?q=cien%20a%C3%B1os%20de%20soledad&imgurl=https%3A%2F%2Fwww.penguinlibros.com%2Far%2F1598957%2Fcien-anos-de-soledad.jpg&imgrefurl=https%3A%2F%2Fwww.penguinlibros.com%2Far%2Ftematicas%2F26314-ebook-cien-anos-de-soledad-9788439731764&docid=tGPxvXhJ0LbsIM&tbnid=39U1w5rV3cWsBM&vet=12ahUKEwiU_a-WzImJAxWfqpUCHZh4LskQM3oECDIQAA..i&w=450&h=768&hcb=2&ved=2ahUKEwiU_a-WzImJAxWfqpUCHZh4LskQM3oECDIQAA",
    price: 15.99, 
    quantity: 1, 
    },
    {
    id: 2,
    title: "El amor en los tiempos del cólera",
    author: "Gabriel García Márquez",
    description: "Una historia sobre el amor que perdura a lo largo de los años.",
    imageUrl: "https://books.google.com/books/about/El_amor_en_los_tiempos_del_c%C3%B3lera.html?id=WzNjBgAAQBAJ&printsec=frontcover&source=kp_read_button&hl=es&newbks=1&newbks_redir=1",
    price: 12.99,
    quantity: 2,
    },
    {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description: "Una novela distópica sobre un futuro totalitario.",
    imageUrl: "https://www.google.com/imgres?q=1984&imgurl=https%3A%2F%2Facdn.mitiendanube.com%2Fstores%2F001%2F029%2F689%2Fproducts%2F19841-039a8c5f61dee95ec316324958058653-1024-1024.png&imgrefurl=https%3A%2F%2Fwww.libreriasudestada.com.ar%2Fproductos%2F1984-george-orwell%2F&docid=0tlffQsS6LNvBM&tbnid=CjL20gsiowNVwM&vet=12ahUKEwj1qp7jzImJAxX7qpUCHZKNDNkQM3oECGUQAA..i&w=663&h=1024&hcb=2&ved=2ahUKEwj1qp7jzImJAxX7qpUCHZKNDNkQM3oECGUQAA",
    price: 10.99,
    quantity: 1,
        
}
];

const LibroCarritoList = () => {
    return (
    <div className="lista-libros">
        {librosSimulados.map((libro) => (
        <LibroCarrito key={libro.id} libro={libro} />
        ))}
    </div>
    );
};

export default LibroCarritoList;

import CardLibro from "./CardLibro";

const libros = [
    {
      title: 'Alas de Sangre',
      author: 'Rebecca Yarros',
      price: '12.99',
      imageUrl: 'https://cdn.kobo.com/book-images/Images/9b675ece-dde6-433b-9c01-78a920f155d2/500/500/False/image.jpg',
    }
  ];

const CardLibroList = () => {
    return (
        <div className="CardLibroList">
          {libros.map((libro, id) => (
            <CardLibro
              key={id}
              title={libro.title}
              author={libro.author}
              price={libro.price}
              imageUrl={libro.imageUrl}
            />
          ))}
        </div>
      );
    };

    export default CardLibroList
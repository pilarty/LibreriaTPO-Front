const CardLibro = ({ titulo, autor, precio, imageUrl }) => {
    return (
      <div className="card">
        <img src={imageUrl} alt={title} className="card-image" />
        <h3 className="card-titulo">{titulo}</h3>
        <p className="card-autor">{autor}</p>
        <p className="card-precio">${precio} / lb</p>
      </div>
    );
  };

  export default CardLibro
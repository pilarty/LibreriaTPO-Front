import "../views/Homepage.css"

  const CardLibro = ({image, titulo, precio}) => {

    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';

    return (
      <div className="homepage-libro">
        <img className="homepage-libro-img" src={imageSrc} alt="Imagen" />
        <div className="homepage-libro-text">{titulo}</div>
        <div className="homepage-libro-precio">${precio}</div>
        
      </div>
    );
  };

  export default CardLibro
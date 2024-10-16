import "../views/Homepage.css"
import Alas from '../assets/Alas de sangre.png'

  const CardLibro = ({image, titulo, precio}) => {

    const imageSrc = image ? `data:image/jpeg;base64,${image}` : 'default-image-path.jpg';

    return (
      <div className="libro">
        <img className="libro-img" src={imageSrc} alt="Imagen" />
        <div className="libro-text">{titulo}</div>
        <div className="libro-precio">${precio}</div>
        
      </div>
    );
  };

  export default CardLibro
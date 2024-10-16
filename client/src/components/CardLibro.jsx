import "../views/Homepage.css"
import Alas from '../assets/Alas de sangre.png'

  const CardLibro = (titulo, precio) => {
    return (
      <div className="libro">
        <img className="libro-img" src={Alas} alt="Imagen" />
        <div className="libro-text">{titulo}</div>
        <div className="libro-precio">${precio}</div>
        
      </div>
    );
  };

  export default CardLibro
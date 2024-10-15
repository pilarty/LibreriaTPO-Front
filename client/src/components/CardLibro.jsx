import "../views/Homepage.css"
import Alas from '../assets/Alas de sangre.png'

const CardLibro = () => {
    return (
      <div className="libro">
        <img className="libro-img" src={Alas} alt="Imagen" />
        <div className="libro-text">Alas de Sangre</div>
        <div className="libro-precio">$12.99</div>
        
      </div>
    );
  };

  export default CardLibro
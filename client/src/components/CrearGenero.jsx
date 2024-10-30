import { useState} from 'react';
import "../views/PublicarLibro.css";

const CrearGenero = ({ onClose, onSubmit }) => {
    const [nuevoGenero, setNuevoGenero] = useState("");
  
    const manejarSubmit = () => {
      onSubmit(nuevoGenero);
      onClose();
    };
  
    return (
      <div className="PublicarLibro-popup-overlay">
        <div className="PublicarLibro-popup-content">
          <h2>Crear nuevo género</h2>
          <input
            type="text"
            className="PublicarLibro-input-popup"
            placeholder="Nuevo género..."
            value={nuevoGenero}
            onChange={(e) => setNuevoGenero(e.target.value)}
          />
          <div className="PublicarLibro-popup-buttons">
            <button className='PublicarLibro-boton-cancelarGenero' onClick={onClose}>Cancelar</button>
            <button className='PublicarLibro-boton-crearGenero' onClick={manejarSubmit}>Crear</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CrearGenero;
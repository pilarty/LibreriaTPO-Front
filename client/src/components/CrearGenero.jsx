import { useState} from 'react';
import "../views/PublicarLibro.css";

const CrearGenero = ({ onClose, onSubmit }) => {
    const [nuevoGenero, setNuevoGenero] = useState("");
  
    const manejarSubmit = () => {
      onSubmit(nuevoGenero);
      onClose();
    };
  
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Crear nuevo género</h2>
          <input
            type="text"
            className="input-popup"
            placeholder="Nuevo género..."
            value={nuevoGenero}
            onChange={(e) => setNuevoGenero(e.target.value)}
          />
          <div className="popup-buttons">
            <button className='boton-cancelarGenero' onClick={onClose}>Cancelar</button>
            <button className='boton-crearGenero' onClick={manejarSubmit}>Crear</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CrearGenero;
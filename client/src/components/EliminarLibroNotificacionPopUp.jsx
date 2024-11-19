import React from 'react';
import "../views/AdministrarLibros.css";

const EliminarLibroNotificacionPopUp = ({ mensaje, onClose }) => {
    return (
        <div className="AdministrarLibros-popup-overlay">
            <div className="AdministrarLibros-popup-content">
                <p>{mensaje}</p>
                <button onClick={onClose} className="AdministrarLibros-popup-button close">Cerrar</button>
            </div>
        </div>
    );
};

export default EliminarLibroNotificacionPopUp;

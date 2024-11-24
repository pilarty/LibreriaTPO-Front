import React from 'react';
import "../views/AdministrarLibros.css";

const EliminarLibroConfirmacionPopUp = ({ mensaje, onConfirm, onCancel }) => {
    return (
        <div className="AdministrarLibros-popup-overlay">
            <div className="AdministrarLibros-popup-content">
                <p className='AdministrarLibros-popup-text'>{mensaje}</p>
                <div className="AdministrarLibros-popup-buttons">
                    <button onClick={onConfirm} className="AdministrarLibros-popup-button confirm">Eliminar</button>
                    <button onClick={onCancel} className="AdministrarLibros-popup-button cancel">Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EliminarLibroConfirmacionPopUp;

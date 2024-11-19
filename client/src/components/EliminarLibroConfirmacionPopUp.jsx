import React from 'react';
import "../views/AdministrarLibros.css";

const EliminarLibroConfirmacionPopUp = ({ mensaje, onConfirm, onCancel }) => {
    return (
        <div className="AdministrarLibros-popup-overlay">
            <div className="AdministrarLibros-popup-content">
                <p>{mensaje}</p>
                <div className="AdministrarLibros-popup-buttons">
                    <button onClick={onConfirm} className="AdministrarLibros-popup-button confirm">Confirmar</button>
                    <button onClick={onCancel} className="AdministrarLibros-popup-button cancel">Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EliminarLibroConfirmacionPopUp;

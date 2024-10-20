// LibroCard.jsx
import React from 'react';
import './LibroCard.css';

const LibroCard = () => {
  return (
    <div className="libro-container">
      <div className="libro-imagen-placeholder">
        {/* Aquí puedes poner la imagen del libro si está disponible */}
      </div>
      <div className="libro-detalles">
        <h2>LA MUJER MEDICINA. EL ORÁCULO</h2>
        <p className="precio">$50</p>
        <button className="boton-agregar">Agregar al carrito</button>
        <div className="libro-info">
          <h3>CATHERINE MAILLARD</h3>
          <p>
            El oráculo de la Mujer Medicina proporciona las claves para
            reconectarse con la sabiduría atávica de las mujeres, sanar las
            heridas y abrirse al empoderamiento femenino.
          </p>
          <p>
            <strong>Editorial:</strong> Editorial Sirio<br />
            <strong>Año:</strong> 2024<br />
            <strong>Idioma:</strong> Español<br />
            <strong>Páginas:</strong> 256<br />
            <strong>ISBN13:</strong> 9788499865650<br />
            <strong>Géneros:</strong> Animismo, chamanismo, paganismo, druidismo
          </p>
        </div>
      </div>
    </div>
  );
};

export default LibroCard;
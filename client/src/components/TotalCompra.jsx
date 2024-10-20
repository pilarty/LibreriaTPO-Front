
import React from 'react';

const Totales = ({ totalSinDescuento, totalFinal }) => (
    <div>
        <p>
            Total sin descuento <span>${totalSinDescuento.toFixed(2)}</span>
        </p>
        <p>
            Total final <span>${totalFinal.toFixed(2)}</span>
        </p>
    </div>
);

export default Totales;


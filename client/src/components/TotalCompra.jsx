
const TotalCompra = ({ totalSinDescuento, totalFinal }) => {
    return(
        <div>
            <div>
            Total sin descuento ${totalSinDescuento.toFixed(2)}
            </div>
            <div>
            Total final ${totalFinal.toFixed(2)}
            </div>
        </div>
    );
};

export default TotalCompra;


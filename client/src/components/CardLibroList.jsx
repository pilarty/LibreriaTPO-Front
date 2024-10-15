import CardLibro from "./CardLibro";
import "../views/Homepage.css"

const CardLibroList = () => {
    return (
       <div className="lista-libros">
          <CardLibro></CardLibro>
          <CardLibro></CardLibro>
          <CardLibro></CardLibro>
       </div>
      );
    };

    export default CardLibroList
import "../views/PublicarLibro.css"
import CrearGenero from "./CrearGenero";
import { useEffect, useState } from 'react';

const MenuDesplegableGeneros = ({ onGeneroSeleccionado }) => {

    const [posts, setPost] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const generosUnicos = [...new Set(posts.map((post) => post.genero))];

    const seleccionarGenero = (genero) => {
      onGeneroSeleccionado(genero);
    }

    const manejarCrearGenero = (nuevoGenero) => {
        fetch("http://localhost:4002/generos", {
          method: 'post',
          headers: {
            //'Authorization': 'Bearer ${token}'
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({nombre: nuevoGenero})
        })
      console.log("Nuevo género creado:", nuevoGenero);
      }




    useEffect(() => {
      fetch("http://localhost:4002/libros")
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setPost(data.content);
        })
        .catch((error) => {
          console.error("Error al obtener los datos: ", error)
        })
    }, []);

    return (
        <div className="menu-generos">
          <ul>
            {generosUnicos.map((genero, index) => (
              <li key={index}>
                <button onClick={() => seleccionarGenero(genero)}>
                  {genero}
                </button>
              </li>
            ))}
            <hr className="linea-divisora" />
            <button onClick={() => setPopupVisible(true)}>Crear nuevo genero </button>
      </ul>
      {popupVisible && (
        <CrearGenero 
          onClose={() => setPopupVisible(false)} 
          onSubmit={manejarCrearGenero} 
        />
      )}
    </div>
    )
}

export default MenuDesplegableGeneros
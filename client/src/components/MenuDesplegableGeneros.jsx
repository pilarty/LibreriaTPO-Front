import "../views/PublicarLibro.css"
import CrearGenero from "./CrearGenero";
import { useEffect, useState } from 'react';

const MenuDesplegableGeneros = ({ onGeneroSeleccionado }) => {

    const [posts, setPost] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);

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
        .then(response => response.json())
        .then(data => {
          console.log("Nuevo género creado:", data);
          obtenerGeneros();
        })
      }

     const obtenerGeneros = ()=> {
        fetch("http://localhost:4002/generos")
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setPost(data.content);
          })
          .catch((error) => {
            console.error("Error al obtener los datos: ", error)
          })
      };

      useEffect(() => {
        obtenerGeneros();
      }, []);

    return (
        <div className="menu-generos">
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <button onClick={() => seleccionarGenero(post.nombre)}>
                  {post.nombre}
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
import "../views/PublicarLibro.css"
import CrearGenero from "./CrearGenero";
import { useEffect, useState } from 'react';

const MenuDesplegableGeneros = ({ onGeneroSeleccionado }) => {

    
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
        })
      }

    const [posts, setPost] = useState([]);

    useEffect(() => {
      fetch("http://localhost:4002/generos")
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setPost(data.content);
        })
        .catch((error) => {
          console.error("Error al obtener los datos: ", error)
        })
    }, [posts]);

    return (
      <div>
        <div className="PublicarLibro-menu-generos">
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <button onClick={() => seleccionarGenero(post.nombre)}>
                  {post.nombre}
                </button>
              </li>
            ))}
            <hr className="PublicarLibro-linea-divisora" />
            <button onClick={() => setPopupVisible(true)}>Crear nuevo genero </button>
          </ul>
        </div>
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
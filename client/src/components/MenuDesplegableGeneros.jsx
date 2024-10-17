import "../views/PublicarLibro.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';

const MenuDesplegableGeneros = () => {

    const [posts, setPost] = useState([]);

    const generosUnicos = [...new Set(posts.map((post) => post.genero))];

    const manejarGeneros = () => {
      //ToDo
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
              <button >
                <li key={index}>
                    <Link to={`/Libros?genero=${genero}`}>{genero}</Link>
                </li>
                </button>
            ))}
      </ul>
    </div>
    )
}

export default MenuDesplegableGeneros
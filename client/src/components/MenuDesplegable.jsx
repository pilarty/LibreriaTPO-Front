import "../views/Homepage.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';

const MenuDesplegable = () => {

    const [posts, setPost] = useState([]);

    const [esAdmin, setEsAdmin] = useState(true);

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
    }, []);

    return (
        <div className="menu-hamburguesa">
          <ul>
            {posts.map((post) =>(
                <li key={index}>
                    <Link to={`/Libros`}>{post.nombre}</Link>
                </li>
            ))}
            {esAdmin && (
              <>
                <hr className="linea-divisora" />
                <li>
                  <Link to="/publicarLibro">Publicar Libro</Link>
                </li>
              </>
            )}
      </ul>
    </div>
    )
}

export default MenuDesplegable
import "../views/Homepage.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';

const MenuDesplegable = () => {

    const [posts, setPost] = useState([]);

    const generosUnicos = [...new Set(posts.map((post) => post.genero))];

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
        <div className="menu-hamburguesa">
          <ul>
            {generosUnicos.map((genero, index) => (
                <li key={index}>
                    <Link to={`/Libros?genero=${genero}`}>{genero}</Link>
                </li>
            ))}
      </ul>
    </div>
    )
}

export default MenuDesplegable
import "../views/Homepage.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';

const MenuDesplegable = () => {

    const [posts, setPost] = useState([]);

    const [esAdmin, setEsAdmin] = useState(true);

    //const emailUsuario = sessionStorage.getItem('userEmail'); DESCOMENTARLO
    const emailUsuario = "csalemme@uade.edu.ar"
    useEffect(() => {
      fetch(`http://localhost:4002/usuarios/mail/${emailUsuario}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data.role === "ADMIN") {
            setEsAdmin(true); 
          } else {
            setEsAdmin(false); 
          }
        })
        .catch((error) => {
          console.error("Error al obtener los datos: ", error)
        })
  } , []);


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
                <li key={post.id}>
                    <Link to={`/ListaLibros/${post.id}`}>{post.nombre}</Link>
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
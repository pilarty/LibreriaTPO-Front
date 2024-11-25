import "../views/Homepage.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { getAllGeneros } from "../Redux/generosSlice";
import { getUsuario } from "../Redux/usuariosSlice";
import LoadingSpinner from './LoadingSpinner';

const MenuDesplegable = () => {
    const [esAdmin, setEsAdmin] = useState(false);
    const navigate = useNavigate();

    const emailUsuario = sessionStorage.getItem('mail');
  
  const dispatch = useDispatch();
  const { items: users, loadingUsers, errorUsers, usuario} = useSelector((state) => state.usuarios);
  const { items: posts, loading, error, genero } = useSelector((state) => state.generos);
  console.log(posts)

  useEffect(() => {
    dispatch(getUsuario(emailUsuario))
      .unwrap()
      .then((data) => {
        console.log(data);
        setEsAdmin(data.role === "ADMIN");
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario: ", error);
      });
  }, [dispatch, emailUsuario]);

  useEffect(() => {
    dispatch(getAllGeneros());
  }, [dispatch]);

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('mail');
    navigate('/LoginPage');
  };

  if (loading || posts.length === 0) return <p><LoadingSpinner></LoadingSpinner></p>;
  if (error) return <p>Errro al cargar los generos: {error}</p>

return (
  <div className="menu-hamburguesa">
      {posts.content.length <= 5 && (
        <ul className="menu-section">
          <h3>Géneros</h3>
          {posts.content.map((post) => (
            <li key={post.id}>
              <Link to={`/ListaLibros/${post.id}`}>{post.nombre}</Link>
            </li>
          ))}
        </ul>
      )}
      {posts.content.length > 5 && (
        <div className="menu-div">
          <ul className="menu-section">
            <h3>Géneros</h3>
            {posts.content.slice(0, Math.ceil(posts.content.length / 2)).map((post) => (
              <li key={post.id}>
                <Link to={`/ListaLibros/${post.id}`}>{post.nombre}</Link>
              </li>
            ))}
          </ul>
          <ul className="menu-section second-column">
              {posts.content.slice(Math.ceil(posts.content.length / 2)).map((post) => (
                <li key={post.id}>
                  <Link to={`/ListaLibros/${post.id}`}>{post.nombre}</Link>
                </li>
              ))}
          </ul>
        </div>
        )}
    <ul className="menu-section">
      <h3>Otro</h3>
      <li>
        <Link to="/Giftcard">GiftCards</Link>
      </li>
      <li>
        <Link to="/Favs">Favoritos</Link>
      </li>
      <li>
        <a onClick={handleLogout} className="cerrar-link">
          Cerrar sesión
        </a>
      </li>
    </ul>
    {esAdmin && (
      <ul className="menu-section">
        <h3>Admin</h3>
        <li>
          <Link to="/publicarLibro">Publicar Libro</Link>
        </li>
        <li>
          <Link to="/administrarLibros">Administrar Libros</Link>
        </li>
        <li>
          <Link to="/verOrdenes">Ver Ordenes</Link>
        </li>
      </ul>
    )}
  </div>
);
}
export default MenuDesplegable
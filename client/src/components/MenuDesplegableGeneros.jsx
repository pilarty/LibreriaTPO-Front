import "../views/PublicarLibro.css"
import CrearGenero from "./CrearGenero";
import { useEffect, useState } from 'react';
import { createGenero, getAllGeneros } from "../Redux/generosSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from './LoadingSpinner';

const MenuDesplegableGeneros = ({ onGeneroSeleccionado }) => {

    
    const [popupVisible, setPopupVisible] = useState(false);

    const seleccionarGenero = (genero) => {
      onGeneroSeleccionado(genero);
    }

    const manejarCrearGenero = (nuevoGenero) => {
      dispatch(createGenero({ nombre: nuevoGenero }))
        .unwrap()
        .then((data) => {
          console.log("Nuevo género creado:", data);
        })
        .catch((error) => {
          console.error("Error al crear género:", error);
        });
    };

    const dispatch = useDispatch();
    const { items: posts, loading, error } = useSelector((state) => state.generos);
    
    useEffect(() => {
      dispatch(getAllGeneros());
    }, [dispatch]);

    if (loading || posts.length === 0) return <LoadingSpinner></LoadingSpinner>;
    if (error) return <p>Error al cargar géneros: {error}</p>;

    return (
      <div>
        <div className="PublicarLibro-menu-generos">
          <ul>
            {posts.content.map((post) => (
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

import "../views/PublicarLibro.css";
import "../views/App.css";
import { useNavigate } from 'react-router-dom';
import MenuDesplegableGeneros from "../components/MenuDesplegableGeneros";
import { useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import { postImagen } from "../Redux/imagenesSlice";
import { getIdByNombre } from "../Redux/generosSlice";
import { putLibro } from "../Redux/librosSlice";
import { useParams } from 'react-router-dom';

const EditarLibroFormulario = ({currentISBN, currentTitulo, currentSinopsis, currentEditorial, currentEdicion, currentIdioma, currentPaginas, currentAutor, currentStock, currentPrecio, currentImagen, currentNovedad, currentRecomendado}) => {
    const navigate = useNavigate();
    const generosRef = useRef(null);
    const buttonGenerosRef = useRef(null);
    const imagenRef = useRef(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuGenerosVisible, setMenuGenerosVisible] = useState(false);
    const [generoSeleccionado, setGeneroSeleccionado] = useState("Genero...");
    const [titulop, setTitulo] = useState(currentTitulo)
    const [descripcionp, setDescripcion] = useState(currentSinopsis)
    const [editorialp, setEditorial] = useState(currentEditorial)
    const [edicionp, setEdicion] = useState(currentEdicion)
    const [idiomap, setIdioma] = useState(currentIdioma)
    const [numPaginasp, setNumPaginas] = useState(currentPaginas);
    const [isbnp, setIsbn] = useState(currentISBN);
    const [autorp, setAutor] = useState(currentAutor);
    const [stockp, setStock] = useState(currentStock);
    const [preciop, setPrecio] = useState(currentPrecio);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(currentImagen);
    const [publicacionLista, setPublicacionLista] = useState(false);
    const [libroNuevo, setLibroNuevo] = useState(null);
    const [esRecomendado, setEsRecomendado] = useState(currentRecomendado);
    const [esNovedad, setEsNovedad] = useState(currentNovedad);

      const handleAutorChange = (e) => {          //Revisar
        const autores = e.target.value.split(',').map(autor => autor.trim());
        setAutor(autores);
      };

      const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagenSeleccionada(file);
        }
      };

      const manejarGeneros = () => {
        setMenuGenerosVisible(!menuGenerosVisible);
      }

      const manejarPublicar = async () => {
        const generoIdp = await dispatch(getIdByNombre(generoSeleccionado))
          .unwrap()
          .then((data) => data);
        const libroData= {
          isbn: isbnp,
          titulo: titulop,
          precio: preciop,
          cantPaginas: numPaginasp,
          descripcion: descripcionp,
          stock: stockp,
          editorial: editorialp,
          edicion: edicionp,
          idioma: idiomap,
          generoId: generoIdp,
          autor: autorp,
          recomendado: esRecomendado,
          novedad: esNovedad
        }
        setLibroNuevo(libroData)
        setPublicacionLista(true)
        console.log(libroNuevo)
      }
        
      const dispatch = useDispatch()
      const {items, loading, error, libro} = useSelector((state)=> state.libros)

      useEffect(()=>{
        if (publicacionLista){
          dispatch(createLibros(libroNuevo))
          .unwrap()
          .then(async (data) => {
            console.log("Libro creado:", data);
            const formData = new FormData();
            formData.append("name", titulop);
            formData.append("isbn", isbnp);
            formData.append("file", imagenSeleccionada);
            await dispatch(postImagen(formData)).unwrap();
            alert("Libro publicado exitosamente");
            //navigate('/');
          })
        setLibroNuevo(null)
        setPublicacionLista(false)
        }
      }, [publicacionLista, dispatch])

      if (error) return <p>Error al cargar las publicaciones: {error}</p>

      return (
        <div>
          <div className="PublicarLibro-contenedor">
            <div className="PublicarLibro-book-image" onClick={() => imagenRef.current.click()}> 
              <img src={imagenSeleccionada ? URL.createObjectURL(imagenSeleccionada) : "ruta_a_la_imagen"} alt="imagen" />
            </div>
            <input
              type="file"
              className="PublicarLibro-input-field"
              accept="image/*"
              onChange={handleImagenChange}
              ref={imagenRef} 
              style={{ display: 'none' }}
            />
    
            <div className="PublicarLibro-book-detalles">
              <label className="PublicarLibro-label">Título:</label>
              <input
                type="text"
                className="PublicarLibro-input-field"
                placeholder="Título..."
                value={titulop}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <label className="PublicarLibro-label">Sinopsis:</label>
              <textarea
                className="PublicarLibro-textarea-field"
                placeholder="Sinopsis..."
                value={descripcionp}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <label className="PublicarLibro-label">Editorial:</label>
              <input
                type="text"
                className="PublicarLibro-input-field"
                placeholder="Editorial..."
                value={editorialp}
                onChange={(e) => setEditorial(e.target.value)}
              />
              <label className="PublicarLibro-label">Edición:</label>
              <input
                type="number"
                className="PublicarLibro-input-field"
                placeholder="Edición..."
                value={edicionp}
                onChange={(e) => setEdicion(e.target.value)}
              />
              <label className="PublicarLibro-label">Idioma:</label>
              <input
                type="text"
                className="PublicarLibro-input-field"
                placeholder="Idioma..."
                value={idiomap}
                onChange={(e) => setIdioma(e.target.value)}
              />
              <label className="PublicarLibro-label">N° páginas:</label>
              <input
                type="number"
                className="PublicarLibro-input-field"
                placeholder="N° páginas..."
                value={numPaginasp}
                onChange={(e) => setNumPaginas(e.target.value)}
              />
              <label className="PublicarLibro-label">ISBN:</label>
              <input
                type="text"
                className="PublicarLibro-input-field"
                placeholder="ISBN..."
                value={isbnp}
                onChange={(e) => setIsbn(e.target.value)}
              />
              <label className="PublicarLibro-label">Género:</label>
              <button
                className="PublicarLibro-generos-field"
                onClick={manejarGeneros}
                ref={buttonGenerosRef}
              >
                {generoSeleccionado}
                <span className="PublicarLibro-arrow">▼</span>
              </button>
              <label className="PublicarLibro-label">Autor(es):</label>
              <input
                type="text"
                className="PublicarLibro-input-field"
                placeholder="Autor..."
                value={autorp.join(', ')}
                onChange={handleAutorChange}
              />
              <label className="PublicarLibro-label">Stock:</label>
              <input
                type="number"
                className="PublicarLibro-input-field"
                placeholder="Stock..."
                value={stockp}
                onChange={(e) => setStock(e.target.value)}
              />
              <label className="PublicarLibro-label">Precio:</label>
              <input
                type="number"
                className="PublicarLibro-input-field book-precio"
                placeholder="Precio..."
                value={preciop}
                onChange={(e) => setPrecio(e.target.value)}
              />
              <div className="PublicarLibro-checkboxes">
                <label>
                    <input
                        type="checkbox"
                        checked={esRecomendado}
                        onChange={(e) => setEsRecomendado(e.target.checked)}
                    />
                    Recomendado
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={esNovedad}
                        onChange={(e) => setEsNovedad(e.target.checked)}
                    />
                    Novedad
                </label>
              </div>
              <button className="PublicarLibro-boton-publicar" onClick={manejarPublicar}>
                Publicar
              </button>
            </div>
          </div>
    
          {menuGenerosVisible && (
            <div ref={generosRef}>
              <MenuDesplegableGeneros onGeneroSeleccionado={setGeneroSeleccionado} />
            </div>
          )}
        </div>
      );
    };

export default EditarLibroFormulario;
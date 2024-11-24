import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usuario.css';
import logo from '../assets/logo.png';
import userIMG from '../assets/userIMG.png';
import {useDispatch, useSelector} from "react-redux"
import { putUsuario } from "../Redux/usuariosSlice";
import { getUsuario } from "../Redux/usuariosSlice";
import { deleteUsuario } from "../Redux/usuariosSlice";
import LoadingSpinner from '../components/LoadingSpinner';

const Usuario = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    nombre_usuario: '',
    mail: '',
    contraseña: '',
    nombre: '',
    apellido: '',
    direccion: '',
    CP: 0,
  });
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState('');
  const [CP, setCp] = useState("");
  const [contraseña, setContraseña] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch() 

  const mail = sessionStorage.getItem('mail');

  useEffect(() => {
    if (!mail) {
      navigate('/LoginPage');
    }
  }, [mail, navigate]);

  // Fetch de datos del perfil previo a la edición
  const {items: items, loading, error, usuario} = useSelector((state)=> state.usuarios)
  console.log(usuario)

  useEffect(()=>{
    dispatch(getUsuario(mail))
    .unwrap()
    .then(async (data) => {
      setProfile(data);
    })
  }, [dispatch])

  if (loading || usuario === null) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <p>Error al cargar el usuario: {error}</p>

  // Función para cambiar a modo edición
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditProfile = async () => {
    try {
      const authResponse = await fetch('http://localhost:4002/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, contraseña }),
      });
  
      if (!authResponse.ok) {
        throw new Error('La contraseña es incorrecta. No se pueden guardar los cambios.');
      }
  
      const updateData = {
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        cp: parseInt(CP, 10),
      };
  
      await dispatch(putUsuario({ id: usuario.id, updatedUser: updateData })).unwrap();
      alert('Perfil actualizado exitosamente');
      navigate('/');
    } catch (error) {
      alert(error.message); 
      console.error('Error al actualizar el perfil:', error);
    }
  };
    
  // Eliminar Usuario
  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      dispatch(deleteUsuario(usuario.id))
        .unwrap()
        .then(() => {
          alert('Cuenta eliminada exitosamente');
          navigate('/');
        })
        .catch((error) => {
          alert('Error al eliminar la cuenta. Verifica tu contraseña.');
          console.error(error);
        });
    }
  };

  return (
    <div>
      <header className="usuario-header">
        <img src={logo} alt="Logo de The Golden Feather" className="usuario-logo-small" />
        <span className="usuario-logo-text">The Golden Feather</span>
      </header>

      <div className="usuario-profile">
        <img src={userIMG} alt="Foto de perfil" className="usuario-logo" />
        <h1 className="usuario-title">{'Hola ' + usuario.nombre + '!'}</h1>
      </div>

      <div className="usuario-form-wrapper">
        <div className="usuario-form">
          <input type="text" 
          className="usuario-input" 
          value={nombre} onChange={(e) => setNombre(e.target.value)} 
          placeholder="Nombre" />

          <input type="text" 
          className="usuario-input" 
          value={apellido} onChange={(e) => setApellido(e.target.value)} 
          placeholder="Apellido" />

          <input type="text" 
          className="usuario-input" 
          value={direccion} onChange={(e) => setDireccion(e.target.value)} 
          placeholder="Dirección" />
          
          <input type="number" 
          className="usuario-input" 
          value={CP} onChange={(e) => setCp(e.target.value)} 
          placeholder="Código Postal" />
          
          <input type="password" 
          className="usuario-input" 
          value={contraseña} onChange={(e) => setContraseña(e.target.value)} 
          placeholder="Contraseña" />
        </div>

        {/* Boton para activar modo edición */}
        {!isEditing && (
          <button onClick={handleEditClick} className="usuario-saveButton">Editar</button>
        )}

        {/* Botones de Guardar y Eliminar */}
        {isEditing && (
          <div className="usuario-buttons">
            <button onClick={handleEditProfile} className="usuario-saveButton">Guardar</button>
            <button onClick={handleDeleteAccount} className="usuario-deleteButton">Eliminar cuenta</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuario;

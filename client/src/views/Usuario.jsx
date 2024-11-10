import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usuario.css';
import logo from '../assets/logo.png';
import userIMG from '../assets/userIMG.png';
import {useDispatch, useSelector} from "react-redux"
import { putUsuario } from "../Redux/usuariosSlice";

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
  const [nombre, setNombre] = useState(profile.nombre);
  const [apellido, setApellido] = useState(profile.apellido);
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
  useEffect(() => {
    if (mail) {
      fetch(`http://localhost:4002/usuarios/mail/${mail}`)
        .then(response => response.json())
        .then(data => {
          console.log('Datos recibidos del GET:', data);
          setProfile(data);
        })
        .catch(error => console.error('Error al obtener el perfil:', error));
    }
  }, [mail]);

  // Función para cambiar a modo edición
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Editar usuario
  const handleEditProfile = async () => {
      const updateData = {
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        cp: parseInt(CP, 10),
      };
      console.log(updateData)
      try {
        await dispatch(putUsuario({ id: profile.id, updatedUser: updateData })).unwrap();
        alert('Perfil actualizado exitosamente');
        navigate('/');
      } catch (error) {
        alert('Hubo un error al actualizar el perfil. Inténtalo nuevamente.');
        console.error('Error al actualizar el perfil:', error);
      }
    }
    
  // Eliminar Usuario
  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      fetch(`http://localhost:4002/usuarios/${profile.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contraseña }),
      }).then(response => {
        if (response.ok) {
          alert('Cuenta eliminada exitosamente');
          navigate('/');
        } else {
          alert('Error al eliminar la cuenta. Verifica tu contraseña.');
        }
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
        <h1 className="usuario-title">{'Hola ' + profile.nombre + '!'}</h1>
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

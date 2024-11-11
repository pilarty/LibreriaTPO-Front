import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usuario.css';
import logo from '../assets/logo.png';
import userIMG from '../assets/userIMG.png';

const Usuario = () => {
  const navigate = useNavigate();
  
  // estado inicial del perfil
  const [profile, setProfile] = useState({
    nombre_usuario: '',
    mail: '',
    contraseña: '',
    nombre: '',
    apellido: '',
    direccion: '',
    CP: 0,
  });

  // estados individuales inicializados con los valores del perfil
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [CP, setCp] = useState(0);
  const [contraseña, setContraseña] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const mail = sessionStorage.getItem('mail');

  //redirigir si no hay mail
  useEffect(() => {
    if (!mail) {
      navigate('/LoginPage');
    }
  }, [mail, navigate]);

  //obtener y establecer los datos del perfil
  useEffect(() => {
    if (mail) {
      fetch(`http://localhost:4002/usuarios/mail/${mail}`)
        .then(response => response.json())
        .then(data => {
          console.log('Datos recibidos del GET:', data);
          setProfile(data);
          // actualizar los estados individuales con los datos recibidos
          setNombre(data.nombre || '');
          setApellido(data.apellido || '');
          setDireccion(data.direccion || '');
          setCp(data.CP || 0);
        })
        .catch(error => console.error('Error al obtener el perfil:', error));
    }
  }, [mail]);

 //editar usuario
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditProfile = async () => {
    try {
      const updateData = {
        nombre: nombre,
        apellido: apellido,
        mail: profile.mail,
        contraseña: contraseña,
        direccion: direccion,
        CP: CP,
        role: 'USUARIO'
      };

      const response = await fetch(`http://localhost:4002/usuarios/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        alert('Perfil actualizado exitosamente');
        navigate('/');
      } else {
        alert('Hubo un error al actualizar el perfil. Inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error completo:', error);
      alert('Ocurrió un error al intentar actualizar el perfil.');
    }
  };

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
          
          <input type="text" 
          className="usuario-input" 
          value={CP} onChange={(e) => setCp(e.target.value)} 
          placeholder="Código Postal" />
          
          {isEditing && (
          <input type="password" 
          className="usuario-input" 
          value={contraseña} onChange={(e) => setContraseña(e.target.value)} 
          placeholder="Contraseña" />
          )}
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

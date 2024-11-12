import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usuario.css';
import logo from '../assets/logo.png';
import userIMG from '../assets/userIMG.png';

const Usuario = () => {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    nombre_usuario: '',
    mail: '',
    contraseña: '',
    nombre: '',
    apellido: '',
    direccion: '',
    cp: 0, 
  });

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cp, setCp] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const mail = sessionStorage.getItem('mail');

  useEffect(() => {
    if (!mail) {
      navigate('/LoginPage');
    }
  }, [mail, navigate]);

// obtengo los datos
  useEffect(() => {
    if (mail) {
      fetch(`http://localhost:4002/usuarios/mail/${mail}`)
        .then(response => response.json())
        .then(data => {
          console.log('Datos recibidos del GET:', data);
          setProfile(data);
          setNombre(data.nombre || '');
          setApellido(data.apellido || '');
          setDireccion(data.direccion || '');
          setCp(data.cp ? data.cp.toString() : '');
        })
        .catch(error => console.error('Error al obtener el perfil:', error));
    }
  }, [mail]);

  const handleCpChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCp(value);
    }
  };
//cambio en la pag para editar
  const handleEditClick = () => {
    setIsEditing(true);
  };
// put para editar los datoss
  const handleEditProfile = async () => {
    try {
      const updateData = {
        nombre,
        apellido,
        mail: profile.mail,
        contraseña,
        direccion,
        cp: parseInt(cp) || 0, 
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
        setProfile({ ...profile, cp: parseInt(cp) || 0 }); 
        navigate('/');
      } else {
        alert('Hubo un error al actualizar el perfil. Inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error completo:', error);
      alert('Ocurrió un error al intentar actualizar el perfil.');
    }
  };
// eliminar tengo q ponerle la condicion bien
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
          value={cp} onChange={handleCpChange} 
          placeholder="Código Postal" />
          
          {isEditing && (
          <input type="password" 
          className="usuario-input" 
          value={contraseña} onChange={(e) => setContraseña(e.target.value)} 
          placeholder="Contraseña" />
          )}
        </div>

        {!isEditing && (
          <button onClick={handleEditClick} className="usuario-saveButton">Editar</button>
        )}

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

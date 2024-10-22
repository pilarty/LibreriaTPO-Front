import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usuario.css'; 

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    nombre_usuario: '',
    mail: '',
    contraseña: '',
    nombre: '',
    apellido: '',
    direccion: '',
    CP: '',
  });
  const [contraseña, setContraseña] = useState('');

  const mail = sessionStorage.getItem('mail');
  console.log('Valor de mail:', mail);


  // Fetch de datos del perfil previo a la edicion
  useEffect(() => {
    const mail = sessionStorage.getItem('mail');
    fetch(`http://localhost:4002/usuarios/mail/${mail}`)
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos del GET:', data); // Para ver la estructura exacta
        setProfile(data); 
      })
      .catch(error => console.error('Error al obtener el perfil:', error));
  }, [mail]);

  const handleEditProfile = async () => {
    try {
      
      const updateData = {
        ...profile,
        nombre: profile.nombre,
        apellido: profile.apellido,
        direccion: profile.direccion,
        CP: profile.CP
      };

      console.log('Datos a enviar en PUT:', updateData); // Para ver que  envio

      const response = await fetch(`http://localhost:4002/usuarios/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const responseText = await response.text(); 
      console.log('Respuesta completa:', responseText); 

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
    <div className="usuario-container">
      <div className="usuario-header">
        <img src="/logo.png" alt="Profile" className="usuario-profileImage" />
        <h1 className="usuario-title">{'Hola ' + profile.nombre+'!'}</h1>
        <h2 className="usuario-editTitle">Editar</h2>
      </div>

      <div>
        <input
          type="text"
          className = "usuario-input"
          value={profile.nombre}
          onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
          placeholder="Nombre"
        />
        <input
          type="text"
          value={profile.apellido}
          onChange={(e) => setProfile({ ...profile, apellido: e.target.value })}
          placeholder="Apellido"
          className = "usuario-input"
        />
        <input
          type="text"
          value={profile.direccion}
          onChange={(e) => setProfile({ ...profile, direccion: e.target.value })}
          placeholder="Dirección"
          className = "usuario-input"
        />
        <input
          type="text"
          value={profile.CP}
          onChange={(e) => setProfile({ ...profile, CP: e.target.value })}
          placeholder="Código Postal"
          className = "usuario-input"
        />

        <button onClick={handleEditProfile} className="usuario-saveButton">
          Guardar
        </button>
      </div>

      <div className="usuario-deleteSection">
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="Contraseña"
          className = "usuario-input"
        />
        <button onClick={handleDeleteAccount} className="usuario-deleteButton">
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

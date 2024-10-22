import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usuario.css'; 
import logo from '../assets/logo.png';

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
  const [CP, setCp] = useState(0);
  const [contraseña, setContraseña] = useState('');

  const mail = sessionStorage.getItem('mail');

  useEffect(() => {
      if (!mail) {
          navigate('/LoginPage'); 
      }
  }, [mail, navigate]);

  // Fetch de datos del perfil previo a la edicion
  useEffect(() => {
    if (mail) {
      fetch(`http://localhost:4002/usuarios/mail/${mail}`)
        .then(response => response.json())
        .then(data => {
          console.log('Datos recibidos del GET:', data); // Para ver la estructura exacta
          console.log(data.contraseña);
          setProfile(data); 
        })
        .catch(error => console.error('Error al obtener el perfil:', error));
    }
  }, [mail]);

  
  //editar usuario
  const handleEditProfile = async () => {
    
    try { 
      const updateData = {
        nombre: nombre,
        apellido: apellido,
        mail: profile.mail,
        contraseña: contraseña,
        direccion: direccion,
        CP:CP,
        role: 'USUARIO'
      };

      console.log('Datos a enviar en PUT:', updateData); // Para ver que  envio
      console.log('ID del perfil:', profile.id);

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
      <img src={logo} alt="Logo de The Golden Feather" className="usuario-logo" />
      <div className="usuario-header">
        <h1 className="usuario-title">{'Hola ' + profile.nombre+'!'}</h1>
        <h2 className="usuario-editTitle">Editar</h2>
      </div>

      <div>
        <input
          type="text"
          className = "usuario-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Apellido"
          className = "usuario-input"
        />
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value )}
          placeholder="Dirección"
          className = "usuario-input"
        />
        <input
          type="text"
          value={CP}
          onChange={(e) => setCp(e.target.value)}
          placeholder="Código Postal"
          className = "usuario-input"
        />
      </div>

      <div className="usuario-deleteSection">
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="Contraseña"
          className = "usuario-input"
        />
        <button onClick={handleEditProfile} className="usuario-saveButton">
          Guardar
        </button>
        <button onClick={handleDeleteAccount} className="usuario-deleteButton">
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
};

export default Usuario;


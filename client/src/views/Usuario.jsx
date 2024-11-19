import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usuario.css';
import logo from '../assets/logo.png';
import userIMG from '../assets/userIMG.png';
import { useDispatch, useSelector } from "react-redux";
import { putUsuario, getUsuario, deleteUsuario } from "../Redux/usuariosSlice";
import LoadingSpinner from '../components/LoadingSpinner';

const Usuario = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cp, setCp] = useState('');
  const [contraseña, setContraseña] = useState('');

  const mail = sessionStorage.getItem('mail');
  const usuario = useSelector(state => state.usuarios.usuario);
  const loading = useSelector(state => state.usuarios.loading);

  // Redirigir si no hay mail en sesión
  useEffect(() => {
    if (!mail) {
      navigate('/LoginPage');
    }
  }, [mail, navigate]);

  // Obtener datos del usuario
  useEffect(() => {
    if (mail) {
      dispatch(getUsuario(mail));
    }
  }, [dispatch, mail]);

  // Sincronizar datos del usuario con los estados locales
  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || '');
      setApellido(usuario.apellido || '');
      setDireccion(usuario.direccion || '');
      setCp(usuario.cp ? usuario.cp.toString() : '');
    }
  }, [usuario]);

  // Validar solo números en el código postal
  const handleCpChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCp(value);
    }
  };

  // Función reutilizable para autenticar al usuario
  const authenticateUser = async (mail, contraseña) => {
    try {
      const response = await fetch('http://localhost:4002/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, contraseña }),
      });

      if (!response.ok) {
        throw new Error('Contraseña incorrecta.');
      }

      const data = await response.json();
      return data.access_token; // Devuelve el token si es válido
    } catch (error) {
      throw new Error('Error de autenticación. Verifica tu contraseña.');
    }
  };

  // Guardar cambios del perfil
  const handleSave = async () => {
    if (!contraseña) {
      alert('Por favor, ingresa tu contraseña para guardar los cambios.');
      return;
    }

    try {
      // Autenticar usuario
      const token = await authenticateUser(mail, contraseña);

      // Crear datos actualizados
      const updatedUsuario = {
        ...usuario,
        nombre,
        apellido,
        direccion,
        cp: parseInt(cp) || 0,
      };

      // Enviar cambios a la base de datos
      const result = await dispatch(putUsuario(updatedUsuario)).unwrap();

      if (result.success) {
        alert('Perfil actualizado exitosamente.');
        setIsEditing(false);
        navigate('/');
      } else {
        throw new Error('Error al actualizar el perfil.');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Eliminar cuenta
  const handleDeleteAccount = async () => {
    if (!contraseña) {
      alert('Por favor, ingresa tu contraseña para eliminar tu cuenta.');
      return;
    }

    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      try {
        // Autenticar usuario
        const token = await authenticateUser(mail, contraseña);

        // Eliminar usuario
        const result = await dispatch(deleteUsuario(usuario.id)).unwrap();

        if (result.success) {
          alert('Cuenta eliminada exitosamente.');
          navigate('/LoginPage');
        } else {
          throw new Error('Error al eliminar la cuenta.');
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Mostrar spinner mientras se cargan los datos
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <header className="usuario-header">
        <img src={logo} alt="Logo de The Golden Feather" className="usuario-logo-small" />
        <span className="usuario-logo-text">The Golden Feather</span>
      </header>

      <div className="usuario-profile">
        <img src={userIMG} alt="Foto de perfil" className="usuario-logo" />
        <h1 className="usuario-title">{`Hola ${usuario?.nombre || 'Usuario'}!`}</h1>
      </div>

      <div className="usuario-form-wrapper">
        <div className="usuario-form">
          <input
            type="text"
            className="usuario-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            disabled={!isEditing}
          />
          <input
            type="text"
            className="usuario-input"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            disabled={!isEditing}
          />
          <input
            type="text"
            className="usuario-input"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Dirección"
            disabled={!isEditing}
          />
          <input
            type="text"
            className="usuario-input"
            value={cp}
            onChange={handleCpChange}
            placeholder="Código Postal"
            disabled={!isEditing}
          />
          {isEditing && (
            <input
              type="password"
              className="usuario-input"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Contraseña actual"
            />
          )}
        </div>

        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="usuario-saveButton">Editar</button>
        ) : (
          <div className="usuario-buttons">
            <button onClick={handleSave} className="usuario-saveButton">Guardar</button>
            <button onClick={handleDeleteAccount} className="usuario-deleteButton">Eliminar cuenta</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuario;

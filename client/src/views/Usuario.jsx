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

  // obtiene datos del usuario 
  useEffect(() => {
    if (mail) {
      dispatch(getUsuario(mail));
    }
  }, [dispatch, mail]);

  //estados locales con los datos del usuario
  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || '');
      setApellido(usuario.apellido || '');
      setDireccion(usuario.direccion || '');
      setCp(usuario.cp ? usuario.cp.toString() : '');
    }
  }, [usuario]);


  const handleCpChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { 
      setCp(value);
    }
  };

  // Habilitar modo edición
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Guardar cambios del perfil
  const handleSave = async () => {
    const updatedUsuario = {
      ...usuario,
      nombre,
      apellido,
      direccion,
      cp: parseInt(cp) || 0,
      contraseña: contraseña || usuario.contraseña,
    };

    await dispatch(putUsuario(updatedUsuario));
    setIsEditing(false);
    alert("Perfil actualizado exitosamente");
    navigate('/');
  };

  // Eliminar cuenta
  const handleDeleteAccount = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      await dispatch(deleteUsuario(usuario.id));
      alert('Cuenta eliminada exitosamente');
      navigate('/'); // Redirigir después de eliminar
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
        <h1 className="usuario-title">{'Hola ' + (usuario?.nombre || 'Usuario') + '!'}</h1>
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
              placeholder="Nueva Contraseña"
            />
          )}
        </div>

        {!isEditing ? (
          <button onClick={handleEditClick} className="usuario-saveButton">Editar</button>
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

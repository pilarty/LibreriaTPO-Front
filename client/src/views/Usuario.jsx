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
  
  // Initialize form state with empty values
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState('');
  const [CP, setCp] = useState("");
  const [contraseña, setContraseña] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const mail = sessionStorage.getItem('mail');

  useEffect(() => {
    if (!mail) {
      navigate('/LoginPage');
    }
  }, [mail, navigate]);

  const {items: items, loading, error, usuario} = useSelector((state)=> state.usuarios);

  // Fetch user data and populate form fields
  useEffect(() => {
    dispatch(getUsuario(mail))
      .unwrap()
      .then((data) => {
        setProfile(data);
        // Populate form fields with existing data
        setNombre(data.nombre || '');
        setApellido(data.apellido || '');
        setDireccion(data.direccion || '');
        // Explicitly convert CP to string, handling 0 and null cases
        setCp(data.CP ? data.CP.toString() : '');
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [dispatch, mail]);

  if (loading || usuario === null) return <LoadingSpinner />;
  if (error) return <p>Error al cargar el usuario: {error}</p>;

  const handleEditClick = () => {
    // When entering edit mode, populate fields with current values
    setNombre(usuario.nombre || '');
    setApellido(usuario.apellido || '');
    setDireccion(usuario.direccion || '');
    // Explicitly convert CP to string, handling 0 and null cases
    setCp(usuario.CP ? usuario.CP.toString() : '');
    setIsEditing(true);
  };

  const handleEditProfile = async () => {
    const updateData = {
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      // Only convert to integer if CP has a value
      cp: CP ? parseInt(CP, 10) : null,
    };
    
    try {
      await dispatch(putUsuario({ id: usuario.id, updatedUser: updateData })).unwrap();
      alert('Perfil actualizado exitosamente');
      setIsEditing(false); // Return to view mode
      // Refresh user data after update
      dispatch(getUsuario(mail));
      navigate('/');
    } catch (error) {
      alert('Hubo un error al actualizar el perfil. Inténtalo nuevamente.');
      console.error('Error al actualizar el perfil:', error);
    }
  };

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
            type="number" 
            className="usuario-input" 
            value={CP}
            onChange={(e) => setCp(e.target.value)} 
            placeholder="Código Postal"
            disabled={!isEditing}
          />
          {isEditing && (
          <input 
            type="password" 
            className="usuario-input" 
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)} 
            placeholder="Contraseña"
            disabled={!isEditing}
          />
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

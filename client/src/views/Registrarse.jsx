import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registrarse.css';
import logo from '../assets/logo.png';

const Registrarse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    mail: '',
    contraseña: '',
    role:'USUARIO'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateMail = (mail) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!validateMail(formData.mail)) {
      setError('Por favor, introduce un mail válido.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4002/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('authToken', data.access_token);
        sessionStorage.setItem('mail', formData.mail); // Guardando el correo

  
        // Redirigir al HomePage
        navigate('/');
      } else {
        setError('Error al registrar el usuario. Verifica los datos.');
      }
    } catch (err) {
      setError('Error al conectarse con el servidor.');
    }
  };

  return (
    <body className='registrarse-fondo'>  
    <div class="registrse-conteiner">
        <img src={logo} alt="Logo de The Golden Feather" className="registrarse-logo" />
        <div className='registrarse-h1'> Bienvenido a The Golden Feather</div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className='registrarse-form' onSubmit={handleSubmit}>
          <input
            type="text"
            className='registrarse-input'
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            className='registrarse-input'
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
          />
          <input
            type="email"
            className='registrarse-input'
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder="Mail"
            required
          />
          <input
            type="password"
            className='registrarse-input'
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
          <button className='registrarse-button' type="submit">Registrarse</button>
        </form>
        <p className="registrarse-login-link">
          ¿Ya tienes una cuenta? <Link to="/LoginPage">Iniciar Sesión</Link>
        </p>
      </div>
    </body>
  );
};

export default Registrarse;

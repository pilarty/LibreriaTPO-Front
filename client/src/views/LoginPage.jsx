import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const validateMail = (mail) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateMail(mail)) {
      setError('Por favor, introduce un mail válido.');
      return;
    }

    try {
      // Solicitud POST para autenticar al usuario
      const response = await fetch('http://localhost:4002/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'access_token'
        },
        body: JSON.stringify({ mail, contraseña }), // Enviar el mail y la contraseña al backend
      });

      if (!response.ok) {
        // Si el backend responde con un error (ej. credenciales incorrectas)
        throw new Error('Error al iniciar sesión.');
      }

      const data = await response.json();
      sessionStorage.setItem('authToken', data.access_token);
      sessionStorage.setItem('mail', mail); // Guardando el correo
      
      // asumiendo que el backend devuelve un token o mensaje de éxito
      console.log('Inicio de sesión exitoso', data);

      // redirige al usuario a la página principal
      navigate('/');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setError('Error al iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <body className='login-fondo'>
    <div classname="login-container">
      <img src={logo} alt="Logo de The Golden Feather" className="login-logo" />
      <div className='login-h1'>
        Bienvenido de nuevo a <br />
        <span className="tituloEspecial">The Golden Feather</span>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type="email"
          className='login-input'
          id="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Mail"
          required
        />
        <input
          type="password"
          className='login-input'
          id="contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button className='login-button' type="submit">Iniciar Sesión</button>
      </form>
      <p className="login-Registrarse-link">
        ¿No estás registrado? <Link to="/Registrarse">Registrate</Link>
      </p>
      </div>
    </body>
  );
};

export default LoginPage;

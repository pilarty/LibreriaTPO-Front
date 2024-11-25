import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../Redux/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {token, loading, error2} = useSelector((state => state.auth));

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
      const credencial = {
        mail: mail,
        contraseña: contraseña
      }
      const response = await dispatch(authenticateUser(credencial))

      if (!response.payload || response.error) {
        setError('Error al iniciar sesión.');
        return;
      }
      if (token && mail) {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('mail', mail);
        navigate('/');
      } else {
        setError('Error al guardar los datos de autenticación.');
      }
    } catch (error){
      console.error('Error en el inicio de sesión:', error);
      setError('Error al iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <body className='login-fondo'>
    <div className="login-container">
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

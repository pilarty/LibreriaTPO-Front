import React, { useState } from 'react';
import './LoginPage.css';
import logo from './assets/logo.jpeg';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Por favor, introduce un email válido.');
      return;
    }

    // Aquí iría la lógica de autenticación
    console.log('Intento de inicio de sesión con:', email, password);
  };

  return (
    <>
      <div className="fondoRayado"></div>
      <div className="container">
      <img src={logo} alt="Logo de The Golden Feather" className="logo" />
      <h1>
        Bienvenido de nuevo a <br />
        <span className="tituloEspecial">"The Golden Feather"</span>
      </h1>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
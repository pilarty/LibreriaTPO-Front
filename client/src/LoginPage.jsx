import React, { useState } from 'react';
import './LoginPage.css';
import logo from './assets/logo.jpeg';


const LoginPage = () => {
  const [mail, setmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const validateMail = (mail) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateMail(mail)) {
      setError('Por favor, introduce un mail válido.');
      return;
    }

    // Aquí iría la lógica de autenticación
    console.log('Intento de inicio de sesión con:', mail, password);
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
            type="mail"
            id="mail"
            value={mail}
            onChange={(e) => setmail(e.target.value)}
            placeholder="Mail"
            required
          />
          <input
            type="contraseña"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
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
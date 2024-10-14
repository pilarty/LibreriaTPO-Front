import React, { useState } from 'react';
import "./SignupPage.css";
import logo from './assets/logo.jpeg';
 
const SignupPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
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

    // Validación del correo
    if (!validateMail(formData.mail)) {
      setError('Por favor, introduce un mail válido.');
      return;
    }

    try {
      // Petición al backend para registrar al usuario
      const response = await fetch('http://localhost:8080/api/auth/register', { // Cambia la URL si tu backend está en otro puerto o dominio
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          mail: formData.mail,
          contraseña: formData.contraseña,
        }),
      });

      // Verificar si la respuesta es exitosa
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Guarda el token de autenticación si es necesario
        console.log('Usuario registrado con éxito', data);
        navigate('/welcome');  // Redirige a la página de bienvenida
      } else {
        setError('Error al registrar el usuario. Verifica los datos.');
      }
    } catch (err) {
      setError('Error al conectarse con el servidor.');
    }
  };

  return (
    <>
      <div className="fondoRayado"></div>
      <div className="container">
      <img src={logo} alt="Logo de The Golden Feather" className="logo" />
        <h1>Bienvenido a The Golden Feather</h1>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
          />
          <input
            type="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder="mail"
            required
          />
          <input
            type="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
          <button type="submit">Registrarse</button>
        </form>
        <p className="login-link">¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a></p>
      </div>
    </>
  );
};
 
export default SignupPage;
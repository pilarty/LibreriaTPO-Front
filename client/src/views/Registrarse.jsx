import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createMail } from "../Redux/mailSlice";
import {registerUser} from "../Redux/registerSlice";
import './Registrarse.css';
import logo from '../assets/logo.png';

const Registrarse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    mail: '',
    contraseña: '',
    role:'USUARIO'
  });
  const [error, setError] = useState('');

  const [registroIniciado, setRegistroIniciado] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [codigoGenerado, setCodigoGenerado] = useState('');

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
  
    handleRegistrarse();

  };

  const handleRegistrarse = () => {
    enviarCodigoVerificacion();
    setRegistroIniciado(true);
  };

  const enviarCodigoVerificacion = () => {
    const codigo = generarCodigo(); 
    setCodigoGenerado(codigo);

    // Usa dispatch para enviar el correo
    dispatch(
      createMail({
        mail: formData.mail,
        subject: 'Código de verificación',
        htmlBody: `<p>Tu código de verificación es: <strong>${codigo}</strong></p>`,
      })
    );
  };

  const generarCodigo = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Genera un código de 4 dígitos
  };

  const handleVerificarCodigo = async () => {
    if (codigo === codigoGenerado) {
      try {
        const resultAction = await dispatch(registerUser(formData));
  
        if (registerUser.fulfilled.match(resultAction)) {
          sessionStorage.setItem('authToken', resultAction.payload.access_token);
          sessionStorage.setItem('mail', formData.mail); 
          navigate('/');
        } else {
          setError('Error al registrar el usuario. Verifica los datos.');
        }
      } catch (err) {
        setError('Error al conectarse con el servidor.');
      }
      alert('Código verificado con éxito');
      setRegistroIniciado(false);
      navigate('/'); 
    } else {
      alert('Código incorrecto');
    }
  };

  const handleCancelar = () => {
    setRegistroIniciado(false); // Cierra el popup
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

        {registroIniciado && (
          <div className="popup-registro">
            <div className="registro-popup-contenido">
              <h2>Verificación de Registro</h2>
              <p>Se ha enviado un código de verificación a tu correo. Por favor, ingrésalo a continuación:</p>
              <input
                type="text"
                placeholder="Código de verificación"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              <button onClick={handleVerificarCodigo}>Verificar Código</button>
              <button onClick={handleCancelar}>Cancelar</button>
            </div>
          </div>
        )}

      </div>
    </body>
  );
};

export default Registrarse;

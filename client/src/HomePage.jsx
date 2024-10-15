import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/LoginPage');
  };

  const handleSignupClick = () => {
    navigate('/SignupPage'); // Navegar a la página de registro
  };

  return (
    <div>
      <h1>¡Bienvenido a The Golden Feather!</h1>
      <p>Autenticación exitosa. Esta es una página temporal.</p>
      <button onClick={handleLoginClick}>Ir a Iniciar Sesión</button>
      <button onClick={handleSignupClick}>Ir a Registrarse</button> {/* Botón adicional para registrarse */}
    </div>
  );
};

export default HomePage;

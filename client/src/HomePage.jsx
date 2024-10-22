import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/LoginPage');
  };

  const handleSignupClick = () => {
    navigate('/Registrarse'); // Navegar a la página de registro
  };

  const handleEditUserClick = () => {
    navigate('/Usuario'); // Navegar a la página de editar usuario
  };

  return (
    <div>
      <h1>¡Bienvenido a The Golden Feather!</h1>
      <p>Autenticación exitosa. Esta es una página temporal.</p>
      <button onClick={handleLoginClick}>Ir a Iniciar Sesión</button>
      <button onClick={handleSignupClick}>Ir a Registrarse</button> {/* Botón adicional para registrarse */}
      <button onClick={handleEditUserClick}>Editar Usuario</button> {/* Botón adicional para editar usuario */}
    </div>
  );
};

export default HomePage;
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './HomePage';
import LoginPage from './LoginPage';
import Registrarse from './Registrarse';
import Usuario from './Usuario';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/Registrarse' element={<Registrarse />} />
        <Route path='/Usuario' element={<Usuario />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './Homepage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/SignupPage' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

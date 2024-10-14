import './App.css'
import Navigation from './Navigation'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Homepage'
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const App = ()=>{

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/LoginPage' element={<LoginPage/>}/>
        <Route path='/SignupPage' element={<SignupPage/>}/>
      </Routes>
    
    </>
  )
}

export default App
import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './Navigation'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Homepage'
import ListaLibros from './ListaLibros'
import Carrito from './Carrito'
import Compra from './Compra'
import Favoritos from './Favoritos'
import LibroSolo from './LibroSolo'
import Registrarse from './Registrarse'
import Usuario from './Usuario'

const App = ()=>{

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/Libros' element={<ListaLibros/>}/>
        <Route path='/Carrito' element={<Carrito/>}/>
        <Route path='/Compra' element={<Compra/>}/>
        <Route path='/Favs' element={<Favoritos/>}/>
        <Route path='/Libro' element={<LibroSolo/>}/>
        <Route path='/Registrarse' element={<Registrarse/>}/>
        <Route path='/Usuario' element={<Usuario/>}/>
      </Routes>
    
    </>
  )
}

export default App

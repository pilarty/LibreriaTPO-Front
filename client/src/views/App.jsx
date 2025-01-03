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
import PublicarLibro from './PublicarLibro'
import LoginPage from './LoginPage'
import Cupones from './Cupones'
import VerOrdenes from './VerOrdenes'
import DetallesOrden from '../components/DetallesOrden'
import AdministrarLibros from "./AdministrarLibros"
import EditarLibro from "./EditarLibro"
import Busqueda from "./Busqueda"
import Recomendados from "./Recomendados"
import Novedades from "./Novedades"

const App = ()=>{

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/ListaLibros/:generoId' element={<ListaLibros />} />
        <Route path='/Libro/:isbn' element={<LibroSolo />} />
        <Route path='/Carrito' element={<Carrito/>}/>
        <Route path='/Compra' element={<Compra/>}/>
        <Route path='/Favs' element={<Favoritos/>}/>
        <Route path='/Libro' element={<LibroSolo/>}/>
        <Route path='/Registrarse' element={<Registrarse/>}/>
        <Route path='/Usuario' element={<Usuario/>}/>
        <Route path='/publicarLibro' element={<PublicarLibro/>}/>
        <Route path='/LoginPage' element={<LoginPage/>}/>
        <Route path='/Giftcard' element={<Cupones/>}/>
        <Route path='/VerOrdenes' element={<VerOrdenes/>}/>
        <Route path='/DetallesOrden/:id' element={<DetallesOrden/>}/>
        <Route path='/AdministrarLibros' element={<AdministrarLibros/>}/>
        <Route path='/EditarLibro/:isbn' element={<EditarLibro />} />
        <Route path='/Busqueda/:text' element={<Busqueda />} />
        <Route path='/Recomendados' element={<Recomendados/>}/>
        <Route path='/Novedades' element={<Novedades/>}/>
      </Routes>
    
    </>
  )
}

export default App

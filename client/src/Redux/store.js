import {configureStore} from "@reduxjs/toolkit"
import librosReducer from "./librosSlice"
import usuariosReducer from "./usuariosSlice"
import productoCarritoReducer from "./productoCarritoSlice";
import carritoReducer from "./carritoSlice";
import generosReducer from "./generosSlice"
import registerReducer from "./registerSlice"
import authReducer from "./authSlice"
import ordenesReducer from "./ordenesSlice"
import imagenesReducer from "./imagenesSlice"
import giftCardReducer from "./giftCardSlice"
import enviarMailReducer from "./mailSlice"

export const store = configureStore({
    reducer: {
        libros : librosReducer,
        usuarios : usuariosReducer,
        productoCarrito: productoCarritoReducer,
        carrito: carritoReducer,
        generos : generosReducer,
        register : registerReducer,
        auth : authReducer,
        ordenes : ordenesReducer,
        imagenes : imagenesReducer,
        giftcard : giftCardReducer,
        enviarMail : enviarMailReducer
    },
})

export default store;
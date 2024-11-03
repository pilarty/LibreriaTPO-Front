import {configureStore} from "@reduxjs/toolkit";
import librosReducer from "./librosSlice";
import usuariosReducer from "./usuariosSlice";
import productoCarritoReducer from "./productoCarritoSlice";
import carritoReducer from "./carritoSlice";

export const store = configureStore({
    reducer: {
        libros : librosReducer,
        usuarios : usuariosReducer,
        productoCarrito: productoCarritoReducer,
        carrito: carritoReducer,
    },
})

export default store;
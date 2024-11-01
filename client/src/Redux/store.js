import {configureStore} from "@reduxjs/toolkit"
import librosReducer from "./librosSlice"
import usuariosReducer from "./usuariosSlice"
import productoCarritoReducer from "./productoCarritoSlice";

export const store = configureStore({
    reducer: {
        libros : librosReducer,
        usuarios : usuariosReducer,
        productoCarrito: productoCarritoReducer,
    },
})

export default store;
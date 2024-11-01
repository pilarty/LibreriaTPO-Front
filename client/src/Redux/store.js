import {configureStore} from "@reduxjs/toolkit"
import librosReducer from "./librosSlice"
import usuariosReducer from "./usuariosSlice"
import generosReducer from "./generosSlice"

export const store = configureStore({
    reducer: {
        libros : librosReducer,
        usuarios : usuariosReducer,
        generos : generosReducer,
    },
})

export default store;

import {configureStore} from "@reduxjs/toolkit"
import librosReducer from "./librosSlice"
import usuariosReducer from "./usuariosSlice"
import generosReducer from "./generosSlice"
import registerReducer from "./registerSlice"

export const store = configureStore({
    reducer: {
        libros : librosReducer,
        usuarios : usuariosReducer,
        generos : generosReducer,
        register : registerReducer,
    },
})

export default store;

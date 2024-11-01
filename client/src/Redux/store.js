import {configureStore} from "@reduxjs/toolkit"
import librosReducer from "./librosSlice"
import usuariosReducer from "./usuariosSlice"
import generosReducer from "./generosSlice"
import registerReducer from "./registerSlice"
import authReducer from "./authSlice"

export const store = configureStore({
    reducer: {
        libros : librosReducer,
        usuarios : usuariosReducer,
        generos : generosReducer,
        register : registerReducer,
        auth : authReducer,
    },
})

export default store;

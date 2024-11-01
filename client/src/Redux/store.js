import {configureStore} from "@reduxjs/toolkit"
import librosReducer from "./librosSlice"
import usuariosReducer from "./usuariosSlice"

export const store = configureStore({
    reducer: {
        libros : librosReducer,
        usuarios : usuariosReducer,
    },
})

export default store;

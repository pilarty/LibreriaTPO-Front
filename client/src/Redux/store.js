import {configureStore} from "@reduxjs/toolkit"
import librosReducer from "./librosSlice"
import usuariosReducer from "./usuariosSlice"
import generosReducer from "./generosSlice"
import registerReducer from "./registerSlice"
import authReducer from "./authSlice"
import ordenesReducer from "./ordenesSlice"
import imagenesReducer from "./imagenesSlice"
import giftCardReducer from "./giftCardSlice"

export const store = configureStore({
    reducer: {
        libros : librosReducer,
        usuarios : usuariosReducer,
        generos : generosReducer,
        register : registerReducer,
        auth : authReducer,
        ordenes : ordenesReducer,
        imagenes : imagenesReducer,
        giftcard : giftCardReducer,
    },
})

export default store;

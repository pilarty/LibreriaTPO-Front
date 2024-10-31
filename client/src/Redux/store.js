import {configureStore} from "@reduxjs/toolkit"
import librosReducer from "./librosSlice"

export const store = configureStore({
    reducer: {
        libros : librosReducer,
    },
})

export default store;

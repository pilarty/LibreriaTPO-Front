import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCarrito = createAsyncThunk('carrito/getCarrito',
    async (emailUsuario) => {
        const { data } = await axios(`http://localhost:4002/carritos/${emailUsuario}`);
        return data;
    });

const carritoSlice = createSlice({
    name: "carrito",
    initialState: {
        items_carrito: [], 
        loading: false, 
        error: null, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCarrito.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCarrito.fulfilled, (state, action) => { 
            state.loading = false;
            state.items_carrito = action.payload; 
        })
        .addCase(getCarrito.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; 
        });
    }
});

export default carritoSlice.reducer;

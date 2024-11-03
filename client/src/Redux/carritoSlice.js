import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getCarrito = createAsyncThunk('carrito/getCarrito',
    async (emailUsuario) => {
        const {data} = await axios(`http://localhost:4002/carritos/${emailUsuario}`);
        return data;
    });

export const getAllCarritos = createAsyncThunk(
    'carrito/getAllCarritos',
    async () => {
        const { data } = await axios('http://localhost:4002/carritos');
        return data;
    });

const carritoSlice = createSlice({
    name: "carrito",
    initialState: {
        carrito: [], //esta bien este null?
        carritos: [], 
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        //GET CARRITO
        .addCase(getCarrito.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCarrito.fulfilled, (state, action) => { 
        state.loading = false;
        state.carrito = action.payload;
        })
        .addCase(getCarrito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })

        //GET CARRITOS
        .addCase(getAllCarritos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllCarritos.fulfilled, (state, action) => { 
        state.loading = false;
        state.carritos = action.payload;
        })
        .addCase(getAllCarritos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })
    }
});

export default carritoSlice.reducer;
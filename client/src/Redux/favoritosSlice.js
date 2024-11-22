import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Obtener todos los libros marcados como favoritos
export const getFavoritos = createAsyncThunk("favoritosSlice/getFavoritos", async () => {
    const { data } = await axios.get("http://localhost:4002/libros");
    
    return data.filter(libro => libro.favorito);
});

// Marcar un libro como favorito 
export const addFavorito = createAsyncThunk("favoritosSlice/addFavorito", async (id) => {
    const { data } = await axios.patch(`http://localhost:4002/libros/${id}`, { favorito: true });
    return data;
});

// Quitar un libro de favoritos 
export const removeFavorito = createAsyncThunk("favoritosSlice/removeFavorito", async (id) => {
    const { data } = await axios.patch(`http://localhost:4002/libros/${id}`, { favorito: false });
    return data;
});

const favoritosSlice = createSlice({
    name: "favoritosSlice",
    initialState: {
        items: [], // Lista de libros favoritos
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Obtener favoritos
            .addCase(getFavoritos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFavoritos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getFavoritos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Añadir un favorito
            .addCase(addFavorito.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFavorito.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addFavorito.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Quitar un favorito
            .addCase(removeFavorito.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFavorito.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(favorito => favorito.id !== action.payload.id);
            })
            .addCase(removeFavorito.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Exportar el reducer
export default favoritosSlice.reducer;

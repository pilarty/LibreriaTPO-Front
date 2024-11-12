import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllGeneros = createAsyncThunk("generos/getAllGeneros", async () => {
  const { data } = await axios.get("http://localhost:4002/generos");
  return data;
});

export const getGeneroById = createAsyncThunk("generos/getGeneroById", async (id) => {
  const { data } = await axios.get(`http://localhost:4002/generos/${id}`);
  return data;
});

export const getIdByNombre = createAsyncThunk("generos/getIdByNombre", async (nombre) => {
  const { data } = await axios.get(`http://localhost:4002/generos/${nombre}/idByNombre`);
  return data;
});

export const createGenero = createAsyncThunk("generos/createGenero", async (newGenero) => {
  const { data } = await axios.post("http://localhost:4002/generos", newGenero);
  return data;
});

export const putGenero = createAsyncThunk("generos/putGenero", async ({ id, updatedGenero }) => {
  const { data } = await axios.put(`http://localhost:4002/generos/${id}`, updatedGenero);
  return data;
});

export const deleteGenero = createAsyncThunk("generos/deleteGenero", async (id) => {
  await axios.delete(`http://localhost:4002/generos/${id}`);
  return id;
});

const generosSlice = createSlice({
  name: "generos",
  initialState: {
    items: [],
    loading: false,
    error: null,
    genero: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL GENEROS
      .addCase(getAllGeneros.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGeneros.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllGeneros.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET GENERO BY ID
      .addCase(getGeneroById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGeneroById.fulfilled, (state, action) => {
        state.loading = false;
        state.genero = action.payload;
      })
      .addCase(getGeneroById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET ID BY NOMBRE
      .addCase(getIdByNombre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIdByNombre.fulfilled, (state, action) => {
        state.loading = false;
        state.genero = action.payload; 
      })
      .addCase(getIdByNombre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE GENERO
      .addCase(createGenero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGenero.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); 
      })
      .addCase(createGenero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // PUT GENERO
      .addCase(putGenero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putGenero.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(genero => genero.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; 
        }
      })
      .addCase(putGenero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE GENERO
      .addCase(deleteGenero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGenero.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(genero => genero.id !== action.payload); 
      })
      .addCase(deleteGenero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default generosSlice.reducer;

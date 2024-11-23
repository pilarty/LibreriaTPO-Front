import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsuarios = createAsyncThunk("usuarios/getAllUsuarios", async () => {
  const { data } = await axios.get(`http://localhost:4002/usuarios`);
  return data;
});

export const getUsuario = createAsyncThunk("usuarios/getUsuario", async (mail) => {
    const { data } = await axios.get(`http://localhost:4002/usuarios/mail/${mail}`);
    return data;
  });

export const putUsuario = createAsyncThunk("usuarios/putUsuario", async ({id, updatedUser}) => {
  const { data } = await axios.put(`http://localhost:4002/usuarios/${id}`, updatedUser);
  return data;
});

export const deleteUsuario = createAsyncThunk("usuarios/deleteUsuario", async (id) => {
  await axios.delete(`http://localhost:4002/usuarios/${id}`);
  return id;
});

export const getUsuarioById = createAsyncThunk("usuarios/getUsuarioById", async (id) => {
  const { data } = await axios.get(`http://localhost:4002/usuarios/${id}`);
    return data;
  });

const usuarioSlice = createSlice({
  name: "usuarios",
  initialState: {
    items: [],
    loading: true,
    error: null,
    usuario: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getAllUsuarios
      .addCase(getAllUsuarios.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
      .addCase(getAllUsuarios.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; 
        })
      .addCase(getAllUsuarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })

       //getUsuario
      .addCase(getUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
      .addCase(getUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload; 
        })
      .addCase(getUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })

        //PutUsuario
      .addCase(putUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putUsuario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; 
        }
      })
      .addCase(putUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //DeleteUsuario
      .addCase(deleteUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(user => user.id !== action.payload); 
      })
      .addCase(deleteUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       //getUsuarioById
      .addCase(getUsuarioById.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
      .addCase(getUsuarioById.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload; 
        })
      .addCase(getUsuarioById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        });


  },
});

export default usuarioSlice.reducer;
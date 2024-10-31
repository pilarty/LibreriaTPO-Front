import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const putUsuario = createAsyncThunk("usuarios/putUsuario", async (mail) => {
  const { data } = await axios.put(`http://localhost:4002/usuarios/mail/${mail}`, mail);
  return data;
});

const usuarioSlice = createSlice({
  name: "usuarios",
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default usuarioSlice.reducer;
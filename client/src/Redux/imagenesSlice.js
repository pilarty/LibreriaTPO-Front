import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postImagen = createAsyncThunk(
    "imagenes/postImagen",
    async (imageData) => { 
      const { data } = await axios.post("http://localhost:4002/images", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    }
  );

export const deleteImagen = createAsyncThunk(
  "imagenes/deleteImagen",
  async (imageId) => {
    await axios.delete(`http://localhost:4002/images/${imageId}`);
    return imageId; 
  }
);

const imagenesSlice = createSlice({
  name: "imagenes",
  initialState: {
    items: [],       
    loading: false,  
    error: null,     
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //postImagen
      .addCase(postImagen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postImagen.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(postImagen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //deleteImagen
      .addCase(deleteImagen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImagen.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((img) => img.id !== action.payload);
      })
      .addCase(deleteImagen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default imagenesSlice.reducer;

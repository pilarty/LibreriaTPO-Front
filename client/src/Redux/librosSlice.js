import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const getLibros = createAsyncThunk("libros/getLibros", async()=>{
    const {data} = await axios("http://localhost:4002/libros");
    return data;
});

export const getLibroByIsbn = createAsyncThunk("libros/getLibroByIsbn", async (isbn) => {
  const { data } = await axios.get(`http://localhost:4002/libros/${isbn}`);
  return data;
});

export const createLibros = createAsyncThunk("libros/createLibros", async (newLibro) => {
    const { data } = await axios.post("http://localhost:4002/libros", newLibro);
    return data;
  });

const librosSlice = createSlice({
    name: "libros",
    initialState: {
        items: [],
        loading: true,
        error: null,
        libro: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        //GET LIBROS
        .addCase(getLibros.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getLibros.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
          })
          .addCase(getLibros.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          // GET LIBRO BY ISBN
          .addCase(getLibroByIsbn.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getLibroByIsbn.fulfilled, (state, action) => {
            state.loading = false;
            state.libro = action.payload;
          })
          .addCase(getLibroByIsbn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          //CREATE LIBROS
          .addCase(createLibros.pending, (state) => {
            state.loading = false;
            state.error = null;
          })
          .addCase(createLibros.fulfilled, (state, action) => {
            state.loading = false;
            state.items = [action.payload];
          })
          .addCase(createLibros.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
});

export default librosSlice.reducer;
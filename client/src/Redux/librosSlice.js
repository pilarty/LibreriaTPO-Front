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

export const putLibro = createAsyncThunk("libros/putLibro", async ({ isbn, updatedLibro }) => {
  const { data } = await axios.put(`http://localhost:4002/libros/${isbn}`, updatedLibro);
  return data;
});

export const deleteLibro = createAsyncThunk("libros/deleteLibro", async (isbn) => {
  await axios.delete(`http://localhost:4002/libros/${isbn}`);
  return isbn;
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
          })

          // PUT LIBRO
          .addCase(putLibro.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(putLibro.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.items.findIndex(libro => libro.isbn === action.payload.isbn);
            if (index !== -1) {
              state.items[index] = action.payload;
            }
          })
          .addCase(putLibro.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          // DELETE LIBRO
          .addCase(deleteLibro.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteLibro.fulfilled, (state, action) => {
            state.loading = false;
            state.items = state.items.filter(libro => libro.isbn !== action.payload); 
          })
          .addCase(deleteLibro.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
});

export default librosSlice.reducer;
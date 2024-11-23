import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axiosInstance from "./axiosInstance";
import axios from "axios"

export const getLibros = createAsyncThunk("libros/getLibros", async()=>{
    const {data} = await axios("http://localhost:4002/libros");
    return data;
});

export const getLibroByIsbn = createAsyncThunk("libros/getLibroByIsbn", async (isbn) => {
  const { data } = await axios.get(`http://localhost:4002/libros/${isbn}`);
  return data;
});

export const getLibrosByTitulo = createAsyncThunk("libros/getLibrosByTitulo", async (titulo) => {
  const { data } = await axios.get(`http://localhost:4002/libros/titulo/${titulo}`);
  return data;
});

export const createLibros = createAsyncThunk("libros/createLibros", async (newLibro) => {
    const { data } = await axiosInstance.post("http://localhost:4002/libros", newLibro);
    return data;
  });

export const putLibro = createAsyncThunk("libros/putLibro", async ({ isbn, updatedLibro }) => {
  const { data } = await axiosInstance.put(`http://localhost:4002/libros/${isbn}`, updatedLibro);
  return data;
});

export const deleteLibro = createAsyncThunk("libros/deleteLibro", async (isbn) => {
  try {
      await axiosInstance.delete(`http://localhost:4002/libros/${isbn}`);
      return isbn;
  } catch (error) {
      throw new Error("Error al eliminar el libro");
  }
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

          //GET LIBROS BY TITULO
          .addCase(getLibrosByTitulo.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getLibrosByTitulo.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
          })
          .addCase(getLibrosByTitulo.rejected, (state, action) => {
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
            state.items = {
                ...state.items, // Copia las demás propiedades de items
                content: state.items.content.map((libro) =>
                    libro.isbn === action.payload.isbn ? action.payload : libro
                ),
            };
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
            const index = state.items.content.findIndex(
                (libro) => libro.isbn === action.payload
            );
            if (index !== -1) {
                state.items.content.splice(index, 1);
            }
          })
          .addCase(deleteLibro.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
});

export default librosSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import axiosInstance from "./axiosInstance";

//CREATE
export const createProductoCarrito = createAsyncThunk(
  "productosCarrito/createProductoCarrito",
  async (producto, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.post("http://localhost:4002/productosCarrito", {
              cantidad: producto.cantidad,
              isbn: producto.isbn,
              carrito_mail: producto.carrito_mail,
          });
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response ? error.response.data : error.message);
      }
  }
);

//GET PRODUCTOS CARRITO BY MAIL
export const getProductosCarrito = createAsyncThunk("productosCarrito/getProductosCarrito",
    async (emailUsuario) => {
        const {data} = await axiosInstance(`http://localhost:4002/productosCarrito/${emailUsuario}/listaDeProductosCarritoByMail`);
        return data;
    });

//PUT
export const actualizarCantidadProducto = createAsyncThunk("productoCarrito/actualizarCantidadProducto",
    async ({ isbn, carrito_mail, cantidad }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("http://localhost:4002/productosCarrito/ActualizarCantLibro", {
                isbn,
                carrito_mail,
                cantidad,
            });
            return { isbn, cantidad };
        } catch (error) {
            return rejectWithValue("Error al actualizar la cantidad");
        }
    }
);

//DELETE
export const eliminarProductoCarrito = createAsyncThunk("productoCarrito/eliminarProductoCarrito",
    async ({ isbn, carrito_mail }, { rejectWithValue }) => {
        try {
            await axiosInstance.delete("http://localhost:4002/productosCarrito/EliminarprodCarrito", {
                data: { isbn, carrito_mail }
            });
            return isbn;
        } catch (error) {
            return rejectWithValue("Error al eliminar el libro del carrito");
        }
    }
);

const productoCarritoSlice = createSlice({
  name: "productoCarrito",
  initialState: {
      productos: [],
      loading: false,
      error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET PRODUCTOS CARRITO
      .addCase(getProductosCarrito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductosCarrito.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = action.payload;
      })
      .addCase(getProductosCarrito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // PUT ACTUALIZAR CANTIDAD PRODUCTO
      .addCase(actualizarCantidadProducto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actualizarCantidadProducto.fulfilled, (state, action) => {
        const { isbn, cantidad } = action.payload;
        const producto = state.productos.find((p) => p.libro.isbn === isbn);
        if (producto) {
          producto.cantidad = cantidad;
        }
        state.loading = false;
      })
      .addCase(actualizarCantidadProducto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE ELIMINAR PRODUCTO DEL CARRITO
      .addCase(eliminarProductoCarrito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(eliminarProductoCarrito.fulfilled, (state, action) => {
        const isbn = action.payload;
        state.productos = state.productos.filter(
          (producto) => producto.libro.isbn !== isbn
        );
        state.loading = false;
      })
      .addCase(eliminarProductoCarrito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // POST CREATE PRODUCTO CARRITO
      .addCase(createProductoCarrito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductoCarrito.fulfilled, (state, action) => {
        state.loading = false;
        state.productos.push(action.payload);
      })
      .addCase(createProductoCarrito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

  
export default productoCarritoSlice.reducer;
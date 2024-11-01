import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

//GET PRODUCTOS CARRITO BY MAIL
export const getProductosCarrito = createAsyncThunk("productosCarrito/getProductosCarrito",
    async (emailUsuario) => {
        const {data} = await axios(`http://localhost:4002/productosCarrito/${emailUsuario}/listaDeProductosCarritoByMail`);
        return data;
    });

//PUT
export const actualizarCantidadProducto = createAsyncThunk("productoCarrito/actualizarCantidadProducto",
    async ({ isbn, carrito_mail, cantidad }, { rejectWithValue }) => {
        try {
            const response = await axios.put("http://localhost:4002/productosCarrito/ActualizarCantLibro", {
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
            await axios.delete("http://localhost:4002/productosCarrito/EliminarprodCarrito", {
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
        .addCase(getProductosCarrito.fulfilled, (state, action) => { //operación asíncrona completada exitosamente
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
        });
    },
  });
  
export default productoCarritoSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getOrdenes = createAsyncThunk(
  "ordenes/getOrdenes",
  async ({ page, size }) => {
    const { data } = await axiosInstance.get(`http://localhost:4002/ordenes?page=${page}&size=${size}`);
    return data;
  }
);

export const postOrdenes = createAsyncThunk(
  "ordenes/postOrdenes",
  async (newOrder) => {
    const { data } = await axiosInstance.post("http://localhost:4002/ordenes", newOrder);
    return data;
  }
);

export const getOrdenesByMail = createAsyncThunk(
  "ordenes/getOrdenesByMail",
  async (mail) => {
    const { data } = await axiosInstance.get(`http://localhost:4002/ordenes/usuario${mail}`);
    return data;
  }
);

export const getOrdenesById = createAsyncThunk(
  "ordenes/getOrdenesById",
  async (id) => {
    const {data} = await axiosInstance.get(`http://localhost:4002/ordenes/${id}`);
    return data;
  }
);

export const updateOrden = createAsyncThunk(
  'ordenes/updateOrden',
  async ({ id, estado }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`http://localhost:4002/ordenes/${id}/estado`, {
        estado,
      });
      return { estado };
    } catch (error) {
      return rejectWithValue("Error al actualizar el estado");
    }
  }
);



const ordenesSlice = createSlice({
  name: "ordenes",
  initialState: {
    items: {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true
        },
        offset: 0,
        paged: true,
        unpaged: false
      },
      last: true,
      totalElements: 0,
      totalPages: 0,
      size: 10,
      number: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      first: true,
      numberOfElements: 0,
      empty: false
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(getOrdenes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdenes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getOrdenes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Post ordenes
      .addCase(postOrdenes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postOrdenes.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar el estado después de crear una nueva orden
        state.items.content.push(action.payload);
        state.items.numberOfElements += 1;
        state.items.totalElements += 1;
      })
      .addCase(postOrdenes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Get ordenes by mail
      .addCase(getOrdenesByMail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdenesByMail.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getOrdenesByMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Get Orden by id
      .addCase(getOrdenesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdenesById.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getOrdenesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Orden by id
      .addCase(updateOrden.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrden.fulfilled, (state, action) => {
        state.loading = false;  // Cambiar el estado de loading
      
        const { id, estado } = action.payload;  // Obtener id y estado del payload
      
        // Buscar la orden en el arreglo 'content' dentro de 'items'
        const orden = state.items.content.find((orden) => orden.id === id);
        
        // Si la orden se encuentra, actualizar su estado
        if (orden) {
          orden.estado = estado;
        }
      })
      .addCase(updateOrden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  },
});

export default ordenesSlice.reducer;
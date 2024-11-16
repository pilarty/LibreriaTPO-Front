import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrdenes = createAsyncThunk(
  "ordenes/getOrdenes",
  async ({ page = 0, size = 10 }) => {
    const { data } = await axios.get(`http://localhost:4002/ordenes?page=${page}&size=${size}`);
    return data;
  }
);

export const postOrdenes = createAsyncThunk(
  "ordenes/postOrdenes",
  async (newOrder) => {
    const { data } = await axios.post("http://localhost:4002/ordenes", newOrder);
    return data;
  }
);

export const getOrdenesByMail = createAsyncThunk(
  "ordenes/getOrdenesByMail",
  async (mail) => {
    const { data } = await axios.get(`http://localhost:4002/ordenes/usuario${mail}`);
    return data;
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
      });
  },
});

export default ordenesSlice.reducer;
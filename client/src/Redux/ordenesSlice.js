import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getOrdenes = createAsyncThunk(
  "ordenes/getOrdenes",
  async () => {
    const { data } = await axiosInstance.get("http://localhost:4002/ordenes");
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

const ordenesSlice = createSlice({
  name: "ordenes",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetOrdenes
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

      //postOrdenes
      .addCase(postOrdenes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postOrdenes.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); 
      })
      .addCase(postOrdenes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //getOrdenesByMail
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

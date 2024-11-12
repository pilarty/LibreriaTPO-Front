import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (credentials) => {
    const { data } = await axios.post("http://localhost:4002/api/v1/auth/authenticate", credentials);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,       
    loading: false,    
    error: null,       
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token; 
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default authSlice.reducer;

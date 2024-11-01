import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const registerUser = createAsyncThunk("register/registerUser", async (userData) => {
      const { data } = await axios.post("http://localhost:4002/api/v1/auth/register", userData);
      return data;
    }
  );

  const registerSlice = createSlice({
    name: "register",
    initialState: {
      token: null, 
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload.access_token; 
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default registerSlice.reducer;
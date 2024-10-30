import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const URL = "http://localhost:4002/libros"

export const fetchPost = createAsyncThunk("posts/fetchPost", async()=>{
    const {data} = await axios(URL);
    return data;
});

export const createPosts = createAsyncThunk("posts/createposts", async () => {
    const { data } = axios.post(URL);
    return data;
  });

const postSlice = createSlice({
    name: "posts",
    initialState: {
        items: [],
        loading: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPost.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
          })
          .addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
});

export default postSlice.reducer;
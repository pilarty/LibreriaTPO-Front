import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllGiftCards = createAsyncThunk(
  "giftCard/getAllGiftCards",
  async () => {
    const { data } = await axios.get("http://localhost:4002/giftcards");
    return data;
  }
);

export const getByIdGiftCard = createAsyncThunk(
  "giftCard/getByIdGiftCard",
  async (id) => {
    const { data } = await axios.get(`http://localhost:4002/giftcards/byCodigo/${id}`);
    return data;
  }
);

export const postGiftCard = createAsyncThunk(
  "giftCard/postGiftCard",
  async (newGiftCard) => {
    const { data } = await axios.post("http://localhost:4002/giftcards", newGiftCard);
    return data;
  }
);

export const putGiftCard = createAsyncThunk(
  "giftCard/putGiftCard",
  async ({ id, updatedGiftCard }) => {
    const { data } = await axios.put(`http://localhost:4002/giftcards/${id}`, updatedGiftCard);
    return data;
  }
);

export const deleteGiftCard = createAsyncThunk(
  "giftCard/deleteGiftCard",
  async (id) => {
    await axios.delete(`http://localhost:4002/giftcards/${id}`);
    return id; 
  }
);

const giftCardSlice = createSlice({
  name: "giftCard",
  initialState: {
    items: [],          
    loading: false,  
    error: null,
    giftCard : null,    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getAllGiftCards
      .addCase(getAllGiftCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGiftCards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllGiftCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //getByIdGiftCard
      .addCase(getByIdGiftCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        state.giftCard = action.payload;
      })
      .addCase(getByIdGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //postGiftCard
      .addCase(postGiftCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(postGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //putGiftCard
      .addCase(putGiftCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(putGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //deleteGiftCard
      .addCase(deleteGiftCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((giftCard) => giftCard.id !== action.payload);
      })
      .addCase(deleteGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default giftCardSlice.reducer;

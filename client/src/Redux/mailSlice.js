import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const createMail = createAsyncThunk(
    "mail/createMail",
    async ({ mail, subject, htmlBody }, { rejectWithValue }) => {
        try {
        const response = await axios.post("http://localhost:4002/email/send", {
            to: mail,
            subject: subject,
            body: htmlBody,
        });
        return response.data; 
        } catch (error) {
        return rejectWithValue(
            error.response ? error.response.data : error.message
        );
        }
    }
    );

const mailSlice = createSlice({
    name: "mail",
    initialState: {
        loading: false, 
        success: false, 
        error: null, 
    },
    reducers: {
        resetState: (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createMail.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        .addCase(createMail.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(createMail.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload || "Error al enviar el correo";
        });
    },
    });

export default mailSlice.reducer;

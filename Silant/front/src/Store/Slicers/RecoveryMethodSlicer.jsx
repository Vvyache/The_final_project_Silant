import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecoveryMethodData = createAsyncThunk(
    "recoverymethod/fetchRecoveryMethodData",
    async (id, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                    Authorization: "Bearer " + accessToken,
                },
            };
            const url = id ? `http://127.0.0.1:8000/api/v1/recoveryMethod/${id}` : 'http://127.0.0.1:8000/api/v1/recoveryMethod/';

            const { data } = await axios.get(url, header);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    recoverymethod: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const RecoveryMethodSlicer = createSlice({
    name: "recoverymethod",
    initialState,
    reducers: {
        recoverymethodClear: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecoveryMethodData.fulfilled, (state, action) => {
            state.recoverymethod = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchRecoveryMethodData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchRecoveryMethodData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});

export const { recoverymethodClear } = RecoveryMethodSlicer.actions;
export default RecoveryMethodSlicer.reducer;

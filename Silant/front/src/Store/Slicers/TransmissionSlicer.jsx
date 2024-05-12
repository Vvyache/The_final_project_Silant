import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransmissionData = createAsyncThunk(
    "transmission/fetchTransmissionData",
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
            const url = id ? `http://127.0.0.1:8000/api/v1/modelOfTransmission/${id}` : 'http://127.0.0.1:8000/api/v1/modelOfTransmission/';

            const { data } = await axios.get(url, header);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    transmission: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const TransmissionSlicer = createSlice({
    name: "transmission",
    initialState,
    reducers: {
        transmissionClear: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTransmissionData.fulfilled, (state, action) => {
            state.transmission = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchTransmissionData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchTransmissionData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});

export const { transmissionClear } = TransmissionSlicer.actions;
export default TransmissionSlicer.reducer;

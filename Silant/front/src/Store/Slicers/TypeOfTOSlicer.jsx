import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTypeOfTOData = createAsyncThunk(
    "typeofto/fetchTypeOfTOData",
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
            const url = id ? `http://127.0.0.1:8000/api/v1/typeOfTO/${id}` : 'http://127.0.0.1:8000/api/v1/typeOfTO/';

            const { data } = await axios.get(url, header);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    typeofto: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const TypeOfTOSlicer = createSlice({
    name: "typeOfTO",
    initialState,
    reducers: {
        typeoftoClear: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTypeOfTOData.fulfilled, (state, action) => {
            state.typeofto = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(fetchTypeOfTOData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchTypeOfTOData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { typeoftoClear } = TypeOfTOSlicer.actions;
export default TypeOfTOSlicer.reducer;

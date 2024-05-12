import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const header = {
    headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
    },
};

export const DetailedData = createAsyncThunk(
    "detailed/DetailedData",
    async (id, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                ...header,
                headers: {
                    ...header.headers,
                    "Authorization": "Bearer " + accessToken
                }
            };

            const {data} = await axios.get(
                `http://127.0.0.1:8000/api/v1/detailed/${id}`,
                config
            );

            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialState = {
    loading: false,
    error: null,
    success: false,
    status: null,
    data: null, // Добавлено свойство для хранения полученных данных
};

const DetailedSlicer = createSlice({
    name: "detailed",
    initialState,
    reducers: {
        detailedClear: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(DetailedData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'OK';
            state.loading = false;
            state.success = true;
        });

        builder.addCase(DetailedData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(DetailedData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});

export const { detailedClear } = DetailedSlicer.actions;
export default DetailedSlicer.reducer;

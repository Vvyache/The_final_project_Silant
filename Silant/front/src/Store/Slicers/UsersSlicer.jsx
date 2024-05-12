import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UsersData = createAsyncThunk(
    "users/UsersData",
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
            const url = id ? `http://127.0.0.1:8000/api/v1/users/${id}/` : "http://127.0.0.1:8000/api/v1/users/";
            const { data } = await axios.get(url, header);

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    users: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearUsers: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(UsersData.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(UsersData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(UsersData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const AddMaintenanceData = createAsyncThunk(
    "maintenance/AddMaintenanceData",
    async (body, { rejectWithValue }) => {
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + localStorage.getItem('accessToken')
                },
            };

            const { data } = await axios.post(
                'http://127.0.0.1:8000/api/v1/maintenance/',
                body,
                header
            );

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const MaintenanceData = createAsyncThunk(
    "maintenance/MaintenanceData",
    async (_, { rejectWithValue }) => {
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + localStorage.getItem('accessToken')
                },
            };

            const { data } = await axios.get(
                'http://127.0.0.1:8000/api/v1/maintenance/',
                header
            );

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const initialState = {
    addmaintenance: null,
    data: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const MaintenanceSlicer = createSlice({
    name: "maintenance",
    initialState,
    reducers: {
        cleanStateAfterCreated: (state) => {
            state.addmaintenance = null
        },
        maintenanceClear: () => initialState
    },

    extraReducers: (builder) => {
        builder.addCase(AddMaintenanceData.fulfilled, (state, action) => {
            state.addmaintenance = action.payload;
            state.status = 'OK';
            state.loading = false;
            state.success = true;
        });

        builder.addCase(AddMaintenanceData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(AddMaintenanceData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(MaintenanceData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'OK';
            state.loading = false;
            state.success = true;
        });

        builder.addCase(MaintenanceData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(MaintenanceData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { cleanStateAfterCreated, maintenanceClear } = MaintenanceSlicer.actions
export default MaintenanceSlicer.reducer;

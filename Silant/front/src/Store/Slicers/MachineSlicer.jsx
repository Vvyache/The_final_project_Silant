import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/v1/machine/";

export const AddMachineData = createAsyncThunk(
    "addmachine/AddMachineData",
    async (body, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const { data } = await axios.post(baseURL, { body }, header);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const MachineData = createAsyncThunk(
    "machine/MachineData",
    async (accessToken, { rejectWithValue }) => {
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const { data } = await axios.get(baseURL, header);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const oneMachineData = createAsyncThunk(
    "oneMachine/oneMachineData",
    async (factoryNumberOfMachine, { rejectWithValue }) => {
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                },
            };
            const { data } = await axios.get(`${baseURL}${factoryNumberOfMachine}`, header);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    success: false,
    status: null,
    data: null,
    addmachine: null,
    oneData: null
};

const MachineSlicer = createSlice({
    name: "machine",
    initialState,
    reducers: {
        cleanStateAfterCreated: (state) => {
            state.addmachine = null
        },
        machineClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddMachineData.fulfilled, (state, action) => {
                state.addmachine = action.payload;
                state.status = "OK";
                state.loading = false;
                state.success = true;
            })
            .addCase(AddMachineData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddMachineData.rejected, (state, action) => {
                state.error = action.payload;
                state.data = null;
                state.loading = false;
                state.status = "BAD";
            })
            .addCase(MachineData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "OK";
                state.loading = false;
                state.success = true;
            })
            .addCase(MachineData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(MachineData.rejected, (state, action) => {
                state.error = action.payload;
                state.data = null;
                state.loading = false;
                state.status = "BAD";
            })
            .addCase(oneMachineData.fulfilled, (state, action) => {
                state.oneData = action.payload;
                state.status = "OK";
                state.loading = false;
                state.success = true;
            })
            .addCase(oneMachineData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(oneMachineData.rejected, (state, action) => {
                state.error = action.payload;
                state.oneData = null;
                state.loading = false;
                state.status = "BAD";
            });
    },
});

export const { cleanStateAfterCreated, machineClear } = MachineSlicer.actions;
export default MachineSlicer.reducer;

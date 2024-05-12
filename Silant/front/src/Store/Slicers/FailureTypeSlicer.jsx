import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk для получения данных о типе отказа
export const fetchFailureTypeData = createAsyncThunk(
    "failureType/fetchFailureTypeData",
    async (id, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            // Формируем URL для запроса
            const url = id ? `http://127.0.0.1:8000/api/v1/failureType/${id}` : 'http://127.0.0.1:8000/api/v1/failureType/';

            // Выполняем GET запрос
            const response = await axios.get(url, header);
            return response.data;
        } catch (error) {
            // Обрабатываем ошибку
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Начальное состояние сущности типа отказа
const initialState = {
    failureType: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

// Создаем срез для типа отказа
const failureTypeSlice = createSlice({
    name: "failureType",
    initialState,
    reducers: {
        // Очистка данных о типе отказа
        clearFailureType: () => initialState,
    },
    extraReducers: (builder) => {
        // Обработка успешного завершения запроса
        builder.addCase(fetchFailureTypeData.fulfilled, (state, action) => {
            state.failureType = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        // Обработка начала выполнения запроса
        builder.addCase(fetchFailureTypeData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Обработка ошибки при выполнении запроса
        builder.addCase(fetchFailureTypeData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});

// Экспортируем экшены и редьюсер для использования в Redux
export const { clearFailureType } = failureTypeSlice.actions;
export default failureTypeSlice.reducer;

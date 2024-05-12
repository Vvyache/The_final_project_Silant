import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const header = {
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
    },
};

// Создание асинхронного thunk для входа пользователя
export const UserLogin = createAsyncThunk(
    "auth/userLogin",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                'http://127.0.0.1:8000/api/v1/token',
                { username, password },
                header
            );
            localStorage.setItem("userLogin", username);
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("Authenticated", true);

            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Получение токена доступа из локального хранилища
const accessToken = localStorage.getItem("accessToken") || null;

// Начальное состояние
const initialState = {
    loading: false,
    accessToken,
    error: null,
    success: false,
    status: null,
    is_Auth: !!accessToken, // Используем !! для приведения к булевому типу
};

// Создание среза
const AuthSlicer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            // Удаление всех данных из локального хранилища при выходе
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userLogin");
            localStorage.removeItem("user_firstname");
            localStorage.removeItem("Authenticated");
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(UserLogin.fulfilled, (state, action) => {
            state.accessToken = action.payload;
            state.status = 'OK';
            state.loading = false;
            state.success = true;
            state.is_Auth = true;
        });

        builder.addCase(UserLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(UserLogin.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});

// Экспорт экшенов и редюсера
export const { logout } = AuthSlicer.actions;
export default AuthSlicer.reducer;

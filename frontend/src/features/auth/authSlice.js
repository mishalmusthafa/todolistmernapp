import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isSuccess = true;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isSuccess = true;
            })

            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            });
    },
});

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// logout user
export const logout = createAsyncThunk('auth/logout', () => {
    console.log('logging out');
    authService.logout();
    console.log('logged out');
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

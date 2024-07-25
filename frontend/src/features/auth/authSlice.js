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
            });
    },
});

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        console.log(
            'got user from frontend and sending to registerService by asyncThunk',
            user
        );
        try {
            console.log('TRY to send to authservice.register');
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(
                'got an error from the backend when fetching:',
                message
            );

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const { reset } = authSlice.actions;
export default authSlice.reducer;

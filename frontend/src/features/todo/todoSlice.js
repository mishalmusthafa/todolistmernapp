import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import todoService from './todoService';

const initialState = {
    todos: [],
    todo: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

// Create user todo
export const createTodo = createAsyncThunk(
    'todo/create',
    async (todoData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            console.log('Creating todos');
            console.log('Todo data', todoData);
            return await todoService.createTodo(todoData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user todos
export const getTodos = createAsyncThunk(
    'todos/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await todoService.getTodos(token);
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

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTodo.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = action.payload;
            });
    },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;

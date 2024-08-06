import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import todoService from './todoService';

const initialState = {
    todos: [],
    todo: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    selectedTodo: {},
    currentTodoId: null,
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

// Get single todo
export const getSingleTodo = createAsyncThunk(
    'todos/getSingle',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await todoService.getSingleTodo(id, token);
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

// Update todo
export const updateTodo = createAsyncThunk(
    'todos/update',
    async ({ todoData, id }, thunkAPI) => {
        try {
            console.log('Getting the data for updata to slice', todoData);
            const token = thunkAPI.getState().auth.user.token;
            return await todoService.updateTodo(todoData, id, token);
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

// Update todo
export const deleteTodo = createAsyncThunk(
    'todos/delete',
    async (id, thunkAPI) => {
        try {
            console.log('Getting the data for updata to slice', id);
            const token = thunkAPI.getState().auth.user.token;
            return await todoService.deleteTodo(id, token);
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

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: (state) => {
            state.todo = {};
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        clearTodos: (state) => {
            state.todos = [];
        },
        setCurrentTodoId: (state, action) => {
            state.selectedTodo =
                state.todos.find((todo) => todo._id === action.payload) || {};
            console.log(state.selectedTodo);
            state.currentTodoId = action.payload;
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
            })
            .addCase(getSingleTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleTodo.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSingleTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todo = action.payload;
            })
            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const updatedTodo = action.payload;
                const index = state.todos.findIndex(
                    (todo) => todo._id === updatedTodo._id
                );
                if (index !== -1) {
                    state.todos[index] = updatedTodo;
                }
                state.selectedTodo = updatedTodo;
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = state.todos.filter(
                    (todo) => todo._id !== action.payload.id
                );
            });
    },
});

export const { reset, setCurrentTodoId } = todoSlice.actions;
export default todoSlice.reducer;

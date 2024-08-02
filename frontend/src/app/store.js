import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todoReducer from '../features/todo/todoSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer,
        filter: filterReducer,
    },
});

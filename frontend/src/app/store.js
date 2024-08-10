import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todoReducer from '../features/todo/todoSlice';
import activeViewReducer from '../features/activeView/activeViewSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer,
        activeView: activeViewReducer,
        sidebar: sidebarReducer,
    },
});

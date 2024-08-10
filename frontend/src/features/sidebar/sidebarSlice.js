import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
        setSidbarOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { setSidbarOpen, toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;

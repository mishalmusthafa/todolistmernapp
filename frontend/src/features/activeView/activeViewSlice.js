import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedView: 'All',
};

const activeViewSlice = createSlice({
    name: 'activeView',
    initialState,
    reducers: {
        setSelectedView: (state, action) => {
            state.selectedView = action.payload;
        },
    },
});

export const { setSelectedView } = activeViewSlice.actions;
export default activeViewSlice.reducer;

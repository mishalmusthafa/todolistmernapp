import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedView: 'All',
    lastSelectedView: 'All',
};

const activeViewSlice = createSlice({
    name: 'activeView',
    initialState,
    reducers: {
        setSelectedView: (state, action) => {
            state.selectedView = action.payload;
        },
        setLastSelectedView: (state, action) => {
            console.log('Setting the last select view to', action.payload);
            state.lastSelectedView = action.payload;
        },
    },
});

export const { setSelectedView, setLastSelectedView } = activeViewSlice.actions;
export default activeViewSlice.reducer;

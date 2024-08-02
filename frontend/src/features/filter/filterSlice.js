import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedFilter: 'All',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSelectedFilter: (state, action) => {
            state.selectedFilter = action.payload;
        },
    },
});

export const { setSelectedFilter } = filterSlice.actions;
export default filterSlice.reducer;

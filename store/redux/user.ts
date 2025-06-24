import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
    isDarkTheme: boolean;
}

const initialState: UserState = {
    isDarkTheme: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleThemeVal(state, action) {
            state.isDarkTheme = action.payload;
        },
    },
});

export const toggleThemeVal = userSlice.actions.toggleThemeVal;
export default userSlice.reducer;
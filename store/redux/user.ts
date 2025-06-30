import { CustomTheme, DarkTheme } from '@/constants/Colors';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
    isDarkTheme: boolean;
    currentTheme: CustomTheme;
}

const initialState: UserState = {
    isDarkTheme: false,
    currentTheme: DarkTheme,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleThemeVal(state, action) {
            state.isDarkTheme = action.payload;
        },
        toggleCurrentTheme(state, action) {
            state.currentTheme = action.payload;
        },
    },
});

export const toggleThemeVal = userSlice.actions.toggleThemeVal;
export const toggleCurrentTheme = userSlice.actions.toggleCurrentTheme;
export default userSlice.reducer;
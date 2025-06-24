import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user";


export const store = configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer,
    },
});


// Define the RootState type based on your store's reducer structure
export type RootState = ReturnType<typeof store.getState>;
 
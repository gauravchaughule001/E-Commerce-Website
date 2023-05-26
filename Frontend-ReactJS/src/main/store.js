import { configureStore } from '@reduxjs/toolkit';
import prodReducer from '../reducers/prod.reducer';
import authReducer from '../reducers/auth.reducer';

export const store=configureStore({
    reducer: {
        product : prodReducer,
        auth: authReducer
    }
})
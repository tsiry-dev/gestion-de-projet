import { createSlice } from "@reduxjs/toolkit";

type User = {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

type InitialStateType = {
    user: User | null;
    token: string | null;
    isPendingSession: boolean;
}

const initialState: InitialStateType = {
    user: null,
    token: null,
    isPendingSession: true
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
       handleSetSessionStore: (state, action) => {
        console.log(action.payload);
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isPendingSession = false;
       },
       handleSetUserStore: (state, action) => {
          state.user = action.payload;
       },
       handleSetTokenStore: (state, action) => {
          state.token = action.payload;
       },
       handleClearSessionStore: (state) => {
          state.user = null;
          state.token = null;
       },
       handleSetPendingSession: (state) => {
          state.isPendingSession = true;
       },
        handleClearPendingSession: (state) => {
        state.isPendingSession = false;
        }
    },
})

// Action creators
export const { 
    handleSetSessionStore,
    handleSetUserStore, 
    handleSetTokenStore, 
    handleClearSessionStore,
    handleSetPendingSession,
    handleClearPendingSession
} = sessionSlice.actions;

// Reducer
export default sessionSlice.reducer;
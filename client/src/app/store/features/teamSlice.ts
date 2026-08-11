import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    removeTeamId: string | null;
    isReassignTeam: boolean;
}

const initialState: InitialState = {
    removeTeamId: null,
    isReassignTeam: false
}

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
     setRemoveTeamIdStore: (state, action) => {
         state.removeTeamId = action.payload;
     },
     setReassignTeamStore: (state) => {
         state.isReassignTeam = true
     },
  }
});

export const { 
  setRemoveTeamIdStore,
  setReassignTeamStore
} = teamSlice.actions;

// Reducer
export default teamSlice.reducer;
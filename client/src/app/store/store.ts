import { configureStore } from '@reduxjs/toolkit';
import projecReducer from "./features/projectSlice";
import taskReducer from "./features/taskSlice";
import sessionSlice  from './features/sessionSlice.store';


export const store = configureStore({
  reducer: {
     projects: projecReducer,
     tasks: taskReducer,
     session: sessionSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
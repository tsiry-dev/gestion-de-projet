import { configureStore } from '@reduxjs/toolkit';
import projecReducer from "./features/projectSlice";
import taskReducer from "./features/taskSlice";


export const store = configureStore({
  reducer: {
     projects: projecReducer,
     tasks: taskReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
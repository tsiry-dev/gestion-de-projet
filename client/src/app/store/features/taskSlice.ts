// features/roomSlice.ts
import type { TaskType } from '@/modules/tasks/type';
import { createSlice } from '@reduxjs/toolkit'

type InitialStateType = {
   taskDetail: TaskType | null;
   isCreateTask: boolean;
   deleteTaskIds: string[];
   isMoveTask: any | null;
   taskEdit: TaskType | null,
   reassignTaskId: string | null; 
}

const initialState: InitialStateType = {
   taskDetail: null,
   isCreateTask: false,
   deleteTaskIds: [],
   isMoveTask: null,
   taskEdit: null,
   reassignTaskId: null
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    handleSetTaskDetail: (state, action) => {
      state.taskDetail = action.payload 
    },
    handleToggleCreateTask: (state) => {state.isCreateTask = !state.isCreateTask},
    handleCreateTask: (state) => {state.isCreateTask = true},
    handleCloseCreateTask: (state) => {state.isCreateTask = false},
    handleDeleteAllTask: (state, action) => {
       if(state.deleteTaskIds.includes(action.payload)) {
         state.deleteTaskIds = state.deleteTaskIds.filter(id => id !== action.payload);
       }else {
          state.deleteTaskIds.push(action.payload)
       }
    },
    handleDeleteTaskInStore: (state, action) => {
         state.deleteTaskIds = state.deleteTaskIds.filter(id => id !== action.payload);
    },
    handleResetDeleteTaskIds: (state) => { state.deleteTaskIds = [] },
    handleCreateMoveTask: (state, action) => {
      state.isMoveTask = action.payload;
    },
    handleResetMoveTask: (state) => {
      state.isMoveTask = null;
    },
    handleEditTaskTitle:  (state, action) => {
       state.taskEdit = action.payload;
    },
    handleResetEditTask: (state) => {state.taskEdit = null} ,
    setReassignTaskTeamId: (state, action) => {state.reassignTaskId = action.payload},
    removeReassignTaskTeamId: (state) => {state.reassignTaskId = null}
  },
})

// Action creators
export const { 
    setReassignTaskTeamId,
    removeReassignTaskTeamId,
   handleSetTaskDetail,
   handleCreateTask,
   handleCloseCreateTask,
   handleToggleCreateTask,
   handleDeleteAllTask,
   handleResetDeleteTaskIds,
   handleDeleteTaskInStore,
   handleCreateMoveTask,
   handleResetMoveTask,
   handleEditTaskTitle,
   handleResetEditTask
} = taskSlice.actions

// Exporter le reducer par défaut
export default taskSlice.reducer
// features/roomSlice.ts
import type { Project } from '@/modules/projects/type'
import { createSlice } from '@reduxjs/toolkit'

type InitialStateType = {
  deletedIds: string[],
  editProject: Project | null;
  isUpdateProject: boolean;
  isCreateProject: boolean;
  projectDetailId: string | null;
}

const initialState: InitialStateType = {
    deletedIds: [],
    editProject: null,
    isUpdateProject: false,
    isCreateProject: false,
    projectDetailId: null
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    remove: (state, action) => {
       if(state.deletedIds.includes(action.payload)) {
         state.deletedIds = state.deletedIds.filter(id => id !== action.payload);
       }else {
          state.deletedIds.push(action.payload)
       }
    },
    resetDeletedIds: (state) => {
       state.deletedIds = [];
    },
    edit: (state, action) => {
      state.editProject = action.payload;
    },
    resetEdit: (state) => {
      state.editProject = null;
    },
    handleToggleEditProject: (state, action) => {
      if(action.payload) {
         edit(action.payload);
      }else {
        resetEdit();
      }
    },
    onOpeUpdateProject: (state) => { state.isUpdateProject = true},
    onCloseUpdateProject: (state) => { state.isUpdateProject = false},
    onOpeCreateProject: (state) => { state.isCreateProject = true},
    onCloseCreateProject: (state) => { state.isCreateProject = false},
    onOpenProjectDetail: (state, action) => {state.projectDetailId = action.payload},
    onCloseProjectDetail: (state) => {state.projectDetailId = null}
    
  },
})

// Action creators
export const { 
  remove, 
  resetDeletedIds, 
  edit, 
  resetEdit, 
  onOpeUpdateProject, 
  onCloseUpdateProject ,
  onOpeCreateProject,
  onCloseCreateProject,
  onOpenProjectDetail,
  onCloseProjectDetail,
  handleToggleEditProject
} = projectSlice.actions

// Exporter le reducer par défaut
export default projectSlice.reducer
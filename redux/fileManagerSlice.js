import { createSlice } from '@reduxjs/toolkit';

// FileManager Slice
const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState: {
    currentDirectory: '/',
    fileSystem: {
      '/': {
        type: 'directory',
        children: ['home', 'etc', 'usr','bin', 'var', 'opt'],
      },
      '/home': {
        type: 'directory',
        children: ['user1', 'user2'],
      },
      '/etc': {
        type: 'directory',
        children: [],
      },
      '/usr': {
        type: 'directory',
        children: [],
      },
      '/home/user1': {
        type: 'directory',
        children: [],
      },
      '/home/user2': {
        type: 'directory',
        children: [],
      },
      '/bin': {
        type: 'directory',
        children: [],
      }, 
      '/var': {
        type: 'directory',
        children: [],
      },
      '/opt': {
        type: 'directory',
        children: [],
      },
    },
  },
  reducers: {
    setCurrentDirectory: (state, action) => {
      const newDirectory = action.payload;
      state.currentDirectory = newDirectory;
    },
    createFolder: (state, action) => {
      const newFolderName = action.payload;
      const newFolderPath = `${state.currentDirectory}/${newFolderName}`;
      state.fileSystem[newFolderPath] = {
        type: 'directory',
        children: [],
      };
    },
    deleteItem: (state, action) => {
      const itemToDelete = action.payload;
      delete state.fileSystem[itemToDelete];
    },
  },
});

// Action creators generated from the slice
export const { setCurrentDirectory, createFolder, deleteItem } = fileManagerSlice.actions;

// Reducer
export default fileManagerSlice.reducer;

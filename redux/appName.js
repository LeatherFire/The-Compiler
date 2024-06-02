import { createSlice } from '@reduxjs/toolkit';

const appName = createSlice({
  name: 'popupstate',
  initialState: {
    name: 'Finder',
  },
  reducers: {
    updateMenuName: (state, action) => {
      const {name} = action.payload;
      state.name = name;
    },
  },
});

export const { updateMenuName } = appName.actions;
export default appName.reducer;

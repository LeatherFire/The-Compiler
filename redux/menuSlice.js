import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    id: 0,
    x: 0,
    y: 0,
    isOn:false,
  },
  reducers: {
    updateItemPosition: (state, action) => {
      const { id, x, y, isOn} = action.payload;
      if (id==='file') {
        console.log('You clicked file')
        state.id = id;
        state.x=105;
        state.y=30;
        state.isOn =  isOn;
      }
      if (id==='edit') {
        console.log('You clicked edit')
        state.id = id;
        state.x=145;
        state.y=30;
        state.isOn =  isOn;
      }
      if (id==='apple') {
        console.log('You clicked apple')
        state.id = id;
        state.x=5;
        state.y=30;
        state.isOn =  isOn;
      }
      if (id==='go') {
        console.log('You clicked go')
        state.id = id;
        state.x=240;
        state.y=30;
        state.isOn =  isOn;
      }
      if (id==='view') {
        console.log('You clicked view')
        state.id = id;
        state.x=190;
        state.y=30;
        state.isOn =  isOn;
      }
      if (id==='window') {
        console.log('You clicked window')
        state.id = id;
        state.x=280;
        state.y=30;
        state.isOn =  isOn;
      }
      if (id==='finder') {
        console.log('You clicked finder')
        state.id = id;
        state.x=45;
        state.y=30;
        state.isOn =  isOn;
      }
      if (id==='help') {
        console.log('You clicked help')
        state.id = id;
        state.x=350;
        state.y=30;
        state.isOn =  isOn;
      }
      state.id = id;
      state.isOn =  isOn;
    },
  },
});

export const { updateItemPosition } = menuSlice.actions;
export default menuSlice.reducer;

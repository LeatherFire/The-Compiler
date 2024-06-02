import { createSlice } from '@reduxjs/toolkit';

const zindex = createSlice({
  name: 'zindex',
  initialState: {
    zindex: {
      terminal: 1,
      codeEditor: 1,
      fileexplorer: 1,
      finder: 1,
      codeBrowser: 1,
      favorities: 1,
      theMainCode: 1,
      output : 1,
    }, // Terminal veya CodeEditor bileşenlerinin z-index değerlerini tutacak obje
  },
  reducers: {
    updateZIndex: (state, action) => {
      const { name } = action.payload;
      // Tüm bileşenlerin z-index değerini 0 olarak ayarla
      Object.keys(state.zindex).forEach(key => {
        state.zindex[key] = 0;
      });
      // Payload içinde gelen bileşenin z-index değerini 1 olarak ayarla
      state.zindex[name] = 1;
    },
  },
});

export const { updateZIndex } = zindex.actions;
export default zindex.reducer;

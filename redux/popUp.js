import { createSlice } from '@reduxjs/toolkit';

const popUp = createSlice({
  name: 'popUp',
  initialState: {
    apps: {},        // Her bir uygulama için ayrı bir dizi tutacak obje yapısı
    isOpen: false,
  },
  reducers: {
    openPopupState: (state, action) => {
      const { id, application } = action.payload;
      if (id !== undefined) {
        if (!state.apps[application]) {
          // Eğer uygulama adına sahip bir dizi yoksa, oluştur
          state.apps[application] = [id];
        } else {
          // Eğer zaten varsa, mevcut dizinin sonuna ekle
          state.apps[application].push(id);
        }
        state.isOpen = true;
      }
    },
    closePopupState: (state, action) => {
      const { id } = action.payload;
      // Her bir uygulama dizisinden ilgili ID'yi filtreleyerek çıkar
      for (const app in state.apps) {
        state.apps[app] = state.apps[app].filter((appId) => appId !== id);
      }
      state.isOpen = false;
    },
  },
});

export const { openPopupState, closePopupState } = popUp.actions;
export default popUp.reducer;

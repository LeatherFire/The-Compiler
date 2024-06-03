import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import appNameReducer from './appName';
import popUpReducer from './popUp';
import zindexReducer from './zindex';
import fileManagerReducer from './fileManagerSlice';
import UserReducer from './UserDataSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    appName: appNameReducer,
    popUp: popUpReducer,
    zindex: zindexReducer,
    fileManager: fileManagerReducer,
    UserReducer: UserReducer,
  },
});

export default store;

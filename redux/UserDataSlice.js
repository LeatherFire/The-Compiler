import { configureStore, createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    Name: 'Yiğitcan',
    Surname: 'Uçar',
    Email: 'ucar.yigitcan2003@gmail.com',
    Job: 'Computer Engineer',
    City: 'Istanbul',
    Country: 'Turkey',
    Phone: '+90 555 555 55 55',
    Hobbies: 'Programming, Music, Reading, Gaming'
  },
  reducers: {
    updateUserData2: (state, action) => {
      state = action.payload;
    },
  },
});

export const { updateUserData2 } = userDataSlice.actions;
export default userDataSlice.reducer;
// src/redux/roleSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: 'annotator',
  reducers: {
    setRole: (state, action) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('role', action.payload);
      }
      return action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
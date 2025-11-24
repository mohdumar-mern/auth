import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  status: 'idle'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken } = action.payload;
      state.user = user ?? state.user;
      state.accessToken = accessToken ?? state.accessToken;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
    }
  }
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;

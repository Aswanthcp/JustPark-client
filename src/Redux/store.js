import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
    setLogin: (state, action) => {
      state.client = action.payload.client;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.client = null;
      state.token = null;
    },
    setCord: (state, action) => {
      state.client = action.payload.client;
    },
  },
});

export const { setMode, setLogin, setLogout, setCord } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("email"),
  name: localStorage.getItem("name"),
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    removeUser(state) {
      state.email = null;
      state.name = null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer

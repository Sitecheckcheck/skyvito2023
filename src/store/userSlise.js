import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("email"),
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
      state.surname = action.payload.surname;
      state.city = action.payload.city;
      state.avatar = action.payload.avatar;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.sells_from = action.payload.sells_from;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    removeUser(state) {
      state.email = null;
      state.name = null;
      state.surname = null;
      state.city = null;
      state.avatar = null;
      state.id = null;
      state.phone = null;
      state.sells_from = null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

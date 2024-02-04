import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const {
        email,
        name,
        surname,
        city,
        avatar,
        id,
        phone,
        sells_from,
        access_token,
        refresh_token,
      } = action.payload;
      state.email = email;
      state.name = name;
      state.surname = surname;
      state.city = city;
      state.avatar = avatar;
      state.id = id;
      state.phone = phone;
      state.sells_from = sells_from;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
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

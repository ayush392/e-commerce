import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const data = localStorage.getItem("eCommerceUser");
    if (data) {
      const { id, name, email, token } = data;
      return { id, name, email, token };
    }
    return { id: null, name: null, email: null, token: null };
  },
  reducers: {
    setCredentials(state, action) {
      const { id, name, email, token } = action.payload;
      localStorage.setItem(
        "eCommerceUser",
        JSON.stringify({ id, name, email, token })
      );
      state.id = id;
      state.name = name;
      state.email = email;
      state.token = token;
    },
    logout(state) {
      localStorage.removeItem("eCommerceUser");
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectUserId = (state) => state.auth.user;
export const selectUserName = (state) => state.auth.name;
export const selectUserEmail = (state) => state.auth.email;
export const selectToken = (state) => state.auth.token;

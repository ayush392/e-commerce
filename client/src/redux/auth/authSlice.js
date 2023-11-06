import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const data = localStorage.getItem("user");
    // const { id, token } = JSON.parse(data);
    if (data) {
      return { id: data.id, token: data.token };
    }
    return { id: null, token: null };
  },
  reducers: {
    setCredentials(state, action) {
      const { userId, token } = action.payload;
      localStorage.setItem("user", JSON.stringify({ id: userId, token }));
      state.user = userId;
      state.token = token;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

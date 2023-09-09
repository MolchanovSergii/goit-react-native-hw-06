import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false }, // начальное состояние
  reducers: {}, // нет действий
});

export const authReducer = authSlice.reducer;

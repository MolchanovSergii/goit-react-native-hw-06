import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: [], // начальное состояние - пустой массив
  reducers: {}, // нет действий
});

export const postsReducer = postsSlice.reducer;

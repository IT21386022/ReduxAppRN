import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "user1@gmail.com", role: "user" },
  { id: "1", name: "user2@gmail.com", role: "user" },
  { id: "2", name: "admin1@gmail.com", role: "admin" },
  { id: "3", name: "admin2@gmail.com", role: "admin" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      return [...state, action.payload]; // Retornar la nueva matriz con el nuevo usuario
    },
  },
});

export const { addUser, setUserData } = userSlice.actions;

export default userSlice.reducer;

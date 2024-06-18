import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: 0,
  appointments: [],
};

const gymSlice = createSlice({
  name: "gym",
  initialState,
  reducers: {
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
    updateAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    resetUserId: (state) => {
      state.userId = 0;
      state.appointments = [];
    },
  },
});

export const { updateUserId, updateAppointments, resetUserId } =
  gymSlice.actions;

export default gymSlice.reducer;

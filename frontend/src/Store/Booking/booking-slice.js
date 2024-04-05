import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  bookingDetails: {},
  loading: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    sendBookingRequest(state) {
      state.loading = true;
    },

    setBookings: (state, action) => {
      state.bookings = action.payload;
      state.loading = false;
    },

    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload.bookings;
    },

    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
  },
});

export const { setBookings, addBooking, setBookingDetails } =
  bookingSlice.actions;

  export default bookingSlice;

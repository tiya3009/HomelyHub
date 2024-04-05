import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  //slice name
  name: "property",
  //initial state for property slice
  //parameters used to search
  //error state
  //loading state or property
  initialState: {
    properties: [],
    totalProperties: 0,
    searchParams: {},
    error: null,
    loading: false,
  },
  //reducer function to handle different functions
  reducers: {
    //set loading state to true
    getRequest(state) {
      state.loading = true;
    },

    //action to update properties state with fetch data
    getProperties(state, action) {
      state.properties = action.payload.data;
      state.totalProperties = action.payload.all_properties;
      state.loading = false;
    },

    //action to update search parameters
    updateSearchParams: (state, action) => {
      state.searchParams =
        Object.keys(action.payload).length === 0
          ? {}
          : { ...state.searchParams, ...action.payload };
    },

    //action to update error state
    getErrors(state, action) {
      state.error = action.payload;
    },
  },
});

export const propertyAction = propertySlice.actions;

export default propertySlice;
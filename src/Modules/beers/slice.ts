import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { Beer } from "../../Interface/beer";

const beersAdapder = createEntityAdapter<Beer>({
  selectId: (beer) => beer.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const beersSlice = createSlice({
  name: "beers",
  initialState: {
    ...beersAdapder.getInitialState(),
    isLoading: false,
    error: null,
  },
  reducers: {
    load: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadSuccess: (state, {payload: beers}) => {
      state.isLoading = false;
      beersAdapder.setMany(state, beers);
    },
    loadFail: (state, {payload: error}) => {
      state.isLoading = false;
      state.error = error;
    },
  },
})

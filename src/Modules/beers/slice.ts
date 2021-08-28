import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Beer } from "../../Interface/beer";
import { tableColumns } from "./columns";

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
    columnIndice: tableColumns.map((_, i) => i),
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
    setColumnIndice: (state, {payload: indice}) => {
      state.columnIndice = indice;
    }
  },
})

export const beersSelector = {
  arr: createSelector(
    (state: RootState) => state.beers,
    ({entities, ids}) => {
      return ids
        .map((id) => entities[id])
        .filter((beer) => !!beer)
        // spread object to make it extensible by material table
        .map((beer) => ({...beer})) as Beer[]
    }
  ),
}
import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Beer } from "../../Interface/beer";
import { tableColumns } from "../../Pages/BeerList/columns";

const beersAdapder = createEntityAdapter<Beer>({
  selectId: (beer) => beer.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

/** for filter id */
let filterUniCount = 4;

export const beersSlice = createSlice({
  name: "beers",
  initialState: {
    ...beersAdapder.getInitialState(),
    isLoading: false,
    error: null as any,
    columnIndice: tableColumns.map((_, i) => i),
    filters: [
      {abv: {from: 0, to: 5}, id: 0},
      {abv: {from: 5, to: 10}, id: 1},
      {abv: {from: 10, to: 15}, id: 2},
      {abv: {from: 15, to: 55}, id: 3}
    ] as WithFilterInfo<BeerFilter>[]
  },
  reducers: {
    load: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadSuccess: (state, {payload: beers}: PayloadAction<Beer[]>) => {
      state.isLoading = false;
      beersAdapder.setMany(state, beers);
    },
    loadFail: (state, {payload: error}: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = error;
    },
    setColumnIndice: (state, {payload: indice}) => {
      state.columnIndice = indice;
    },
    addFilter: (state, {payload: filter}: PayloadAction<BeerFilter>) => {
      state.filters.push({...filter, id: filterUniCount, enabled: false});
      filterUniCount += 1;
    },
    removeFilter: (state, {payload: id}: PayloadAction<number>) => {
      state.filters = state.filters.filter((f) => f.id !== id);
    },
    toggleFilter: (state, {payload: id}: PayloadAction<number>) => {
      state.filters.forEach((f) => f.id === id ? f.enabled = !f.enabled : f.enabled)
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
  filteredArr: createSelector(
    (state: RootState) => state.beers,
    ({entities, ids, filters}) => {
      const enabledFilters = filters.filter((f) => f.enabled);

      function isTarget(b: Beer) {
        if (enabledFilters.length === 0) return true;

        let hasAnyIncident = false;

        enabledFilters.forEach((f) => {
          if (b.abv >= f.abv.from && b.abv <= f.abv.to) {
            hasAnyIncident = true;
          }
        })

        return hasAnyIncident;
      }

      return ids
        .map((id) => entities[id])
        .filter((beer) => {
          if (beer === undefined) return;
          return isTarget(beer);
        })
        // spread object to make it extensible by material table
        .map((beer) => ({...beer})) as Beer[]
    }
  ),
  abvFilters: createSelector(
    (state: RootState) => state.beers.filters,
    (filters) => {
      return filters.map((f) => ({...f.abv, id: f.id, enabled: f.enabled}))
    }
  ),
  raw: createSelector((state: RootState) => state.beers, (beers) => beers),
}

export type RangeFilter = {from: number, to: number}

export type BeerFilter = {
  abv: RangeFilter
}

type FilterInfo = {id: number, enabled: boolean}

export type WithFilterInfo<T extends object> = T & FilterInfo;
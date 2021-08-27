import { call, put, takeLatest } from "@redux-saga/core/effects";
import { Beer } from "../../Interface/beer";
import API from "./api";
import { beersSlice } from "./slice";

function* fetchBeers() {
  try {
    const beers: Beer[] = yield call(API.fetchBeers);
    yield put(beersSlice.actions.loadSuccess(beers));
  } catch (e) {
    yield put(beersSlice.actions.loadFail(e))
  }
}

export function* watchFetchBeers() {
  yield takeLatest(beersSlice.actions.load, fetchBeers)
}


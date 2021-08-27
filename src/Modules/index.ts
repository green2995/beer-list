import { combineReducers } from "redux";
import { all, takeEvery } from "redux-saga/effects";
import { watchFetchBeers, beersSlice } from "./beers"

//watcher saga -> actions -> worker saga
// import loading from "./loading";
import { enableES5 } from "immer";

enableES5();

const rootReducer = combineReducers({
  beers: beersSlice.reducer,
});

// export default rootReducer;
export default rootReducer;

//wathcer saga
export function* rootSaga() {
  yield all([
    watchFetchBeers()
  ]);
}

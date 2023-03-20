import { combineReducers } from "@reduxjs/toolkit";
import { reducer as auth } from "./../modules/Auth/reducer";

const reducers = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;

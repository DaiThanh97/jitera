import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEY } from "../../utils/constants";
import { IAuth } from "./types";

export interface AuthState {
  id: string;
  email: string;
  nickname: string;
  balance: number;
}

const initState: AuthState = {
  id: "",
  email: "",
  nickname: "",
  balance: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<IAuth>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname || "";
      state.balance = action.payload.balance;
      localStorage.setItem(STORAGE_KEY.USER_TOKEN, action.payload.accessToken);
    },
    user: (
      state: AuthState,
      action: PayloadAction<Omit<IAuth, "accessToken">>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname || "";
      state.balance = action.payload.balance;
    },
    deposit: (
      state: AuthState,
      action: PayloadAction<Pick<IAuth, "balance">>
    ) => {
      state.balance = action.payload.balance;
    },
  },
});

export const { actions, reducer } = authSlice;

export default authSlice;

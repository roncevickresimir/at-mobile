import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userService } from "../../services/userService";
import IUser from "../interfaces/IUser";
import ILoginResponse from "../interfaces/ILoginResponse";

interface ILoginPayload {
  token: string;
  user: IUser;
}

interface IState {
  token: string | null;
  user: IUser | null;
  serverVersion: string | null;
}

const initialState: IState = {
  token: null,
  user: null,
  serverVersion: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<ILoginPayload>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
    setServerVersion(state, action: PayloadAction<string>) {
      state.serverVersion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userService.endpoints.loginUser.matchFulfilled,
      (state, action: PayloadAction<ILoginResponse>) => {
        const { token, username, email, id } = action.payload;
        state.token = token;
        state.user = { id, username, email };
      }
    );
  },
});

export const { login, logout, setServerVersion } = authSlice.actions;
export default authSlice.reducer;

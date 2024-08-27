import { createSlice, PayloadAction } from '@reduxjs/toolkit';



import { IUser } from '~interfaces';
import { userService } from '~services';

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
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<ILoginPayload>) {
      // state.token = action.payload.token;
      // state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userService.endpoints.loginUser.matchFulfilled,
      (state, action: PayloadAction<{ User: IUser; token: string }>) => {
        const { token } = action.payload;
        state.token = token;
        state.user = action.payload.User;
      },
    );
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
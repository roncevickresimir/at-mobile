import { createSlice, PayloadAction } from '@reduxjs/toolkit';



import { IUser } from '~interfaces';
import { userService } from '~services';


interface IState {
  user: IUser | null;
}

interface ILoginPayload {
  token: string;
  user: IUser;
}

const initialState: IState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
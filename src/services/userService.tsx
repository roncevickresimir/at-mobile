import { ILogin, ILoginResponse, IRegister, IRegisterResponse, IUser } from '~interfaces';
import { HttpMethods } from '~lookups';



import { baseService } from './baseService';


const URL = '/users';

export const userService = baseService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation<IRegisterResponse, IRegister>({
      query: (body) => ({
        url: `${URL}/register`,
        method: HttpMethods.POST,
        body,
      }),
    }),
    loginUser: builder.mutation<ILoginResponse, ILogin>({
      query: (body) => ({
        url: `${URL}/login`,
        method: HttpMethods.POST,
        body,
      }),
    }),
    getUser: builder.query<IUser, string>({
      query: (userId) => ({
        url: `${URL}/${userId}`,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLazyGetUserQuery } = userService;
import { baseService } from "./baseService";
import { HttpMethods } from "../app/lookups/httpMethods";
import ILogin from "../app/interfaces/ILogin";
import ILoginResponse, {
  IRegisterResponse,
} from "../app/interfaces/ILoginResponse";
import IRegister from "../app/interfaces/IRegister";
import IUser from "../app/interfaces/IUser";

const URL = "users";

export const userService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IRegisterResponse, IRegister>({
      query: (body) => ({
        url: `${URL}/registerEndUser`,
        method: HttpMethods.POST,
        body,
      }),
    }),
    loginUser: builder.mutation<ILoginResponse, ILogin>({
      query: (body) => ({
        url: `${URL}/loginEndUser`,
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

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyGetUserQuery,
} = userService;

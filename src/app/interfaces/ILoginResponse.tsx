import { IUser } from './IUser';


export interface ILoginResponse {
  User: IUser;
  token: string;
}
export interface IRegisterResponse {
  id: string;
  username: string;
  email: string;
  password: string;
}
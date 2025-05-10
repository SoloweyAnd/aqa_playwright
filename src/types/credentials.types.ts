import { IUserFromResponse } from "types/user.types";
import { IResponseFields } from "./api.types";

export interface ICredentials {
  username: string;
  password: string;
}

export interface ILoginResponse extends IResponseFields {
  User: IUserFromResponse;
}

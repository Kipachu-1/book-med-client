import { TRole } from "./common";

export type TLoginBody = {
  email: string;
  password: string;
};

export type TRegisterBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: TRole;
  repeat_password: string;
  IIN: string;
};

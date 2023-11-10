import { E164Number } from "libphonenumber-js/min";

export type Login = {
  username: string;
  password: string;
};

export type UserAccount = {
  id: number;
  username: string;
  password: string;
  userid: number;
};
export type Signup = {
  id: number | undefined;
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  telephon: E164Number;
  address: string;
  username: string;
  password: string;
  confirmedPassword: string;
};

export type UserContext = {
  userId: number | undefined;
  setUserId: (value: number | undefined) => void;
};

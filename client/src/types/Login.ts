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
  userId: number | null;
  setUserId: (value: number | null) => void;
};

export type validation = {
  result: boolean;
  username: string;
  userId: number;
};

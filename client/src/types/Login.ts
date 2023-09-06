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
  birthday: string;
  email: string;
  telephone: string;
  address: string;
};

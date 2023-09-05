export type FolderList = {
  id: number | undefined;
  name: string;
  userId: number;
  order_value: number;
}[];

export type UserAccount = {
  id: number;
  user_name: string;
  user_password: string;
  user_id: number;
};

export type AccountFromUser = {
  username: string;
  password: string;
};

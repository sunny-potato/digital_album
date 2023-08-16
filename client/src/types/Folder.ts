export type Folder = {
  id: number | undefined;
  name: string;
  user_id: number;
  order_value: number;
};

export type Image = {
  id: number;
  origianl_name: string;
  encoding: string;
  size: number;
  type: string;
  uuid: string;
  folder_id?: number;
};

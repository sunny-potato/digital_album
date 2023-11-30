import sql from "../db";

export async function getFolder(userId: number) {
  return await sql`select * from folder where user_id=${userId}`;
}

export async function createFolder(folder: {
  name: string;
  order_value: number;
  user_id: number;
}) {
  return await sql`insert into folder(name, order_value, user_id) values(${folder.name}, ${folder.order_value}, ${folder.user_id}) returning id`;
}

export async function updateFolder(folder: {
  id: number;
  name: string;
  order_value: number;
}) {
  return await sql`
      update folder
      set name=${folder.name},
      order_value=${folder.order_value}
      where id=${folder.id}
      returning *
    `;
}

export async function deleteFolder(id: number) {
  return await sql`delete from folder where id=${id} `;
}

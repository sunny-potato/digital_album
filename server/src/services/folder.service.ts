import sql from "../configs/db.config";

export async function getFolder(userId: number) {
  return await sql`select * from folder where user_id=${userId}`;
}

export async function createFolder(folder: {
  name: string;
  order_value: number;
  user_id: number;
  created_at: Date;
}) {
  return await sql`insert into folder(name, order_value, user_id, created_at) values(${folder.name}, ${folder.order_value}, ${folder.user_id}, ${folder.created_at}) returning id`;
}

export async function updateFolder(folder: {
  id: number;
  name: string;
  order_value: number;
  created_at: Date;
}) {
  return await sql`
      update folder
      set name=${folder.name},
      order_value=${folder.order_value},
      created_at=${folder.created_at}
      where id=${folder.id}
      returning *
    `;
}

export async function deleteFolder(id: number) {
  return await sql`delete from folder where id=${id} `;
}

export async function getSortedFoldersByAsc(userId: number, sortBy: string) {
  return await sql`select * from folder where user_id=${userId} order by ${sql(
    sortBy
  )} asc`;
}
export async function getSortedFoldersByDesc(userId: number, sortBy: string) {
  return await sql`select * from folder where user_id=${userId} order by ${sql(
    sortBy
  )} desc`;
}

export async function calculateFolderSize(folderId: number) {
  return await sql`select sum(size) as total from image where folder_id=${folderId}`;
}

export async function updateFoderSize(folderid: number, folderSize: number) {
  return await sql`update folder set size = ${folderSize} where id=${folderid}`;
}

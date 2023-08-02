import { title } from "process";
import sql from "./db";

export async function getImage(id: number) {
  return await sql`select * from images where id=${id}`;
}

export async function postImage(file: Express.Multer.File, uuid: string) {
  try {
    return await sql`insert into image(original_name, encoding, type, size, folder_id, uuid, user_id) 
      values (${file.originalname},${file.encoding},${file.mimetype},${file.size},1, ${uuid}, 1) returning *`;
  } catch (error) {
    console.log(error);
  }
}

export async function getMyAlbum(userId: number) {
  return await sql`select * from album where user_id=${userId}`;
}

export async function createMyAlbum(album: {
  image_uuid: string;
  title: string;
  user_id: number;
}) {
  return await sql`insert into album(image_uuid, title, user_id) values(${
    (album.image_uuid, album.title, album.user_id)
  }) returning id`;
}

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

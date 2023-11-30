import sql from "../db";

export async function getMyAlbum(userId: number) {
  return await sql`select * from album where user_id=${userId}`;
}

export async function createMyAlbum(album: {
  image_uuid: string;
  title: string;
  user_id: number;
}) {
  return await sql`insert into album(image_uuid, title, user_id) values(${album.image_uuid}, ${album.title}, ${album.user_id}) returning id`;
}

export async function updateMyAlbumImage(album: {
  image_uuid: string;
  user_id: number;
}) {
  return await sql`update album set image_uuid=${album.image_uuid} where user_id= ${album.user_id}`;
}

export async function updateMyAlbumTitle(album: {
  title: string;
  user_id: number;
}) {
  return await sql`update album set title=${album.title} where user_id=${album.user_id}`;
}

import sql from "../configs/db.config";

export async function getMyAlbum(userId: number) {
  const result = await sql`SELECT * FROM album where user_id=${userId}`;
  return result;
}

export async function createMyAlbum(album: {
  imageUuid: string;
  title: string;
  userId: number;
}) {
  return await sql`insert into album(image_uuid, title, user_id) values(${album.imageUuid}, ${album.title}, ${album.userId}) returning id`;
}

export async function updateMyAlbumImage(album: {
  imageUuid: string;
  userId: number;
}) {
  return await sql`update album set image_uuid=${album.imageUuid} where user_id= ${album.userId}`;
}

export async function updateMyAlbumTitle(album: {
  title: string;
  userId: number;
}) {
  return await sql`update album set title=${album.title} where user_id=${album.userId}`;
}

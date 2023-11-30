import sql from "../db";

export async function getAllImagesInFolder(folder_id: number) {
  return await sql`select * from image where folder_id=${folder_id}`;
}

export async function postImage(
  file: Express.Multer.File,
  uuid: string,
  folder_id: number
) {
  try {
    return await sql`insert into image(original_name, encoding, type, size, folder_id, uuid) 
      values (${file.originalname},${file.encoding},${file.mimetype},${file.size},${folder_id}, ${uuid}) returning *`;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteImage(imageId: number) {
  return await sql`delete from image where id=${imageId}`;
}

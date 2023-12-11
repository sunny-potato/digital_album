import sql from "../configs/db.config";

export async function getImagesInFolder(folder_id: number) {
  return await sql`select * from image where folder_id=${folder_id}`;
}
export async function createImage(image: {
  file: Express.Multer.File;
  uuid: string;
  folderId: number;
  orderValue: number;
  createdAt: Date;
}) {
  try {
    return await sql`insert into image(original_name, encoding, type, size, folder_id, uuid, order_value, created_at) 
      values (${image.file.originalname},${image.file.encoding},${image.file.mimetype},${image.file.size},${image.folderId}, ${image.uuid}, ${image.orderValue}, ${image.createdAt}) returning *`;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteImage(imageId: number) {
  return await sql`delete from image where id=${imageId}`;
}
export async function getSortedImagesByAsc(folderId: number, sortBy: string) {
  return await sql`select * from image where folder_id=${folderId} order by ${sql(
    sortBy
  )} asc`;
}
export async function getSortedImagesByDesc(folderId: number, sortBy: string) {
  return await sql`select * from image where folder_id=${folderId} order by ${sql(
    sortBy
  )} desc`;
}

import sql from "./db";

export async function postImage(file: Express.Multer.File, uuid: string) {
  try {
    const image =
      await sql`INSERT INTO image(originalname, encoding, type, size, folderId, uuid, userId) 
      VALUES(${file.originalname},${file.encoding},${file.mimetype},${file.size},1, ${uuid}, 1) returning *`;
    // console.log("------------ return value---------", image);
    return image;
  } catch (error) {
    console.log(error);
  }
}

export async function getImage(id: number) {
  const image = await sql`select * from images where id=${id}`;
  return image;
}

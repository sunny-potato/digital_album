import sql from "./db";

// export async function getElement(id: number) {
//   const dinosaur = await sql`select * from elements where id= ${id}`;
//   console.log(dinosaur);
//   return dinosaur;
// }

// export async function createElement(id: number, src: string, name: string) {
//   const element =
//     await sql`INSERT INTO elements(id, elementname, atomicnumber, symbol) VALUES(${id}, ${src}, 1, ${name})`;
//   console.log(element);
//   return element;
// }

export async function postImage(file: Express.Multer.File) {
  try {
    const image =
      await sql`INSERT INTO images(name, encoding, type, buffer, size) VALUES(${file.originalname},${file.encoding},${file.mimetype},${file.buffer},${file.size}) returning id, name`;
    console.log("------------", image);
    return image;
  } catch (error) {
    console.log(error);
  }
}

export async function getImage(id: number) {
  const image = await sql`select * from images where id=${id}`;
  return image;
}

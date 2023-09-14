import sql from "./db";

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

// login

export async function getAllLoginInfo() {
  return await sql`select * from user_account`;
}

export async function findPassword(password: string) {
  return await sql`select * from user_account where password=${password}`;
}

//sigup

export async function findUsername(username: string) {
  return await sql`select * from user_account where user_name=${username}`;
}

export async function createNewUserInfo(userInfo: {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  telephon: number;
  address: string;
}) {
  return await sql`insert into user_info(first_name, last_name, birthdate, email, telephon, address) values(${userInfo.firstName}, ${userInfo.lastName},${userInfo.birthdate},${userInfo.email},${userInfo.telephon},${userInfo.address}) returning id`;
}
export async function createNewUserAccount(userAccount: {
  username: string;
  password: string;
  userId: number;
}) {
  return await sql`insert into user_account(user_name, user_password, user_id) values(${userAccount.username}, ${userAccount.password}, ${userAccount.userId}) `;
}

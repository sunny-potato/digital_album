import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Buffer } from "buffer";
import { Folder, Image } from "./Types/Folder";
import { Login as login } from "Types/Login";

// export async function getImage(fileName: string) {
//   const response = await axios.get(
//     `/albumFolder/getImage?filename=${fileName}`,
//     { responseType: "arraybuffer" }
//   );
//   if (response.data) {
//     const base64 = Buffer.from(response.data, "binary").toString("base64");
//     const image = `data:${response.headers["content-type"]};base64,${base64}`;
//     return image;
//   }
// }

export async function getAllImagesInFolder(folderId: number) {
  const response = await axios.get(
    `/albumFolder/getAllImages?folderId=${folderId}`
    // ,
    // { responseType: "arraybuffer" }
  );
  if (response.data) {
    return response.data;
    // const base64 = Buffer.from(response.data, "binary").toString("base64");
    // const image = `data:${response.headers["content-type"]};base64,${base64}`;
    // return image;
  }
}

export async function postImageInfolder(images: File[], folderId: number) {
  const form = new FormData();
  Array.from(images).map((img) => form.append("image", img));
  // for (const [key, value] of form) {
  //   console.log(key, value);
  // }
  return await axios.post(`/albumFolder/postImage?folderId=${folderId}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deleteImageInfolder(image: Image) {
  // console.log(typeof image.id);
  return await axios.delete(
    `/albumFolder/deleteImage?imageId=${image.id}&imageUuid=${image.uuid}`
  );
}

export async function getMyAlbumInfo(userId: number) {
  const response = await axios.get(`/myAlbum?userId=${userId}`);
  return response.data;
}

export async function getMyAlbumImage(fileName: string) {
  const response = await axios.get(
    `/myAlbum/getAlbumImage?filename=${fileName}`,
    { responseType: "arraybuffer" }
  );
  if (response.data) {
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const image = `data:${response.headers["content-type"]};base64,${base64}`;
    return image;
  }
}

export async function postMyAlbumImage(userId: number, albumImage: File) {
  const form = new FormData();
  form.append("albumImage", albumImage);
  return await axios.post(`/myAlbum/newAlbumImage?userId=${userId}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function postMyAlbumTitle(userId: number, albumTitle: string) {
  return await axios.post(`/myAlbum/albumTitle?userId=${userId}`, albumTitle);
}

export async function createFolder(folderList: Folder[], userId: number) {
  return await axios.post(`/myAlbum/newFolder?userId=${userId}`, folderList);
}

// login
export async function validateLoginInfo(loginInfo: login) {
  return await axios.get(
    `/login?username=${loginInfo.username}&&password=${loginInfo.password}`
  );
}

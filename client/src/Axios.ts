import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Buffer } from "buffer";
import { Folder, Image } from "./Types/Folder";
import { Login as login, Signup } from "./Types/Login";

// two ways to get image 1)
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

// two ways to get image 2)
// the following return data as a localhost link
// ex) http://localhost:8000/albumFolder/image/${image.uuid}
// Folder
export async function getAllImagesInFolder(folderId: number) {
  const response = await axios.get(`/albumFolder/${folderId}/allImages`);
  if (response.data) {
    return response.data;
  }
}

export async function postImageInfolder(images: File[], folderId: number) {
  const form = new FormData();
  Array.from(images).map((img) => form.append("image", img));
  return await axios.post(`/albumFolder/${folderId}/newImage`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deleteImageInfolder(folderId: number, image: Image) {
  return await axios.delete(
    `/albumFolder/${folderId}/deleteImage?imageId=${image.id}&imageUuid=${image.uuid}`
  );
}

//My album
export async function getMyAlbumInfo(userId: number) {
  const response = await axios.get(`/myAlbum/${userId}`);
  return response.data;
}

export async function getMyAlbumImage(userId: number, fileName: string) {
  const response = await axios.get(
    `/myAlbum/${userId}/albumImage?filename=${fileName}`,
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
  return await axios.post(`/myAlbum/${userId}/newAlbumImage`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function postMyAlbumTitle(userId: number, albumTitle: string) {
  return await axios.post(`/myAlbum/${userId}/albumTitle`, albumTitle);
}

export async function createFolder(folderList: Folder[], userId: number) {
  return await axios.post(`/myAlbum/${userId}/newFolder`, folderList);
}

// User
export async function validateLoginInfo(loginInfo: login) {
  return await axios.get(
    `/login?username=${loginInfo.username}&&password=${loginInfo.password}`
  );
}

export async function checkUsernameAvailability(currentUsername: string) {
  return await axios.get(`/signup?username=${currentUsername}`);
}
export async function createNewAccount(signupInfo: Signup) {
  return await axios.post(`/signup/newuser`, signupInfo);
}

export async function getUsername(userId: number) {
  const response = await axios.get(`/user?userId=${userId}`);
  return response.data;
}

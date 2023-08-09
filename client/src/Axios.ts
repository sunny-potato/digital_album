import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Buffer } from "buffer";
import { Folder } from "./types/Folder";

export async function getImage(fileName: string) {
  const response = await axios.get(
    `/digitalAlbum/getImages?filename=${fileName}`,
    { responseType: "arraybuffer" }
  );
  if (response.data) {
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const image = `data:${response.headers["content-type"]};base64,${base64}`;
    return image;
  }
}

export async function postImage(images: File[]) {
  const form = new FormData();
  Array.from(images).map((img) => form.append("image", img));
  for (const [key, value] of form) {
    console.log(key, value);
  }
  return await axios.post(`/digitalAlbum/postImages`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
  return await axios.post(
    `/myAlbum/newAlbumImage?userId=${userId}`,
    form,
    userId,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
}

export async function postMyAlbumTitle(userId: number, albumTitle: string) {
  return await axios.post(`/myAlbum/albumTitle?userId=${userId}`, albumTitle);
}

export async function createFolder(folderList: Folder[], userId: number) {
  return await axios.post(`/myAlbum/newFolder?userId=${userId}`, folderList);
}

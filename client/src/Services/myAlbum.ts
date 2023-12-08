import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Buffer } from "buffer";
import { Folder } from "../Types/Folder";

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

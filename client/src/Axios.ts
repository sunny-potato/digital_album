import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Buffer } from "buffer";

export async function postImage(images: File[]) {
  const form = new FormData();
  // form.append("image", images);
  images.map((img) => form.append("image", img));
  for (const [key, value] of form) {
    console.log(key, value);
  }
  // console.log(form);
  const response = await axios.post(`/digitalAlbum/postImages`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
  // console.log(response);
}

export async function getImage(fileName: string) {
  const response = await axios.get(
    `/digitalAlbum/getImages?filename=${fileName}`,
    { responseType: "arraybuffer" }
  );

  if (response.data) {
    // console.log(response.headers["content-type"]);
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const image = `data:${response.headers["content-type"]};base64,${base64}`;

    return image;
  }
}

export async function createFolder(folderList: string[], userId: number = 1) {
  console.log(folderList, userId);
  const response = await axios.post(`/myAlbum?userId=${userId}`, folderList);
}

export async function getFolder(userId: number) {
  const response = await axios.get(`/myAlbum?userId=${userId}`);
}

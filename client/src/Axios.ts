import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Buffer } from "buffer";

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
  images.map((img) => form.append("image", img));
  for (const [key, value] of form) {
    console.log(key, value);
  }
  const response = await axios.post(`/digitalAlbum/postImages`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
}

export async function getMyAlbumInfo(userId: number) {
  const response = await axios.get(`/myAlbum?userId=${userId}`);
  return response.data as [];
}

export async function createMyAlbum(
  userId: number,
  newAlbum: {
    id: number | undefined;
    image_uuid: string;
    title: string;
    user_id: number;
  }
) {
  console.log(newAlbum);
  const response = await axios.post(
    `/myAlbum/newAlbum?userId=${userId}`,
    newAlbum
  );
  console.log(response);
}

export async function createFolder(
  folderList: {
    id: number | undefined;
    name: string;
    userId: number;
    order_value: number;
  }[],
  userId: number
) {
  // console.log("axios");
  const response = await axios.post(
    `/myAlbum/newFolder?userId=${userId}`,
    folderList
  );
  console.log(response);
}

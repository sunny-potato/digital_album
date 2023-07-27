import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Buffer } from "buffer";

// export async function test(id: number) {
//   const response = await axios.get(`/digitalAlbum?id=${id}`);
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   return response.data;
// }

// export async function createElement(info: {
//   id: number;
//   src: string;
//   name: string;
// }) {
//   const response = await axios.post(`/digitalAlbum`, info);
//   // console.log(response);
// }

export async function postImages(images: File[]) {
  const form = new FormData();
  // form.append("image", images);
  images.map((img) => form.append("image", img));
  for (const [key, value] of form) {
    console.log(key, value);
  }
  // console.log(form);
  const response = await axios.post(`/digitalAlbum/post`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  // console.log(response.data);
}

export async function getImage(fileName: string) {
  await axios.get(`/getImage?filename=${fileName}`);
  // const response = await axios.get(`/getImage?id=${id}`, {
  //   responseType: "arraybuffer",
  // });
  // const base64 = Buffer.from(response.data, "binary").toString("base64");

  // const image = `data:${response.headers["content-type"]};base64,${base64}`;
  // // console.log(image);
  // return image;
}

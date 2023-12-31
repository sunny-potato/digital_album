import axios, { AxiosResponse } from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Folder, Image } from "../Types/Folder";
import { DropDownList } from "../Types/Commonness";

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

export async function getSortedImagesInfolder(
  folderId: number,
  sortKeywordList: DropDownList
) {
  return await axios.get(
    `/albumFolder/${folderId}/sortedImages?sortBy=${sortKeywordList.sortBy}&orderBy=${sortKeywordList.orderBy}`
  );
}

export async function downloadImageFile(image: Image) {
  const getAPIs = [
    axios.get(`/albumFolder/download/image/${image.uuid}`, {
      responseType: "arraybuffer",
    }),
    axios.get(`/albumFolder/donwload/imageName/${image.uuid}`),
  ];
  // send multiple requests
  return await Promise.all(
    getAPIs.map((API) => API.then((response) => response))
  ).then((response) => response);
}

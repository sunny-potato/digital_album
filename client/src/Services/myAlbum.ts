import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Buffer } from "buffer";
import { Folder } from "../Types/Folder";
import { DropDownList } from "../Types/Commonness";

export async function getMyAlbumInfo(userId: number) {
  return await axios.get(`/myAlbum/${userId}`);
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

export async function getSortedFoldersInMyAlbum(
  userId: number,
  sortKeywordList: DropDownList
) {
  return await axios.get(
    `/myAlbum/${userId}/sortedFolders?sortBy=${sortKeywordList.sortBy}&orderBy=${sortKeywordList.orderBy}`
  );
}

// export async function getFolderSizeListInMyAlbum(
//   userId: number,
//   folderList: Folder[]
// ) {
//   return await axios.get(`/myAlbum/${userId}/folderSizeList`, {
//     params: folderList,
//   });
// }

import { downloadImageFile } from "../Services/folder";
import { Image } from "../Types/Folder";

export const downloadImage = async (currentImage: Image) => {
  const result = await downloadImageFile(currentImage);
  const arrayBuffer = result[0].data as ArrayBuffer;
  const imageOriginalName = result[1].data as string;
  const imageBlob = new Blob([arrayBuffer]);
  const imageUrl = URL.createObjectURL(imageBlob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = imageUrl;
  a.download = `${imageOriginalName}`;
  a.click();
  URL.revokeObjectURL(imageUrl);
};

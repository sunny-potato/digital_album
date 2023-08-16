import { Storage } from "@google-cloud/storage";

const bucketName = "my_digital_album";
// const filePath = "../client/src/Images/upload.png"; // The path to your file to upload/download
// const destFileName = "upload.png"; // The new ID for your GCS file
// const generationMatchPrecondition = 0;

// Creates a client
const projectId = "core-ridge-394012";
const keyFilename = "key.json";
const storage = new Storage({ projectId, keyFilename });

export async function uploadFile(fileName: string, file: string | Buffer) {
  await storage.bucket(bucketName).file(fileName).save(file);
  console.log(`${fileName} uploaded to imageStorage`);
}

export async function downloadFile(fileName: string) {
  // Downloads the file into a buffer in memory.
  const contents = await storage.bucket(bucketName).file(fileName).download();
  console.log(`${fileName} downloaded from imageStorage`);
  return contents[0];
}

// const deleteOptions = {
//   ifGenerationMatch: generationMatchPrecondition,
// };
export async function deleteFile(fileName: string) {
  await storage.bucket(bucketName).file(fileName).delete();
  console.log(`${fileName} in ${bucketName} is deleted from imageStorage`);
}

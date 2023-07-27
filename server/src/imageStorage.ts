import { Storage } from "@google-cloud/storage";

const bucketName = "my_digital_album";
const filePath = "../client/src/Images/upload.png"; // The path to your file to upload/download
// const destFileName = "upload.png"; // The new ID for your GCS file
const generationMatchPrecondition = 0;

// Creates a client
const projectId = "core-ridge-394012";
const keyFilename = "key.json";
const storage = new Storage({ projectId, keyFilename });

export async function uploadFile(destFileName: string, file: string | Buffer) {
  //   const options = {
  //     destination: destFileName,
  // Optional:
  // Set a generation-match precondition to avoid potential race conditions
  // and data corruptions. The request to upload is aborted if the object's
  // generation number does not match your precondition. For a destination
  // object that does not yet exist, set the ifGenerationMatch precondition to 0
  // If the destination object already exists in your bucket, set instead a
  // generation-match precondition using its generation number.
  // preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
  //   };
  //   await storage.bucket(bucketName).upload(filePath, options);
  await storage.bucket(bucketName).file(destFileName).save(file);
  console.log(`${destFileName} uploaded to ${bucketName}`);
}

export async function downloadFile(fileName: string) {
  // const destFileName = "../client/src/Images";
  // const options = {
  //   destination: destFileName,
  // };
  // const fileName = "pexels-nati-17362172.jpg";
  // // Downloads the file
  // await storage.bucket(bucketName).file(fileName).download(options);

  // console.log(`gs://${bucketName}/${fileName} downloaded to ${destFileName}.`);

  // Downloads the file into a buffer in memory.
  console.log("in process");
  const contents = await storage.bucket(bucketName).file(fileName).download();

  console.log(
    `Contents of gs://${bucketName}/${fileName} are ${contents.toString()}.`
  );
}

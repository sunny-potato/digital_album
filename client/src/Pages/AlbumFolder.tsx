import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postImageInfolder, getImageInfolder } from "../Axios";
import "../Styles/AlbumFolder.css";
import upload from "../Images/upload.png";
import { Image } from "../Types/Folder";

function AlbumFolder() {
  const folderId = Number(useParams().folderId);
  const navigate = useNavigate();
  const [selectedImageList, setSelectedImageList] = useState<File[]>([]);
  const [selectedImageBlob, setSelectedImageBlob] = useState<string[]>([]);
  const [uploadedImageList, setUploadedImageList] = useState<Image[]>([]);
  // console.log(selectedImageBlob, selectedImageList);

  function handleFiles(fileList: FileList | null) {
    if (fileList === null) return;
    Object.values(fileList).map((file: File) => {
      const fileBlob = URL.createObjectURL(file);
      setSelectedImageBlob((selectedImageBlob) => [
        ...selectedImageBlob,
        fileBlob,
      ]);
      setSelectedImageList((selectedImageList) => [...selectedImageList, file]);
    });
  }
  // useEffect(() => {
  //   async function test() {
  //     if (sendImage) {
  //       await insertImage(sendImage);
  //       const image = await getImage(28);
  //       setImageFromDB(image);
  //     }
  //   }
  //   void test();
  // }, [sendImage]);

  useEffect(() => {
    async function getImages() {
      const getImageList = await getImageInfolder(folderId);
      setUploadedImageList(getImageList);
    }
    void getImages();
  }, []);

  function deleteImage(imageIndex: number) {
    const updateSelectedImageBlob = [
      ...selectedImageBlob.slice(0, imageIndex),
      ...selectedImageBlob.slice(imageIndex + 1),
    ];
    setSelectedImageBlob(updateSelectedImageBlob);
    const updateSelectedImage = [
      ...selectedImageList.slice(0, imageIndex),
      ...selectedImageList.slice(imageIndex + 1),
    ];
    setSelectedImageList(updateSelectedImage);
  }

  async function saveSelectedImage() {
    try {
      if (selectedImageList.length == 0) {
        console.log("no image that can be sendt to DB"); // it should be popup
      }
      const response = await postImageInfolder(selectedImageList, folderId);
      if (response.status === 200) {
        cancelSelectedImage();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function cancelSelectedImage() {
    setSelectedImageList([]);
    setSelectedImageBlob([]);
  }

  return (
    <div className="uploadPageContainer">
      <div className="contentContainer">
        <div className="uploadImageBox">
          <img className="uploadIcon" src={upload} alt="upload image"></img>
          <div className="uploadInput">
            <span className="uploadDragDrop">Drag and drop, </span>
            <label className="uploadImages" htmlFor="uploadImages">
              or
              <input
                name="uploadImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => handleFiles(event.target.files)}
              />
            </label>
          </div>
        </div>
        <div className="displayImageBox">
          <div className="displayTitle">Uploaded photos</div>
          <div className="displayContent">
            {uploadedImageList &&
              uploadedImageList.map((image, index) => (
                <div key={image.id} className="uploadedImage">
                  {/* <button
                    className="deleteImageButton"
                    onClick={() => deleteImage(index)}
                  >
                    x
                  </button> */}
                  <img
                    src={`http://localhost:8000/albumFolder/image/${image.uuid}`}
                    alt={image.origianl_name}
                  ></img>
                </div>
              ))}
          </div>
          {/* <button className="saveImageButton" onClick={saveImage}>
            Save
          </button> */}
        </div>
        <div
          className="displayImagePopupBox"
          style={{
            visibility: selectedImageBlob.length > 0 ? "visible" : "hidden",
          }}
        >
          <div className="displayPopupTitle">Selected photos</div>
          <div className="displayPopupContent">
            {selectedImageBlob &&
              selectedImageBlob.map((img, index) => (
                <div key={index} className="selectedImage">
                  <button
                    className="deleteImageButton"
                    onClick={() => deleteImage(index)}
                  >
                    x
                  </button>
                  <img src={img}></img>
                </div>
              ))}
          </div>
          <button
            className="saveSelectedImageButton"
            onClick={saveSelectedImage}
          >
            Save
          </button>
          <button
            className="cancelSelectedImageButton"
            onClick={cancelSelectedImage}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlbumFolder;

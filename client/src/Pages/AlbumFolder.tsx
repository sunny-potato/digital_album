import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postImage, getImage } from "../Axios";
import "../Styles/AlbumFolder.css";
import upload from "../Images/upload.png";

function AlbumFolder() {
  console.log("hei");
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [sendImage, setSendImage] = useState<File[]>([]);
  const [displayImage, setDisplayImage] = useState<string[]>([]);
  const [ImageFromDB, setImageFromDB] = useState<string>();
  // console.log(sendImage.length, displayImage.length);

  function handleFiles(fileList: FileList | null) {
    if (fileList === null) return;
    Object.values(fileList).map((file: File) => {
      const fileBlob = URL.createObjectURL(file);
      setDisplayImage((displayImage) => [...displayImage, fileBlob]);
      setSendImage((sendImage) => [...sendImage, file]);
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

  // useEffect(() => {
  //   async function test() {
  //     const image = await getImage("pexels-nati-17362172.jpg");
  //     setImageFromDB(image);
  //   }
  //   void test();
  // }, []);

  function deleteImage(imageIndex: number) {
    const updateDisplayImages = [
      ...displayImage.slice(0, imageIndex),
      ...displayImage.slice(imageIndex + 1),
    ];
    setDisplayImage(updateDisplayImages);
    const updateSendImages = [
      ...sendImage.slice(0, imageIndex),
      ...sendImage.slice(imageIndex + 1),
    ];
    setSendImage(updateSendImages);
  }

  async function saveImage() {
    try {
      if (sendImage.length == 0) {
        console.log("no image that can be sendt to DB"); // it should be popup
      }
      const response = await postImage(sendImage);
      if (response.status === 200) {
        navigate("/MyAlbum");
        // display images in new page
      }
    } catch (error) {
      console.log(error);
    }
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
                // className="uploadImageButton"
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
            {displayImage &&
              displayImage.map((img, index) => (
                <div key={index} className="chosenImage">
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
          <button className="saveImageButton" onClick={saveImage}>
            Save
          </button>
        </div>
        {/* <div>
          image from DB : <img src="http://localhost:8000/getImage?id=28"></img>
        </div> */}
      </div>
    </div>
  );
}

export default AlbumFolder;

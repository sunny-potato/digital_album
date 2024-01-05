import { useEffect, useState } from "react";
import { Image } from "../Types/Folder";
import { useNavigate, useParams } from "react-router-dom";
import s from "../Styles/EachImage.module.css";
import ImageSlider from "../Components/ImageSlider";
import { getAllImagesInFolder } from "../Services/folder";
import { Image as ImageProps } from "../Types/Folder";
import { formatFileSize, formatDateTime } from "../Utils/formatData";
import ShareIcon from "@mui/icons-material/Share";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { downloadImage } from "../Utils/downloadImage";
import { Tooltip } from "@mui/material";

function EachImage() {
  const { folderId, imageId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>();
  const [imageList, setImageList] = useState<Image[]>([]);
  const [defaultURL, setDefaultURL] = useState<string>(
    "http://localhost:8000/albumFolder/image/"
  );

  console.log(window.location.href)

  useEffect(() => {
    const getImages = async () => {
      const images = await getAllImagesInFolder(Number(folderId));
      if (images.length !== 0) {
        setImageList(images);
        const selectedImageIndex = images.findIndex(
          (image: ImageProps) => image.id === Number(imageId)
        );
        setCurrentImageIndex(selectedImageIndex);
      }
    };
    getImages();
  }, [folderId, imageId]);

  const getImageInformation = () => {
    const currentImage = imageList[currentImageIndex as number];
    if (currentImage) {
      const imageName = currentImage.original_name;
      const imageSize = formatFileSize(currentImage.size);
      const imageDate = formatDateTime(currentImage.created_at as Date);
      return (
        <div className={s.imageInformation}>
          <div>Name : {imageName}</div>
          <div>Size : {imageSize}</div>
          <div>Saved at :{imageDate}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div>
      <div
        className={s.popUpBackground}
        style={{ display: imageList ? "block" : "none" }}
      >
        <div className={s.popUpWindow}>
          <div className={s.popUpWindowInner}>
            <button className={s.closeButton} onClick={() => navigate(-1)}>
              x
            </button>
            <ImageSlider
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
              imageList={imageList}
              defaultURL={defaultURL}
            />
            {getImageInformation()}
            <div className={s.popOverButtons}>
              <Tooltip title="Share" placement="left" arrow>
                <button
                  className={s.shareButton}
                  onClick={() => console.log("clicked")}
                >
                  <ShareIcon />
                  {/* <div>Share</div> */}
                </button>
              </Tooltip>
              <Tooltip title="Download" placement="left" arrow>
                <button
                  className={s.downloadButton}
                  onClick={() =>
                    downloadImage(imageList[currentImageIndex as number])
                  }
                >
                  <FileDownloadOutlinedIcon />
                  {/* <a>Download</a> */}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachImage;

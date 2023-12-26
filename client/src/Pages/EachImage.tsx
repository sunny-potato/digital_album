import { useEffect, useState } from "react";
import { Image } from "../Types/Folder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import s from "../Styles/EachImage.module.css";
import ImageSlider from "../Components/ImageSlider";
import { downloadImageFile, getAllImagesInFolder } from "../Services/folder";
import { Image as ImageProps } from "../Types/Folder";
import { formatFileSize, formatDateTime } from "../Utils/formatData";
import ShareIcon from "@mui/icons-material/Share";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function EachImage() {
  const { folderId, imageId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>();
  const [imageList, setImageList] = useState<Image[]>([]);
  const [defaultURL, setDefaultURL] = useState<string>(
    "http://localhost:8000/albumFolder/image/"
  );

  console.log(imageList);

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
  const downloadImage = async () => {
    const result = await downloadImageFile(
      imageList[currentImageIndex as number]
    );
    const arrayBuffer = result[0].data as ArrayBuffer;
    const imageOriginalName = result[1].data as string;
    console.log(arrayBuffer, imageOriginalName);
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
              <button
                className={s.shareButton}
                onClick={() => console.log("clicked")}
              >
                <ShareIcon />
                <div>Share</div>
              </button>
              <button className={s.downloadButton} onClick={downloadImage}>
                <FileDownloadOutlinedIcon />
                <a>Download</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachImage;

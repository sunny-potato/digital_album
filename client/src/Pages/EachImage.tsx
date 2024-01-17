import { useEffect, useRef, useState } from "react";
import { Image } from "../Types/Folder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import s from "../Styles/EachImage.module.css";
import ImageSlider from "../Components/ImageSlider";
import { getAllImagesInFolder } from "../Services/folder";
import { Image as ImageProps } from "../Types/Folder";
import { formatFileSize, formatDateTime } from "../Utils/formatData";
// import ShareIcon from "@mui/icons-material/Share";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { downloadImage } from "../Utils/downloadImage";
import { Tooltip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

function EachImage() {
  const { folderId, imageId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>();
  const [imageList, setImageList] = useState<Image[]>([]);
  const [defaultURL, setDefaultURL] = useState<string>(
    "http://localhost:8000/albumFolder/image/"
  );
  const shareRef = useRef();
  const currentURL = encodeURI(window.location.href);
  const [isShareClicked, setIsShareClicked] = useState<boolean>(false);
  const [isURLCopied, setIsURLCopied] = useState<boolean>(false);

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
              <div className={s.shareButtonBox}>
                <Tooltip title="Get link" placement="left" arrow>
                  <a
                    className={s.shareButton}
                    href="#"
                    ref={shareRef}
                    onClick={() => {
                      isShareClicked
                        ? setIsShareClicked(false)
                        : setIsShareClicked(true);
                      isURLCopied ? setIsURLCopied(false) : null;
                    }}
                  >
                    <LinkIcon />
                  </a>
                </Tooltip>
                {isShareClicked && (
                  <div className={s.getLinkButton}>
                    <div className={s.currentLink}>{currentURL}</div>
                    {!isURLCopied && (
                      <button
                        className={s.copyButton}
                        onClick={async () => {
                          await navigator.clipboard.writeText(`${currentURL}`);
                          setIsURLCopied(true);
                        }}
                      >
                        copy
                      </button>
                    )}
                    {isURLCopied && (
                      <button className={s.copyButton}>copied</button>
                    )}
                  </div>
                )}
              </div>
              <Tooltip title="Download" placement="left" arrow>
                <button
                  className={s.downloadButton}
                  onClick={() =>
                    downloadImage(imageList[currentImageIndex as number])
                  }
                >
                  <FileDownloadOutlinedIcon />
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

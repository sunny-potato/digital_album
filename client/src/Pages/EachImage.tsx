import { useEffect, useState } from "react";
import { Image } from "../Types/Folder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import s from "../Styles/EachImage.module.css";
import ImageSlider from "../Components/ImageSlider";
import { getAllImagesInFolder } from "../Axios";
import { Image as ImageProps } from "../Types/Folder";

function EachImage() {
  const { folderId, imageId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>();
  const [imageList, setImageList] = useState<Image[]>([]);
  const [defaultURL, setDefaultURL] = useState<string>(
    "http://localhost:8000/albumFolder/image/"
  );

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
  }, []);

  return (
    <div>
      <div
        className={s.popUpBackground}
        style={{ display: imageList ? "block" : "none" }}
      >
        <div className={s.popUpWindow}>
          <ImageSlider
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            imageList={imageList}
            defaultURL={defaultURL}
          />
          <button className={s.closeButton} onClick={() => navigate(-1)}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default EachImage;

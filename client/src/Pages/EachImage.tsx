import { useEffect, useRef, useState } from "react";
import { Image } from "../Types/Folder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import s from "../Styles/EachImage.module.css";
import ImageSlider from "../Components/ImageSlider";
import { getAllImagesInFolder } from "../Axios";
import { Image as ImageProps } from "../Types/Folder";

function EachImage() {
  const { folderId, imageId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [imageList, setImageList] = useState<Image[]>([]);
  const [defaultURL, setDefaultURL] = useState<string>(
    "http://localhost:8000/albumFolder/image/"
  );

  console.log("eachimage", { imageList, currentImageIndex });

  useEffect(() => {
    const getImages = async () => {
      const images = await getAllImagesInFolder(Number(folderId));
      if (images.length !== 0) {
        setImageList(images);
        const selectedImageIndex = images.findIndex(
          (image: ImageProps) => image.id === Number(imageId)
        );
        // console.log({ selectedImageIndex });
        setCurrentImageIndex(selectedImageIndex);
      }
    };
    getImages();
  }, []);

  // if (!currentImageIndex) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div
        className={s.popUpBackground}
        style={{ display: imageList ? "block" : "none" }}
      >
        <div className={s.popUpWindow}>
          <ImageSlider
            currentImageIndex={currentImageIndex}
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

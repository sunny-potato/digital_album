import { useEffect, useRef, useState } from "react";
import { Image } from "../Types/Folder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import s from "../Styles/EachImage.module.css";
import ImageSlider from "../Components/ImageSlider";

function EachImage() {
  const { state } = useLocation(); // to pass data using state of uselocation()
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>();
  const [imageList, setImageList] = useState<Image[]>([]);
  const [defaultURL, setDefaultURL] = useState<string>("");

  console.log(state);

  useEffect(() => {
    setCurrentImageIndex(state.currentImageIndex);
    setImageList(state.imageList);
    setDefaultURL(state.defaultURL);
  }, [state]);

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

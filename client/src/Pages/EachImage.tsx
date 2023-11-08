import { useEffect, useRef, useState } from "react";
import { Image } from "../Types/Folder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import s from "../Styles/EachImage.module.css";
import ImageSlider from "../Components/ImageSlider";

function EachImage() {
  const { state } = useLocation(); // to pass data using state of uselocation()
  console.log(state.currentImageIndex);
  const navigate = useNavigate();
  // const { imageId } = useParams();
  // const [imageIdNumber, setImageIdNumber] = useState<number>();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>();
  const [imageList, setImageList] = useState<Image[]>([]);
  const [defaultURL. setDefaultURL]= useState<string>("");

  useEffect(() => {
    if (state.currentImageIndex) {
      const currentImageIndex = state.currentImageIndex;
      setCurrentImageIndex(currentImageIndex);
      setImageList(state.imageList);
      setDefaultURL(state.defaultURL);
    }
  });

  return (
    <div>
      <div
        className={s.popUpBackground}
        style={{ display: currentImageIndex ? "block" : "none" }}
      >
        <div className={s.popUpWindow}>
          {/* <ImageSlider currentImage={currentImage} /> */}
          <button className={s.closeButton} onClick={() => navigate(-1)}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default EachImage;

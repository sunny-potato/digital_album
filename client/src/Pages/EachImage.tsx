import { useEffect, useRef, useState } from "react";
import { Image } from "../Types/Folder";
import { useNavigate, useParams } from "react-router-dom";
import s from "../Styles/EachImage.module.css";
import ImageSlider from "../Components/ImageSlider";

function EachImage() {
  const navigate = useNavigate();
  console.log("------------");
  const { imageId } = useParams();
  const [imageIdNumber, setImageIdNumber] = useState<number>();

  useEffect(() => {
    if (imageId) {
      setImageIdNumber(Number(imageId));
    }
  });

  return (
    <>
      <div
        className={s.popUpBackground}
        style={{ display: imageIdNumber ? "block" : "none" }}
      >
        <div className={s.popUpWindow}>
          <ImageSlider />
          <button className={s.closeButton} onClick={() => navigate(-1)}>
            X
          </button>
        </div>
      </div>
    </>
  );
}

export default EachImage;

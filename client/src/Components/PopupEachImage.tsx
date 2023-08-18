import styles from "../Styles/PopupEachImage.module.css";
import { Image } from "../Types/Folder";

type Props = {
  clickedImage: Image;
};

function PopupEachImage(props: Props) {
  const imageInfo = props.clickedImage;
  console.log(imageInfo);

  return (
    <>
      <div className={styles.popupContainer}>
        Hei
        <button>X</button>
      </div>
    </>
  );
}

export default PopupEachImage;

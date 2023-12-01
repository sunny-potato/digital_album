import s from "../Styles/PopupMessage.module.css";
import { PopupMessage as PopupMessageProps } from "../Types/Commonness";

function PopupMessage({
  isRequirementFulfilled,
  setIsRequirementFulfilled,
  popupMessage,
  buttonMessage,
}: PopupMessageProps) {
  return (
    <div
      className={s.warningPopupBackground}
      style={{
        visibility: isRequirementFulfilled ? "hidden" : "visible",
      }}
    >
      <div className={s.displayWarningPopup}>
        <div>{popupMessage}</div>
        <button onClick={() => setIsRequirementFulfilled(true)}>
          {buttonMessage}
        </button>
      </div>
    </div>
  );
}

export default PopupMessage;

import s from "../Styles/TabCommon.module.css";
import { useNavigate } from "react-router-dom";
import { TabPasswordDone as TabPasswordDoneProps } from "../Services/tab";

function TabPasswordDone({ activeTab }: TabPasswordDoneProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`${s.tabPassword}  ${
        activeTab.isActive ? "" : s.tabInActive
      } `}
    >
      <div>Your password has been successfully updated. </div>
      <div>Please log in using the new password.</div>
      <div className={s.buttonContainer}>
        <button
          className={s.searchButton}
          style={{ padding: "0.5rem 1rem" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default TabPasswordDone;

import { useNavigate } from "react-router-dom";
import s from "../Styles/TabDefaultContent.module.css";

type TabNoMatchContent = {
  isTabActive: boolean;
  tabDescription: string;
  activeTabStatus: { isActive: boolean; status: string };
  setActiveTabStatus: (value: { isActive: boolean; status: string }) => void;
};

function TabNoMatchContent({
  isTabActive,
  tabDescription,
  activeTabStatus,
  setActiveTabStatus,
}: TabNoMatchContent) {
  const navigate = useNavigate();
  return (
    <div className={`${s.tabPassword}  ${isTabActive ? "" : s.tabInActive} `}>
      <div className={s.pageDescription}>{tabDescription}</div>
      <div className={s.buttonContainer}>
        <button
          className={s.cancelButton}
          onClick={() =>
            setActiveTabStatus({
              ...activeTabStatus,
              ["status"]: "default",
            })
          }
        >
          Go back
        </button>
        <button className={s.searchButton} onClick={() => navigate("/login")}>
          Go to login
        </button>
      </div>
    </div>
  );
}

export default TabNoMatchContent;

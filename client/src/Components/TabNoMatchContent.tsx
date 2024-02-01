import { useNavigate } from "react-router-dom";
import s from "../Styles/TabCommon.module.css";

type TabNoMatchContent = {
  tabDescription: string;
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
};

function TabNoMatchContent({
  tabDescription,
  activeTab,
  setActiveTabStatus,
}: TabNoMatchContent) {
  const navigate = useNavigate();
  return (
    <div
      className={`${s.tabPassword}  ${
        activeTab.isActive ? "" : s.tabInActive
      } `}
    >
      <div className={s.pageDescription}>{tabDescription}</div>
      <div className={s.buttonContainer}>
        <button
          className={s.cancelButton}
          onClick={() =>
            setActiveTabStatus({
              ...activeTab,
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

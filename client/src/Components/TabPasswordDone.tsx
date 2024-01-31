import s from "../Styles/TabDefaultContent.module.css";
import { userInput } from "../Types/Commonness";
import { useNavigate } from "react-router-dom";

type TabPasswordDone = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  getUserInput: (value: userInput) => void;
};

function TabPasswordDone({
  activeTab,
  setActiveTabStatus,
  getUserInput,
}: TabPasswordDone) {
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
          className={s.cancelButton}
          onClick={() => {
            getUserInput({ username: "", email: "" });
            setActiveTabStatus({
              ...activeTab,
              ["status"]: "default",
            });
          }}
        >
          Cancel
        </button>
        <button
          className={s.searchButton}
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

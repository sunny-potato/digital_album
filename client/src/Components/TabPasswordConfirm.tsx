import { useEffect, useState } from "react";
import s from "../Styles/TabDefaultContent.module.css";
import { getUsernameWithEmail } from "../Services/user";
import { useNavigate } from "react-router-dom";

type TabPasswordConfirm = {
  activeTab: { name: string; isActive: boolean; status: string };
  userData: undefined | string;
};

function TabPasswordConfirm({ activeTab, userData }: TabPasswordConfirm) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const getUsername = async () => {
      if (userData) {
        const result = await getUsernameWithEmail(userData);
        setUsername(result);
      }
    };
    void getUsername();
  }, [userData]);
  return (
    <div
      className={`${s.tabPassword}  ${
        activeTab.isActive ? "" : s.tabInActive
      } `}
    >
      {userData && <div> Your username is {username}</div>}
      <div className={s.buttonContainer}>
        <button className={s.cancelButton} onClick={() => navigate("/login")}>
          Cancel
        </button>
        <button className={s.searchButton} onClick={() => navigate("/login")}>
          Send
        </button>
      </div>
    </div>
  );
}

export default TabPasswordConfirm;

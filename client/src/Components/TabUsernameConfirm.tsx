import { useEffect, useState } from "react";
import s from "../Styles/TabCommon.module.css";
import { getUsernameWithEmail } from "../Services/user";
import { useNavigate } from "react-router-dom";
import { userInput } from "../Types/Commonness";
import { TabUsernameConfirm as TabUsernameConfirmProps } from "../Services/tab";

function TabUsernameConfirm({ activeTab, userData }: TabUsernameConfirmProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const getUsername = async () => {
      if (userData) {
        const result = await getUsernameWithEmail(userData.email);
        setUsername(result);
      }
    };
    getUsername().catch(console.error);
  }, [userData]);

  return (
    <div
      className={`${s.tabPassword}  ${
        activeTab.isActive ? "" : s.tabInActive
      } `}
    >
      {userData && <div> Your username is {username}</div>}
      <div className={s.buttonContainer}>
        <button className={s.searchButton} onClick={() => navigate("/login")}>
          Go to login
        </button>
      </div>
    </div>
  );
}

export default TabUsernameConfirm;

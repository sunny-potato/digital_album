import { useEffect, useState } from "react";
import s from "../Styles/TabDefaultContent.module.css";
import { getUsernameWithEmail } from "../Services/user";
import { useNavigate } from "react-router-dom";
import { userInput } from "../Types/Commonness";

type TabUsernameConfirm = {
  activeTab: { name: string; isActive: boolean; status: string };
  userData: userInput;
};

function TabUsernameConfirm({ activeTab, userData }: TabUsernameConfirm) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const getUsername = async () => {
      console.log(userData);
      if (userData) {
        const result = await getUsernameWithEmail(userData.email);
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
        <button className={s.searchButton} onClick={() => navigate("/login")}>
          Go to login
        </button>
      </div>
    </div>
  );
}

export default TabUsernameConfirm;

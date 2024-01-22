import { useEffect, useState } from "react";
import s from "../Styles/TabDefaultContent.module.css";
import { getUsernameWithEmail } from "../Services/user";
import { useNavigate } from "react-router-dom";

type TabConfirmUsername = {
  activeTab: { name: string; isActive: boolean; status: string };
  // setActiveTabStatus: (value: {
  //   name: string;
  //   isActive: boolean;
  //   status: string;
  // }) => void;
  userData: undefined | string;
};

function TabConfirmUsername({
  activeTab,
  // setActiveTabStatus,
  userData,
}: TabConfirmUsername) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  console.log(activeTab.isActive);

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
        <button className={s.searchButton} onClick={() => navigate("/login")}>
          Go to login
        </button>
      </div>
    </div>
  );
}

export default TabConfirmUsername;

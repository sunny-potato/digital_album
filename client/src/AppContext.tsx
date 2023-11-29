import { createContext, useEffect, useState } from "react";
import { UserContext as UserContextProps } from "./Types/Login";
export const UserContext = createContext<UserContextProps>({
  userId: null,
  setUserId: () => null,
});

const getLocalStorage = () => {
  // const getUserId = JSON.parse(localStorage.getItem("userId") as string);
  // if (getUserId === null) {
  //   return undefined;
  // } else {
  //   const savedUserId = JSON.parse(getUserId);
  //   return savedUserId;
  // }
  // console.log(getUserId);
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = useState<number | null>(null);
  const value = { userId, setUserId };

  useEffect(() => {
    if (userId !== null) {
      return localStorage.setItem("userId", JSON.stringify(userId));
    }
  }, [userId]);
  // localStorage.clear();
  const savedUserId = JSON.parse(localStorage.getItem("userId") as string);
  console.log(savedUserId);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

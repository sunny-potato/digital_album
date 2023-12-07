import { createContext, useEffect, useState } from "react";
import { UserContext as UserContextProps } from "./Types/Login";
export const UserContext = createContext<UserContextProps>({
  userId: null,
  setUserId: () => null,
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserIdState] = useState<number | null>(() => {
    return JSON.parse(localStorage.getItem("userId") as string);
  });

  const setUserId = (userId: number | null) => {
    setUserIdState(userId);
    localStorage.setItem("userId", JSON.stringify(userId));
    console.log("Saving to localStorage!", userId);
  };

  const value = { userId, setUserId };

  // useEffect(() => {
  //   console.log("Save userId", userId);
  //   if (userId !== null) {
  //     localStorage.setItem("userId", JSON.stringify(userId));
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   const savedUserId = JSON.parse(localStorage.getItem("userId") as string);
  //   if (savedUserId !== null) {
  //     setUserId(savedUserId);
  //   } else {
  //     setUserId(null);
  //   }
  //   console.log({ savedUserId });
  // }, []);

  console.log({ userId });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

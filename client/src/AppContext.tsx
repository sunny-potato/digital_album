import { createContext, useState } from "react";
import { UserContext as UserContextProps } from "./Types/Login";
export const UserContext = createContext<UserContextProps>({
  userId: undefined,
  setUserId: () => undefined,
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const value = { userId, setUserId };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

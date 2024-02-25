import { createContext, useState } from "react";

export const UseContext = createContext();

export const UseContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState("User");
  const [currentUserID, setCurrentUserID] = useState(4);

  function setIsAuthenticatedToggle(value, role) {
    setIsAuth(value);
    setUserRole(role);
    
  }

  function handleSetCurrentUser(userID) {

    setCurrentUserID(userID);
  }
  return (
    <UseContext.Provider
      value={{
        currentUserID,
        isAuth,
        userRole,
        setIsAuthenticatedToggle,
        handleSetCurrentUser,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};

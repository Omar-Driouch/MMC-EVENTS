import { createContext, useState } from "react";

export const UseContext = createContext();

export const UseContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState("User");
  const [currentUser, setCurrentUser] = useState({});

  function setIsAuthenticatedToggle(value, role) {
    setIsAuth(value);
    setUserRole(role);
    
  }

  function handleSetCurrentUser(SetCurrentUser) {

    setCurrentUser(SetCurrentUser);
  }
  return (
    <UseContext.Provider
      value={{
        currentUser,
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

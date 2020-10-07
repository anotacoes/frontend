import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";

import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = props => {
  const history = useHistory();
  const [currentUser, setUser] = useState();

  const setCurrentUser = useCallback(user => {
    setUser(user);
    localStorage.setItem("@anotacoes/conta", JSON.stringify(user));
  }, [setUser]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("@anotacoes/conta"));
    if (user) {
      setCurrentUser(user);
      history.replace("/home");
    }
    // eslint-disable-next-line
  }, []);

  const contextValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser]);

  return <AuthContext.Provider value={contextValue} {...props} />;
};

export const useCurrentUser = () => useContext(AuthContext);


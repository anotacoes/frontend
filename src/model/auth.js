import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

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

  return <AuthContext.Provider value={[currentUser, setCurrentUser]} {...props} />;
};

export const useCurrentUser = () => useContext(AuthContext);


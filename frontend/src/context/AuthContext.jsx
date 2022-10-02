import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
// import getUserData from "../components/account/login/login"

const AuthContext = createContext();

export default AuthContext;





export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("access_token")
      ? null
      : null
  );
  const [loading, setLoading] = useState(true);

  const getUserData = (access_token) => {
    return fetch("http://localhost:8000/api/user/" + jwt_decode(access_token).user_id)
    .then((response) => response.json())
    .then((data) => setUser(data))
    

    .catch((error) => console.log(error))
  }
  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    getUserData

  };

  useEffect(() => {
    if (authTokens) {
      setUser(getUserData(authTokens));
      console.log(user)
      console.log(getUserData(authTokens))
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
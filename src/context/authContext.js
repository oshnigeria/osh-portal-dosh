import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { cookies_id } from "../details";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsloggedin] = useState(false);
  const [token, setToken] = useState(Cookies.get(cookies_id));
  const [dec_token, setDec_token] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (token) {
      setIsloggedin(true);
      setDec_token(jwt.decode(token));
    } else {
      setIsloggedin(false);
    }
  }, []);

  const set_token = (token) => {
    // Cookies.set(`${cookies_id}`, `${response.data.token}`, {
    //   expires: 1,
    // });
    // setToken(token);
    setIsloggedin(true);
  };

  const check_token = () => {
    const storedToken = Cookies.get(cookies_id);
    if (storedToken) {
      // Set your token in state or perform other actions
    }
  };

  const remove_token = () => {
    Cookies.remove(cookies_id);
    setIsloggedin(false);
    router.push("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedin,
        set_token,
        check_token,
        remove_token,
        token,
        dec_token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

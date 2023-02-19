import React, { useEffect } from "react";
import { useStateContext } from "../../context/StateContext";
import "./Header.css";
import Navbar from "./Navbar";
import { useHistory,useLocation } from "react-router-dom";

const Header = ({ user }) => {
  const { loginUser } = useStateContext();
  const history = useHistory();
  const location = useLocation()
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    if (auth) {
      loginUser(JSON.parse(auth));
    } else {
      if(location.pathname==="/cart"){
        history.push("/login");
      }
    }
  }, [auth,location]);
  return <Navbar user={user} />;
};

export default Header;

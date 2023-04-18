import React from "react";
import styles from "./Header.css"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "./../../../services/auth.services";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    AuthService.logout();
    window.location.reload();
  };

  return (
    <div className="Header">
      <p className="AppName">d'ARTAGNAN CONTROL ALPHA BUILD</p>
      <div className="HeaderContent">
        <p className="RoleText">Organiser</p>
        <p className="UserNameText">{localStorage.getItem('username')}</p>
        <button onClick={logout} id="LogOutButton">Log out</button>
      </div>
    </div>
  );
}

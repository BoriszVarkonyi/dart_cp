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
      {/* Temporary design! */}
      <p className="UserNameText">[[[USERNAME]]]]</p>
      <p>&#9776;</p>
      <p className="RoleText">Organiser</p>
      <p>&#10072;</p>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
}

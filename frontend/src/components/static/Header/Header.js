import React from "react";
import styles from "./Header.module.css"
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
      <Button onClick={logout}>Log out</Button>
      <p>Én avgyok a Header</p>
    </div>
  );
}

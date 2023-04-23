import React from "react";
import "./Header.css"
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
    <header>
      <div id="HeaderTitle">
        <p id="AppName">d'ARTAGNAN COMPETITION CONTROL</p>
        <p id="AppVersion"><span>ALPHA</span><span>BUILD</span></p>
      </div>
      <div id="HeaderContent">
        <p className="RoleText">Organiser</p>
        <p className="UserNameText">{localStorage.getItem('username')}</p>
        <button onClick={logout} id="LogOutButton">Log out</button>
      </div>
    </header>
  );
}

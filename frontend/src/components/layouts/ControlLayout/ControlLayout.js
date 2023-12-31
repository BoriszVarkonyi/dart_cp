import React from "react";
import NavBar from "../../static/NavBar/NavBar";
import Header from "../../static/Header/Header";
import { Outlet } from "react-router-dom";
import Loading from "../../static/Loading/Loading";
import { useSelector } from "react-redux";
import "./ControlLayout.css";

export function ControlLayout() {
  return (
    <div id="ControlLayout">
      <Header />
      <NavBar />
      <Outlet />
      <div id="NavBarAccessory">
        <div>-</div>
        <div>-</div>
      </div>
    </div>
  )
}

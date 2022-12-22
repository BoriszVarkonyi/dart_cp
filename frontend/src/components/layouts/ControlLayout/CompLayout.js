import React from "react";
import NavBar from "../../static/NavBar/NavBar";
import Header from "../../static/Header/Header";
import { Outlet } from "react-router-dom";

export function CompLayout() {
  return (
    <>
      
      <Header/>
      <NavBar/>
      <Outlet/>
    </>
  )
}

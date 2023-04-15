import React from "react";
import NavBar from "../../static/NavBar/NavBar";
import Header from "../../static/Header/Header";
import { Outlet } from "react-router-dom";
import Loading from "../../static/Loading/Loading";
import "./TournamentLayout.css";

export function TournamentLayout() {
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
    </>
  )
}

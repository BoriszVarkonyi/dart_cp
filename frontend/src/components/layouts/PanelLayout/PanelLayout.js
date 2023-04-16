import React from "react";
import "./PanelLayout.css";
import Tournaments from "../../../views/Tournament/Tournaments";
import Tournament from "../../../views/Tournament/Tournament";
import { Route, Routes } from "react-router-dom";
import Loading from "../../static/Loading/Loading"

export default function LoginLayout() {
  return (
    <div id="PanelLayout">
      <Routes>
        <Route index element={<Tournaments />} />
        <Route path="/create_tournament" element={<Tournament type="Create" />} />
        <Route path="/modify_tournament" element={<Tournament type="Modify" />} />
      </Routes>
      <Loading />
    </div>
  );
}

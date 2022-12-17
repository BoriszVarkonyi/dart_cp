import React from "react";
import "./PanelLayout.styles.css";
import fencersImage from "../../../assets/fencers.svg";
import Tournaments from "../../../views/Tournament/Tournaments";
import Tournament from "../../../views/Tournament/Tournament";
import { Route, Routes } from "react-router-dom";

export default function LoginLayout() {
  return (
    <div className="PanelLayout">
      <Routes>
        <Route index element={<Tournaments />} />
        <Route path="/tournament" element={<Tournament />} />
      </Routes>
      {/* <img className="FencersImage" src={fencersImage} /> */}
    </div>
  );
}

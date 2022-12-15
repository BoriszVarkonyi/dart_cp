import React from "react";
import "./PanelLayout.styles.css";
import fencersImage from "../../../assets/fencers.svg";
import Tournaments from "../../../views/Tournament/Tournaments";
import { Route, Routes } from "react-router-dom";
import CreateTournament from "../../../views/Tournament/CreateTournament";

export default function LoginLayout() {
  return (
    <div className="PanelLayout">
      <Routes>
        <Route index element={<Tournaments/>}/>
        <Route path="/createtournament" element={<CreateTournament/>}/>
        <Route path="/tournament" element={<CreateTournament/>}/>
      </Routes>
      {/* <img className="FencersImage" src={fencersImage} /> */}
    </div>
  );
}

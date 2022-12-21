import React from "react";
import "./ControlLayout.css";
import { Route, Routes } from "react-router-dom";
import { CompetitionRoutes } from "./CompetitionRoutes";
import { useParams } from "react-router-dom";
import { get } from "../../../services/backend.service";

import NavBar from "../../static/NavBar/NavBar";
import Header from "../../static/Header/Header";

export default function ControlLayout() {
  const { id } = useParams();
  return (
    <div className="ControlLayout">
      check if its an existin
      tournamentaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      <Routes className="Main">
        <Route path=":id/*" element={<CompetitionRoutes />} />
      </Routes>
    </div>
  );
}

import React from "react";
import "./PanelLayout.css";
import Tournaments from "../../../views/Tournament/Tournaments";
import Tournament from "../../../views/Tournament/Tournament";
import { Route, Routes } from "react-router-dom";
import Loading from "../../static/Loading/Loading";
import Header from "../../static/Header/Header";
import { useSelector } from "react-redux";
import NotFound from "../../static/NotFound/NotFound";

export default function LoginLayout() {
  const { isLoading } = useSelector((state) => state.isLoading);
  return (
    <div id="PanelLayout">
      <Header />
      <div id="PanelWrapper">
        <Routes>
          <Route index element={<Tournaments />} />
          <Route
            path="/create_tournament"
            element={<Tournament type="Create" />}
          />
          <Route
            path="/modify_tournament"
            element={<Tournament type="Modify" />}
          />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        {isLoading && <Loading />}
      </div>
    </div>
  );
}

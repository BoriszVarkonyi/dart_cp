import React from "react";
import "./ControlLayout.css";
import { Route, Routes } from "react-router-dom";
import { CompLayout } from "./CompLayout";

import Competitions from "../../../views/Competition/Competitions";
import Timetable from "../../../views/Timetable/Timetable";
import Competitors from "../../../views/Competitor/Competitors";
import Registration from "../../../views/Registration/Registration";

export default function ControlLayout() {
  return (
    <div className="ControlLayout">
      <Routes className="Main">
        {/*First id is tournament id, second is Comp. id.*/}
        <Route path=":id" element={<CompLayout/>}>
          <Route path="competitions" element={<Competitions />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="competitors" element={<Competitors />} />
          <Route path="registration" element={<Registration />} />
        </Route>
      </Routes>
    </div>
  );
}

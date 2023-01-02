import React from "react";
import "./ControlLayout.css";
import { Route, Routes } from "react-router-dom";
import { CompLayout } from "./CompLayout";

import Competitions from "../../../views/Competition/Competitions";
import CreateCompetition from "../../../views/Competition/CreateCompetition";
import Timetable from "../../../views/Timetable/Timetable";
import Competitors from "../../../views/Competitor/Competitors";
import AddCompetitor from "../../../views/Competitor/AddCompetitor"
import Registration from "../../../views/Registration/Registration";
import WeaponControls from "../../../views/WeaponControl/WeaponControls"


export default function ControlLayout() {
  return (
    <div className="ControlLayout">
      <Routes className="Main">
        {/*First id is tournament id, second is Comp. id.*/}
        
        <Route path=":compId" element={<CompLayout/>}>
          <Route path="competitions">
            <Route index element={<Competitions />} />
            <Route path="create" element={<CreateCompetition/>}/>
          </Route>
          <Route path="timetable" element={<Timetable />} />
          <Route path="competitors">
          <Route index element={<Competitors />} />
          <Route path="add" element={<AddCompetitor/>}/>
          </Route>
          <Route path="registration" element={<Registration />} />
          <Route path="weapon_control" element={<WeaponControls/>}/>
        </Route>
      </Routes>
    </div>
  );
}

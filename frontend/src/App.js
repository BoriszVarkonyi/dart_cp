import { Route, Routes, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import LoginLayout from "./components/layouts/LoginLayout/LoginLayout";
import { TournamentLayout } from "./components/layouts/ControlLayout/TournamentLayout";
import PanelLayout from "./components/layouts/PanelLayout/PanelLayout";
import AuthVerify from "./common/AuthVerify";

import Competitions from "./views/Competition/Competitions";
import Competition from "./views/Competition/Competition";
import Timetable from "./views/Timetable/Timetable";
import Competitors from "./views/Competitor/Competitors";
import AddCompetitor from "./views/Competitor/AddCompetitor";
import ImportXML from "./views/Competitor/ImportXML";
import Registration from "./views/Registration/Registration";
import WeaponControls from "./views/WeaponControl/WeaponControls";

//Under construction. Will delete.


function App() {
  AuthVerify.refreshTokenTimer();
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/panel/*" element={<PanelLayout />} />
        <Route path=":tournamentId/*" element={<TournamentLayout />}>
          <Route path="competitions">
            <Route index element={<Competitions />} />
            <Route path="create" element={<Competition type="Create" />} />
            <Route path="modify" element={<Competition type="Modify" />} />
          </Route>
          <Route path="timetable" element={<Timetable />} />
          <Route path=":compId">
            <Route path="competitors">
              <Route index element={<Competitors />} />
              <Route path="add" element={<AddCompetitor />} />
              <Route path="importXML" element={<ImportXML />} />
            </Route>
            <Route path="registration" element={<Registration />} />
            <Route path="weapon_control" element={<WeaponControls />} />
          </Route>
        </Route>

        {/* Its just a test path*/}
        <Route path="test" element={<WeaponControls />} />
        <Route
          path="*"
          element={
            <h1>
              NINCS MEG NINCS MEG NINCS MEGNINCS MEGNINCS MEGNINCS MEGNINCS
              MEGNINCS MEGNINCS MEGNINCS MEGNINCS MEGNINCS MEGNINCS MEG
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;

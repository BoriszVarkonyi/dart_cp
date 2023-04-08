import { Route, Routes } from "react-router-dom";

import LoginLayout from "./components/layouts/LoginLayout/LoginLayout";
import { TournamentLayout } from "./components/layouts/ControlLayout/TournamentLayout";
import PanelLayout from "./components/layouts/PanelLayout/PanelLayout";
import useTokenService from "./common/AuthVerify";

import Competitions from "./views/Competition/Competitions";
import Competition from "./views/Competition/Competition";
import Timetable from "./views/Timetable/Timetable";
import Competitors from "./views/Competitor/Competitors";
import Competitor from "./views/Competitor/Competitor";
import ImportXML from "./views/Competitor/ImportXML";
import Registration from "./views/Registration/Registration";
import PrintBarcode from "./views/Registration/PrintBarcode";
import WeaponControls from "./views/WeaponControl/WeaponControls";
import WeaponControl from "./views/WeaponControl/WeaponControl";
import WeaponControlStatistics from "./views/WeaponControl/WeaponControlStatistics";
import NotFound from "./components/static/NotFound/NotFound";
import { useState } from "react";

//Under construction. Will delete.

function App() {
  const tokenHandler = useTokenService();
  const [isLoading, setIsloading] = useState(true)
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
              <Route path="add" element={<Competitor type="Add" />} />
              <Route path="modify" element={<Competitor type="Modify" />} />
              <Route path="importXML" element={<ImportXML />} />
            </Route>
            <Route path="registration">
              <Route index element={<Registration />} />
              <Route path=":fencerId/print" element={<PrintBarcode />} />
            </Route>
            <Route path="weapon_control">
              <Route index element={<WeaponControls />} />
              <Route path="add" element={<WeaponControl type="Add" />} />
              <Route path="modify" element={<WeaponControl type="Modify" />} />
              <Route path="statistics" element={<WeaponControlStatistics />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Its just a test path*/}
        <Route path="test" element={<WeaponControls />} />
        <Route path="not_found" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes, useNavigate } from "react-router-dom";

import LoginLayout from "./components/layouts/LoginLayout/LoginLayout";
import TournamentHandler from "./components/layouts/ControlLayout/TournamentHandler";
import PanelLayout from "./components/layouts/PanelLayout/PanelLayout";
import AuthVerify from "./common/AuthVerify";

//Under construction. Will delete.
import WeaponControls from "./views/WeaponControl/WeaponControls";

//Removes the tokens on page close
window.onbeforeunload = function() {
 // localStorage.removeItem('user');
}


function App() {
  AuthVerify.refreshTokenTimer();
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/panel/*" element={<PanelLayout />} />
        <Route path=":tournamentId/*" element={<TournamentHandler />} />

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

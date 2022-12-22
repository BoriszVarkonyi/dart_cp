import { Route, Routes, useNavigate } from "react-router-dom";

import LoginLayout from "./components/layouts/LoginLayout/LoginLayout";
import TournamentHandler from "./components/layouts/ControlLayout/TournamentHandler";
import PanelLayout from "./components/layouts/PanelLayout/PanelLayout";
import AuthVerify from "./common/AuthVerify";

//Under construction. Will delete.
import CreateCompetition from "./views/Competition/CreateCompetition";


function App() {
  AuthVerify.refreshTokenTimer();
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/panel/*" element={<PanelLayout />} />
        <Route path=":id/*" element={<TournamentHandler />} />

        {/* Its just a test path*/}
        <Route path="test" element={<CreateCompetition />} />
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

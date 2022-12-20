import { Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import LoginLayout from "./components/layouts/LoginLayout/LoginLayout";
import TournamentHandler from "./components/layouts/ControlLayout/TournamentHandler";
import PanelLayout from "./components/layouts/PanelLayout/PanelLayout";
import AuthVerify from "./common/AuthVerify";
import AuthService from "./services/auth.services";

function App() {
  AuthVerify.refreshTokenTimer();
  
  const navigate = useNavigate();

  const logout = () => {
    navigate("/")
    AuthService.logout();
    window.location.reload();
  };

  return (
    <>
      <Button onClick={logout}>Log out</Button>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/panel/*" element={<PanelLayout />} />
        <Route path=":id/*" element={<TournamentHandler />} />
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

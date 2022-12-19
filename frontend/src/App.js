import { Route, Routes } from "react-router-dom";
import LoginLayout from "./components/layouts/LoginLayout/LoginLayout";
import ControlLayout from "./components/layouts/ControlLayout/ControlLayout";
import PanelLayout from "./components/layouts/PanelLayout/PanelLayout";
import Profile from "./views/Login/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/panel/*" element={<PanelLayout />} />
        <Route path="/control/*" element={<ControlLayout />} />
        <Route path="/profile" element={<Profile />} />
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

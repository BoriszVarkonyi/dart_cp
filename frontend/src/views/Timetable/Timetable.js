import React from "react";
import { Button } from "@mui/material";

export default function Timetable() {
  console.log("help");
  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Timetable</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained">REMOVE WEAPON CONTROL PERIOD</Button>
          <Button variant="contained">MODIFY WEAPON CONTROL PERIOD</Button>
          <Button variant="contained">ADD WEAPON CONTROL PERIOD</Button>
          <Button variant="contained">OPEN BOOKINGS</Button>
        </div>
        <div className="PanelContentSingle">
            <h3>Ide jön a timetable</h3>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "@mui/material";
//import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="NavBar">
      <div>
        <h3>d'ARTAGNAN CONTROL</h3>
        <h3>TOURNAMENT</h3>
        <Button>Competitions</Button>
        <Button>Timetable</Button>
        <h3>COMPETITION</h3>
        <Button>Competitors</Button>
        <Button>Registration</Button>
        <Button>Weapon Control</Button>
      </div>
    </div>
  );
}

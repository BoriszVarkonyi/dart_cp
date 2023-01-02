import React from "react";
import styles from "./NavBar.module.css";
import { Button } from "@mui/material";
//import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className={styles.NavBar}>
      <p className="AppName">d'ARTAGNAN CONTROL</p>
      <div className="NavBarList">
        <p className="NavBarSectionTitle">TOURNAMENT</p>
        <div className="NavBarSection">
          <Button>Competitions</Button>
          <Button>Timetable</Button>
        </div>
        <p className="NavBarSectionTitle">COMPETITION</p>
        <div className="NavBarSection">
          <Button>Competitors</Button>
          <Button>Registration</Button>
          <Button>Weapon Control</Button>
        </div>
      </div>
    </div>
  );
}

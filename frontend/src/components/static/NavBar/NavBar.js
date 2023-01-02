import React from "react";
import styles from "./NavBar.module.css";
import { Button } from "@mui/material";
//import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="NavBar">
        <div>
          <h3>d'ARTAGNAN CONTROL</h3>
          <h3>TOURNAMENT</h3>
          <Link to="competitions" >Competitions</Link>
          <Link to="timetable">Timetable</Link>
          <h3>COMPETITION</h3>
          <Link to="competitors">Competitors</Link>
          <Link to="registration">Registration</Link>
          <Link>Weapon Control</Link>
        </div>
      </div>
    </>
  );
}

import React from "react";
import styles from "./NavBar.css";
import { Button } from "@mui/material";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HorseImage from "../../../assets/horse.svg";
import FlagIcon from "@mui/icons-material/Flag";
import DateRangeIcon from '@mui/icons-material/DateRange';
import GroupsIcon from '@mui/icons-material/Groups';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import BackpackIcon from '@mui/icons-material/Backpack';

export default function NavBar() {
  return (
    <>
      <div className="NavBar">
        <div className="NavBarHead">
          <img className="LogoImage" src={HorseImage} />
          <p className="AppName">d'ARTAGNAN</p>
        </div>
        <div className="NavBarContent">
          <p className="NavBarSectionTitle">Tournament</p>
          <div className="NavBarSection">
            <Link to="competitions">
              <div className="NavBarRow">
                <div className="NavBarIconWrapper">
                  <FlagIcon />
                </div>
                <p className="NavBarRowTitle">Competitions</p>
              </div>
            </Link>

            <Link to="timetable">
              <div className="NavBarRow">
                <div className="NavBarIconWrapper">
                  <DateRangeIcon />
                </div>
                <p className="NavBarRowTitle">Timetable</p>
              </div>
            </Link>
          </div>
          

          <div className="CompetitionSelect">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  displayEmpty
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={10}
                  sx={{ width: 100 }}
                >
                  <MenuItem disabled value="">
                    <em>Select Competition</em>
                  </MenuItem>
                  <MenuItem value={10}>Comp 1</MenuItem>
                  <MenuItem value={20}>Comp 2</MenuItem>
                  <MenuItem value={30}>Comp 3</MenuItem>
                </Select>
              </FormControl>
            </div>

          <p className="NavBarSectionTitle">Competition</p>
          <div className="NavBarSection">

            <Link to="competitors">
              <div className="NavBarRow">
                <div className="NavBarIconWrapper">
                  <GroupsIcon />
                </div>
                <p className="NavBarRowTitle">Competitors</p>
              </div>
            </Link>

            <Link to="registration">
              <div className="NavBarRow">
                <div className="NavBarIconWrapper">
                  <HowToRegIcon />
                </div>
                <p className="NavBarRowTitle">Registration</p>
              </div>
            </Link>

            <Link to="weapon_control">
              <div className="NavBarRow">
                <div className="NavBarIconWrapper">
                  <BackpackIcon />
                </div>
                <p className="NavBarRowTitle">Weapon Control</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

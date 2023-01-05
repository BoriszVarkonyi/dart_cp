import React, { useState, useEffect } from "react";
import styles from "./NavBar.css";
import { Button } from "@mui/material";
import { FormControl, TextField, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import HorseImage from "../../../assets/horse.svg";
import FlagIcon from "@mui/icons-material/Flag";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GroupsIcon from "@mui/icons-material/Groups";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BackpackIcon from "@mui/icons-material/Backpack";
import { get } from "../../../services/backend.service";

export default function NavBar() {
  const [compdId, setCompId] = useState(null);
  const [hasSelectedComp, setHasSelectedComp] = useState(false);
  const [menuItems, setMenuItems] = useState([])

  const setComp = (id) => {
    setCompId(id);
    setHasSelectedComp(true);
  };

  const setMenuItem = (data) => {
    return (
      <MenuItem key={data.id} onClick={() => setComp(data.id)} value={data.id}>
        {data.title_long}
      </MenuItem>
    );
  };

  //Gets the tournaments from api
  useEffect(() => {
    async function getData() {
      const data = await get("competitions/");
      const menuItems = data.map((e)=>setMenuItem(e))
      setMenuItems(menuItems)
    }
    getData();
  }, []);

  return (
    <>
      <div className="NavBar">
        <div className="NavBarHead">
          <img className="LogoImage" src={HorseImage} />
          <p className="AppName">d'ARTAGNAN</p>
        </div>
        <div className="NavBarContent">
          <div>
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
                <TextField
                  select
                  label="Select competition"
                  id="select_comp_id"
                  defaultValue=""
                  sx={{ width: 100 }}
                >
                  {menuItems}
                </TextField>
              </FormControl>
            </div>
            {hasSelectedComp && (
              <>
                <p className="NavBarSectionTitle">Competition</p>
                <div className="NavBarSection">
                  <Link to={`${compdId}/competitors`}>
                    <div className="NavBarRow">
                      <div className="NavBarIconWrapper">
                        <GroupsIcon />
                      </div>
                      <p className="NavBarRowTitle">Competitors</p>
                    </div>
                  </Link>

                  <Link to={`${compdId}/registration`}>
                    <div className="NavBarRow">
                      <div className="NavBarIconWrapper">
                        <HowToRegIcon />
                      </div>
                      <p className="NavBarRowTitle">Registration</p>
                    </div>
                  </Link>

                  <Link to={`${compdId}/weapon_control`}>
                    <div className="NavBarRow">
                      <div className="NavBarIconWrapper">
                        <BackpackIcon />
                      </div>
                      <p className="NavBarRowTitle">Weapon Control</p>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

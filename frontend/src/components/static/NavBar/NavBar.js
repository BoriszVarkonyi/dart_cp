import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./NavBar.css";
import { Button } from "@mui/material";
import { FormControl, TextField, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import FlagIcon from "@mui/icons-material/Flag";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GroupsIcon from "@mui/icons-material/Groups";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BackpackIcon from "@mui/icons-material/Backpack";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { get } from "../../../services/backend.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, withRouter } from "react-router-dom";
import { setCompetitions } from "../../../slices/compSlice";
import { Cookies, useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies, setCookies] = useCookies("selectedComp");
  const [compdId, setCompId] = useState(cookies["selectedComp"] == undefined ? "" : cookies["selectedComp"]);
  const [hasSelectedComp, setHasSelectedComp] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const { tournamentId } = useParams();
  const { competitions } = useSelector((state) => state.competitions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setComp = (id) => {
    setCookies("selectedComp", id, { path: "/" });
    setCompId(id);
    setHasSelectedComp(true);
    const pathName = window.location.pathname.split("/");
    if (!pathName.includes("competitions") && !pathName.includes("timetable")) {
      if(pathName[3] !== undefined && pathName[3] !== null){
        navigate(`/${tournamentId}/${id}/${pathName[3]}`);
      }
      else{
        navigate(`/${tournamentId}/${id}`);
      }
    }
  };

  const setMenuItem = (data) => {
    return (
      <MenuItem key={data.id} onClick={() => setComp(data.id)} value={data.id}>
        {data.title_long}
      </MenuItem>
    );
  };

  async function getData() {
    const data = await get(`tournaments/${tournamentId}/competitions/`);
    dispatch(setCompetitions(data));
    const menuItems = data.map((e) => setMenuItem(e));
    setMenuItems(menuItems);
  }

  //Loades the competitions at the first render.
  useEffect(() => {
    getData();
  }, []);

  function isCompExists() {
    const value = competitions.filter((e) => e.id == compdId).length;
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  }

  //Makes the selection responsive. Competitions is a redux store state.
  useEffect(() => {
    const menuItems = competitions.map((e) => setMenuItem(e));
    setMenuItems(menuItems);
    if (isCompExists()) {
      setHasSelectedComp(true);
    } else {
      setHasSelectedComp(false);
    }
  }, [competitions]);

  return (
    <nav>
      <div className="NavBarContent">
        <div className="NavBarContentInner">
          <Link className="NavBarTextButton" to="/panel">back to tournaments...</Link>
          <p className="NavBarSectionTitle">Tournament</p>
          <div className="NavBarSection Top">
            <Link to="competitions">
              <div className="NavBarRow">
                <div className="NavBarIconWrapper">
                  <FlagIcon />
                </div>
                <p className="NavBarRowTitle">Competitions</p>
              </div>
            </Link>
            {/*
            <Link to="timetable">
              <div className="NavBarRow">
                <div className="NavBarIconWrapper">
                  <DateRangeIcon />
                </div>
                <p className="NavBarRowTitle">Timetable</p>
              </div>
            </Link>
            */}
          </div>

          <div className="CompetitionSelect">
            <FormControl sx={{ m: 0, width: 200 }} size="small">
              <TextField
                select
                label="Select competition"
                id="select_comp_id"
                value={compdId}
                sx={{
                  width: "100%",
                }}
                onChange={(e) => setCompId(e.target.value)}
              >
                {menuItems}
              </TextField>
            </FormControl>
          </div>
          {hasSelectedComp && (
            <>
              <p className="NavBarSectionTitle Bottom">Competition</p>
              <div className="NavBarSection Bottom">
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
          {/*
          <div className="NavBarSection">
            <p className="NavBarSectionTitle">Languages</p>
            <div className="NavBarRow" onClick={() => alert('en')}>
              <div className="NavBarIconWrapper">🇬🇧</div>
              <p className="NavBarRowTitle">English</p>
            </div>
            <div className="NavBarRow" onClick={() => alert('hu')}>
              <div className="NavBarIconWrapper">🇭🇺</div>
              <p className="NavBarRowTitle">Hungarian</p>
            </div>
          </div>
          */}
        </div>
      </div>
      {/*
      <button className="NavBarButton">
        <FirstPageIcon />
      </button>
      */}
    </nav>
  );
}

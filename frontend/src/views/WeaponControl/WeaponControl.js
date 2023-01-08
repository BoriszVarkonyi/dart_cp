import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function WeaponControl(props) {
const navigate = useNavigate()

  const title = `${props.type} Weapon control of`;
  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle"> {title}</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" onClick={()=> navigate(-1)}>Cancel</Button>
          <Button variant="contained">Save weapon control</Button>
        </div>
      </div>
      <div className="Panel"></div>
    </div>
  );
}

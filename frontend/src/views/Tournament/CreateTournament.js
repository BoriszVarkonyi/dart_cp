import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateTournament() {
  const navigate = useNavigate();

  //Button functions
  const cancelButton = () =>{
    navigate(-1)
  }
  return (
    <div className="Panel">
      <div className="PageHeader">
        <h2>Create new tournament</h2>
        <div>
          <Button variant="contained" onClick={cancelButton}>Cancel</Button>
          <Button variant="contained">Save</Button>
          <Button variant="contained">Save & Open</Button>
        </div>
      </div>
      <div className="PanelContent">
        <TextField
          label="Name"
          type="text"
          margin="normal"
          size="small"
          variant="filled"
        />
        ide jönne date picker
      </div>
    </div>
  );
}

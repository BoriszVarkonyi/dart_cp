import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function Tournament() {
  const navigate = useNavigate();

  //Button functions
  const cancelButton = () => {
    navigate(-1)
  }
  return (
    <div className="Panel">
      <div className="PageHeader">
        <h2 className="PageTitle">Create new tournament</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" onClick={cancelButton}>Cancel</Button>
          <Button variant="contained">Save</Button>
          <Button variant="contained">Save & Open</Button>
        </div>
      </div>
      <Box className="PanelContent" component="form">
        <div className="FormColumn">
          <TextField
            label="Name"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
          />
        </div>
        <div className="FormColumn">
          <TextField
            id="date"
            label="Starting Date"
            type="date"
            size="small"
            variant="filled"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }} />
          <TextField
            id="date"
            label="Starting Date"
            type="date"
            size="small"
            variant="filled"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }} />
        </div>
      </Box>
    </div>
  );
}

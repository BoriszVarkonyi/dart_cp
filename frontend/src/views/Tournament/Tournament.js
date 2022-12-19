import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { post } from "../../services/backend.service";
import { useSelector } from "react-redux";

export default function Tournament() {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  if (!isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  //Button functions
  const cancelButton = () => {
    navigate(-1)
  }

  const onSubmitSave = (data) => {
    post("tournaments/", data);
    return <Navigate to="/tournaments"/>;
  }

  const onSubmitSaveOpen = (data) => {
    post("tournaments/", data);
    return <Navigate to="/tournaments"/>;
  }

  return (
    <div className="Panel">
      <div className="PageHeader">
        <h2 className="PageTitle">Create new tournament</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" onClick={cancelButton}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmitSave)}>Save</Button>
          <Button variant="contained">Save & Open</Button>
        </div>
      </div>
      <Box className="PanelContent" component="form">
        <div className="FormColumn">
          <TextField
            error={!!errors.title_long}
            helperText={errors?.title_long?.message}
            label="Name"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("title_long", { required: "Please enter a name!"})}
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
            }}
            {...register("starting_date", { required: "Please enter a start date!"})} 
            />
          <TextField
            id="date"
            label="Ending Date"
            type="date"
            size="small"
            variant="filled"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("ending_date", { required: "Please enter an end date!"})} 
            />
        </div>
      </Box>
    </div>
  );
}

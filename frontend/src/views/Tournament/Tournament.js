import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { post, update } from "../../services/backend.service";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Tournament(props) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { rowId } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitSave = async (data) => {
    if (props.type == "Create") {
      await post("tournaments/", data);
    } else if (props.type == "Modify") {
      await update(`tournaments/${rowId}/`, data);
    }
    return navigate(-1);
  };

  const onSubmitSaveOpen = async (data) => {
    //const resp = await post("tournaments/", data);
    //return navigate(`/competition/${resp.id}`)
  };

  const text = `${props.type} tournament`;
  return (
    <div className="Panel">
      <div className="PageHeader">
        <h2 className="PageTitle">{text}</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmitSave)}>
            Save
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmitSaveOpen)}>
            Save & Open
          </Button>
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
            {...register("title_long", { required: "Please enter a name!" })}
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
            {...register("starting_date", {
              required: "Please enter a start date!",
            })}
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
            {...register("ending_date", {
              required: "Please enter an end date!",
            })}
          />
        </div>
      </Box>
    </div>
  );
}

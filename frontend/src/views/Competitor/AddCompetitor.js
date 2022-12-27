import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormControl, MenuItem, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { post } from "../../services/backend.service";

export default function AddCompetitor() {
  const [isOther, setIsOther] = useState(false);
  const navigate = useNavigate();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
  };

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Add Competitor</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" onClick={() => navigate(-1)}>CANCEL</Button>
          <Button form="add-form" variant="contained" type="submit">
            ADD COMPETITOR
          </Button>
        </div>
      </div>
      <div className="Panel">
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          id="add-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            error={!!errors.fName}
            helperText={errors?.fName?.message}
            label="First Name"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("fName", {
              required: "Please enter your first name!",
            })}
          />

          <TextField
            error={!!errors.lName}
            helperText={errors?.lName?.message}
            label="Last Name"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("lName", {
              required: "Please enter your last name!",
            })}
          />

          <FormControl variant="filled">
            <TextField
              error={!!errors.sex}
              helperText={errors?.sex?.message}
              select
              label="Sex"
              id="sex"
              defaultValue=""
              {...register("sex", { required: "Please choose sex!" })}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="mix">Mix</MenuItem>
            </TextField>
          </FormControl>

          <TextField
            error={!!errors.dateOfBirth}
            helperText={errors?.dateOfBirth?.message}
            id="date-of-birth"
            label="Date of Birth"
            type="date"
            size="small"
            variant="filled"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            {...register("dateOfBirth", {
              required: "Please enter your date of birth!",
            })}
          />

          <FormControl variant="filled">
            <TextField
              error={!!errors.laterality}
              helperText={errors?.laterality?.message}
              select
              label="Laterality"
              id="laterality"
              defaultValue=""
              {...register("laterality", {
                required: "Please select laterality!",
              })}
            >
              <MenuItem value="left">Left</MenuItem>
              <MenuItem value="right">Right</MenuItem>
            </TextField>
          </FormControl>

          <TextField
            error={!!errors.license}
            helperText={errors?.license?.message}
            label="License"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("license", {
              required: "Please enter your license!",
            })}
          />

          <TextField
            error={!!errors.points}
            helperText={errors?.points?.message}
            label="Points"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("points", {
              required: "Please enter the points!",
            })}
          />

          <TextField
            error={!!errors.classement}
            helperText={errors?.classement?.message}
            label="Classement"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("classement", {
              required: "Please enter the classement!",
            })}
          />

          <FormControl variant="filled">
            <TextField
              error={!!errors.nationality}
              helperText={errors?.nationality?.message}
              select
              label="Nationality"
              id="nationality"
              defaultValue=""
              {...register("nationality", {
                required: "Please choose a nationality!",
              })}
            >
              <MenuItem value="nope">Biztos hogy nem írom ki</MenuItem>
            </TextField>
          </FormControl>

          {!isOther && (
            <FormControl variant="filled">
              <TextField
                error={!!errors.club}
                helperText={errors?.club?.message}
                select
                label="Club"
                id="club"
                defaultValue=""
                {...register("club", {
                  required: "Please choose a club!",
                })}
              >
                <MenuItem value="nope">Biztos hogy nem írom ki</MenuItem>
                <MenuItem onClick={() => setIsOther(true)}>Other</MenuItem>
              </TextField>
            </FormControl>
          )}

          {isOther && (
            <TextField
              error={!!errors.club}
              helperText={errors?.club?.message}
              label="Club"
              type="text"
              margin="normal"
              size="small"
              variant="filled"
              autoFocus
              {...register("club", {
                required: "Please choose a club!",
              })}
            />
          )}
        </Box>
      </div>
    </div>
  );
}

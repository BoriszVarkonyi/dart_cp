import React, { useEffect, useState, useSearchParams } from "react";
import { useNavigate } from "react-router-dom";

import { FormControl, MenuItem, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { post } from "../../services/backend.service";

import {useParams} from 'react-router-dom';

export default function AddCompetitor() {
  const [isOther, setIsOther] = useState(false);
  const navigate = useNavigate();
  let { id, compId } = useParams();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //DON'T USE THIS IN PRODUCTION!!!!
  //TODO: get competition id from URL
  const onSubmit = async (data) => {
    data.competitions = [`http://localhost:8082/api/competitions/${compId}/`]; //WARNING!!!!
    data.statut = 'F'; //WARNING!!!!
    data.barcode = Math.floor(Math.random() * (69420) + 420); //WARNING!!!!
    console.log(data);
    post("fencers/", data);
  };

  //TODO: ID max length is 24
  //TODO: nom, pre_nom max length is 72
  //TODO: licence max length is 12
  //TODO: import nation MenuItem from JSON or something
  //TODO: club max length is 256

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
            error={!!errors.id}
            helperText={errors?.id?.message}
            label="Fencer id"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("id", {
              required: "Please enter an ID!",
            })}
          />
          <TextField
            error={!!errors.pre_nom}
            helperText={errors?.pre_nom?.message}
            label="First Name"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("pre_nom", {
              required: "Please enter your first name!",
            })}
          />
          <TextField
            error={!!errors.nom}
            helperText={errors?.nom?.message}
            label="Last Name"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("nom", {
              required: "Please enter your last name!",
            })}
          />

          <FormControl variant="filled">
            <TextField
              error={!!errors.sexe}
              helperText={errors?.sexe?.message}
              select
              label="Sex"
              id="sex"
              defaultValue=""
              {...register("sexe", { required: "Please choose sex!" })}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="X">Mix</MenuItem>
            </TextField>
          </FormControl>
          
          <TextField
            error={!!errors.date_naissance}
            helperText={errors?.date_naissance?.message}
            id="date-of-birth"
            label="Date of Birth"
            type="date"
            size="small"
            variant="filled"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            {...register("date_naissance", {
              required: "Please enter your date of birth!",
            })}
          />

          <FormControl variant="filled">
            <TextField
              error={!!errors.lateralite}
              helperText={errors?.lateralite?.message}
              select
              label="Laterality"
              id="laterality"
              defaultValue=""
              {...register("lateralite", {
                required: "Please select laterality!",
              })}
            >
              <MenuItem value="G">Left</MenuItem>
              <MenuItem value="D">Right</MenuItem>
            </TextField>
          </FormControl>

          <TextField
            error={!!errors.licence}
            helperText={errors?.licence?.message}
            label="License"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("licence", {
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
              error={!!errors.nation}
              helperText={errors?.nation?.message}
              select
              label="Nationality"
              id="nationality"
              defaultValue=""
              {...register("nation", {
                required: "Please choose a nationality!",
              })}
            >
              <MenuItem value="HUN">Hungary</MenuItem>
              <MenuItem value="ALB">Albania</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </FormControl>

          {!isOther && (
              <TextField
                error={!!errors.club}
                helperText={errors?.club?.message}
                label="Club"
                id="club"
                defaultValue=""
                {...register("club", {
                  required: "Please choose a club!",
                })}
              >
              </TextField>
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

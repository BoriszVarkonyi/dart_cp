import React, { useEffect, useState, useSearchParams } from "react";
import { useNavigate } from "react-router-dom";

import { FormControl, MenuItem, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { post } from "../../services/backend.service";
import countries from "../../components/static/countries.json";

import {useParams} from 'react-router-dom';

export default function AddCompetitor() {
  const [isOther, setIsOther] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  let { tourId, compId } = useParams();

  const generateMenuItem = (country) => {
    return ( 
        <MenuItem key={country.short} value={country.short}>{country.long}</MenuItem>
    )
  };

  useEffect(() => {
    function setMenuItemsFromJson() {
        const menuItems = countries.countries.map(c => generateMenuItem(c));
        setMenuItems(menuItems);
    }
    setMenuItemsFromJson();
  }, []);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.competitions = [ compId ];
    data.statut = 'N'; // Default statut for a fencer
    data.barcode = 0;
    const resp = await post("fencers/", data);

    if(resp.name && resp.name == "AxiosError")
      alert(resp.message);
    else {
      alert("Successfully added fencer!");
      navigate(-1);
    }
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
            error={!!errors.id}
            helperText={errors?.id?.message}
            label="Fencer id"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("id", {
              required: { value: true, message: "Please enter an ID!"},
              maxLength: { value: 24, message: "Field cannot be longer than 24 characters!" },
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
              required: { value: true, message: "Please enter your first name!" },
              maxLength: { value: 72, message: "Field cannot be longer than 72 characters!" },
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
              required: { value: true, message: "Please enter your last name!" },
              maxLength: { value: 72, message: "Field cannot be longer than 72 characters!" },
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
              required: { value: true, message: "Please enter your license!", },
              maxLength: { value: 12, message: "Field cannot be longer than 12 characters!" },
            })}
          />

          <TextField
            error={!!errors.points}
            helperText={errors?.points?.message}
            label="Points"
            type="number"
            margin="normal"
            size="small"
            variant="filled"
            {...register("points", {
              required: { value: true, message: "Please enter the points!", },
              maxLength: { value: 11, message: "Field cannot be longer than 11 numbers!" },
            })}
          />

          <TextField
            error={!!errors.classement}
            helperText={errors?.classement?.message}
            label="Classement"
            type="number"
            margin="normal"
            size="small"
            variant="filled"
            {...register("classement", {
              required: { value: true, message: "Please enter the classement!" },
              maxLength: { value: 11, message: "Field cannot be longer than 11 numbers!" },
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
              {menuItems}
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
                  required: { value: true, message: "Please choose a club!" },
                  maxLength: { value: 256, message: "Field cannot be longer than 256 characters!" },
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
                required: { value: true, message: "Please choose a club!" },
                maxLength: { value: 256, message: "Field cannot be longer than 256 characters!" },
              })}
            />
          )}
        </Box>
      </div>
    </div>
  );
}

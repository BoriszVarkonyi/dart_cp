import React, { useEffect, useState } from "react";

import {
  FormControl,
  MenuItem,
  TextField,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { post } from "../../services/backend.service";

export default function CreateCompetition() {
  const [isOther, setIsOther] = useState(false);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
   // await post("competitions/", data);
  }
  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Create competition</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained">CANCEL</Button>
          <Button form="create-form" variant="contained" type="submit">
            CREATE COMPETITION
          </Button>
        </div>
      </div>
      <div className="Panel">
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          id="create-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            error={!!errors.compName}
            helperText={errors?.compName?.message}
            label="Name"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("compName", {
              required: "Please enter the competition name!",
            })}
          />

          <FormControl variant="filled">
            <TextField
              error={!!errors.weaponType}
              helperText={errors?.weaponType?.message}
              select
              label="Weapon type"
              id="weapon-type"
              defaultValue=""
              {...register("weaponType", {
                required: "Please choose a weapon type!",
              })}
            >
              <MenuItem value="epee">Epee</MenuItem>
              <MenuItem value="foil">Foil</MenuItem>
              <MenuItem value="sabre">Sabre</MenuItem>
            </TextField>
          </FormControl>

          <FormControl variant="filled">
            <TextField
              error={!!errors.isWheel}
              helperText={errors?.isWheel?.message}
              select
              label="Wheelchair"
              id="wheelchair"
              defaultValue={false}
              {...register("isWheel", { required: "Ide mit kéne írni?:c" })}
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </TextField>
          </FormControl>

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

          <FormControl variant="filled">
            <TextField
              error={!!errors.compType}
              helperText={errors?.compType?.message}
              select
              label="Competition type"
              id="compType"
              defaultValue=""
              {...register("compType", {
                required: "Please choose a competition type!",
              })}
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="team">Team</MenuItem>
            </TextField>
          </FormControl>

          {!isOther && (
            <FormControl variant="filled">
              <TextField
                error={!!errors.ageGroup}
                helperText={errors?.ageGroup?.message}
                select
                label="Age group"
                id="ageGroup"
                defaultValue=""
                {...register("ageGroup", {
                  required: "Please choose an age gorup!",
                })}
              >
                <MenuItem value="cadet">Cadet</MenuItem>
                <MenuItem value="junior">Junior</MenuItem>
                <MenuItem value="u23">U23</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
                <MenuItem value="veteran">Veteran</MenuItem>
                <MenuItem onClick={() => setIsOther(true)}>Other</MenuItem>
              </TextField>
            </FormControl>
          )}

          {isOther && (
            <TextField
              error={!!errors.ageGroup}
              helperText={errors?.ageGroup?.message}
              label="Age group"
              type="text"
              margin="normal"
              size="small"
              variant="filled"
              autoFocus
              {...register("ageGroup", {
                required: "Please choose an age gorup!",
              })}
            />
          )}

          <FormControl variant="filled">
            <TextField
              error={!!errors.hostCountry}
              helperText={errors?.hostCountry?.message}
              select
              label="Host country"
              id="hostCountry"
              defaultValue=""
              {...register("hostCountry", {
                required: "Please choose a host country!",
              })}
            >
              <MenuItem value="nope">Biztos hogy nem írom ki</MenuItem>
            </TextField>
          </FormControl>

          <TextField
            error={!!errors.address}
            helperText={errors?.address?.message}
            label="Address and location"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("address", { required: "Please enter an address!" })}
          />

          <TextField
            error={!!errors.fee}
            helperText={errors?.fee?.message}
            label="Entry fee"
            type="number"
            margin="normal"
            size="small"
            variant="filled"
            {...register("fee", { required: "Please enter a fee!" })}
          />
          <TextField
            error={!!errors.currency}
            helperText={errors?.currency?.message}
            label="Currency"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
            {...register("currency", { required: "Please enter a currency!" })}
          />

          <TextField
            error={!!errors.startingDate}
            helperText={errors?.startingDate?.message}
            id="date"
            label="Starting Date"
            type="date"
            size="small"
            variant="filled"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            {...register("startingDate", {
              required: "Please choose a starting date!",
            })}
          />
          <TextField
            error={!!errors.endingDate}
            helperText={errors?.endingDate?.message}
            id="date"
            label="Ending Date"
            type="date"
            size="small"
            variant="filled"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            {...register("endingDate", {
              required: "Please choose an ending date!!",
            })}
          />
        </Box>
      </div>
    </div>
  );
}

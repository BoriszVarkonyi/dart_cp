import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { FormControl, MenuItem, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { post, update, get } from "../../services/backend.service";

const setData = (element) => {
  return {
    id: element.id,
    name: element.title_long,
    weapon_type: element.weapon_type,
    is_wheelchair: element.is_wheelchair,
    sex: element.sex,
    type: element.type,
    age_group: element.age_group,
  };
};

export default function Competition(props) {
  const [isOther, setIsOther] = useState(false);
  const [modifyData, setModifyData] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  const { rowId } = state;
  let { tournamentId } = useParams();
  const ref = useRef(null);

  //react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title_long: modifyData.title_long
    }
  });

  useEffect(() => {
    async function getData() {
      const response = await get(`/competitions/${rowId}`);
      setModifyData(response);
    }
    getData();
  }, []);

  useEffect(() => {
    // reset form with user data
    console.log(modifyData)
    reset(modifyData);
}, [modifyData]);

  const onSubmit = async (data) => {
    if (props.type == "Create") {
      await post("competitions/", { ...data, tournaments: tournamentId });
      navigate(-1);
    } else if (props.type == "Modify") {
      await update(`competitions/${rowId}/`, {
        ...data,
        tournaments: tournamentId,
      });
      navigate(-1);
    }
  };

  const text = `${props.type} competition`;

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle"> {text}</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" onClick={() => navigate(-1)}>
            CANCEL
          </Button>
          <Button form="create-form" variant="contained" type="submit">
            {text}
          </Button>
        </div>
      </div>
      <div className="PageContent">
        <Box
          className="PageContentInner Form"
          component="form"
          display="flex"
          flexDirection="column"
          id="create-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="FormColumn">
            <TextField
              error={!!errors.title_long}
              helperText={errors?.title_long?.message}
              label="Name"
              type="text"
              margin="normal"
              size="small"
              variant="filled"
              {...register("title_long", {
                required: "Please enter the competition name!",
                maxLength: {
                  value: 72,
                  message: `Field cannot be longer than 72 characters!`,
                },
              })}
            />

            <FormControl variant="filled">
              <TextField
                error={!!errors.weapon_type}
                helperText={errors?.weapon_type?.message}
                select
                label="Weapon type"
                id="weapon-type"
                defaultValue=""
                {...register("weapon_type", {
                  required: "Please choose a weapon type!",
                })}
              >
                <MenuItem value="E">Epee</MenuItem>
                <MenuItem value="F">Foil</MenuItem>
                <MenuItem value="S">Sabre</MenuItem>
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
                {...register("sex", { required: "Please choose sex!" })}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="X">Mix</MenuItem>
              </TextField>
            </FormControl>

            <FormControl variant="filled">
              <TextField
                error={!!errors.type}
                helperText={errors?.type?.message}
                select
                label="Competition type"
                id="compType"
                defaultValue=""
                {...register("type", {
                  required: "Please choose a competition type!",
                })}
              >
                <MenuItem value="I">Individual</MenuItem>
                <MenuItem value="T">Team</MenuItem>
              </TextField>
            </FormControl>
          </div>

          <div className="FormColumn">
            {!isOther && (
              <FormControl variant="filled">
                <TextField
                  error={!!errors.age_group}
                  helperText={errors?.age_group?.message}
                  select
                  label="Age group"
                  id="ageGroup"
                  defaultValue=""
                  {...register("age_group", {
                    required: "Please choose an age gorup!",
                    maxLength: {
                      value: 64,
                      message: `Field cannot be longer than 64 characters!`,
                    },
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
                error={!!errors.age_group}
                helperText={errors?.age_group?.message}
                label="Age group"
                type="text"
                margin="normal"
                size="small"
                variant="filled"
                autoFocus
                {...register("age_group", {
                  required: "Please choose an age gorup!",
                  maxLength: {
                    value: 64,
                    message: `Field cannot be longer than 64 characters!`,
                  },
                })}
              />
            )}

            <FormControl variant="filled">
              <TextField
                error={!!errors.host_country}
                helperText={errors?.host_country?.message}
                select
                label="Host country"
                id="hostCountry"
                defaultValue=""
                {...register("host_country", {
                  required: "Please choose a host country!",
                })}
              >
                <MenuItem value="ALA">Biztos hogy nem írom ki</MenuItem>
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
              {...register("address", {
                required: "Please enter an address!",
                maxLength: {
                  value: 128,
                  message: `Field cannot be longer than 128 characters!`,
                },
              })}
            />

            <div className="FormRow">
              <TextField
                error={!!errors.entry_fee}
                helperText={errors?.entry_fee?.message}
                label="Entry fee"
                type="number"
                margin="normal"
                size="small"
                variant="filled"
                {...register("entry_fee", { required: "Please enter a fee!" })}
              />
              <TextField
                error={!!errors.currency}
                helperText={errors?.currency?.message}
                label="Currency"
                type="text"
                margin="normal"
                size="small"
                variant="filled"
                {...register("currency", {
                  required: "Please enter a currency!",
                })}
              />
            </div>
          </div>

          <div className="FormColumn">
            <TextField
              error={!!errors.start_date}
              helperText={errors?.start_date?.message}
              id="date"
              label="Starting Date"
              type="date"
              size="small"
              variant="filled"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              {...register("start_date", {
                required: "Please choose a starting date!",
                maxLength: {
                  value: 31,
                  message: `Field cannot be longer than 31 characters!`,
                },
              })}
            />
            <TextField
              error={!!errors.end_date}
              helperText={errors?.end_date?.message}
              id="date"
              label="Ending Date"
              type="date"
              size="small"
              variant="filled"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              {...register("end_date", {
                required: "Please choose an ending date!!",
              })}
            />
          </div>
        </Box>
      </div>
    </div>
  );
}

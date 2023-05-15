import React, { useEffect, useState, useSearchParams } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FormControl, MenuItem, TextField, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { post, update, get } from "../../services/backend.service";
import countries from "../../utils/countries.json";
import useBasicServices from "../../services/basic.service";

import { useParams } from "react-router-dom";

export default function Competitor(props) {
  const basicServices = useBasicServices();
  const [isOther, setIsOther] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [modifyData, setModifyData] = useState({});
  const [success, setSuccess] = useState(0);
  const { state } = useLocation();
  const { rowId } = state;
  const navigate = useNavigate();
  let { tourId, compId } = useParams();
  const dateString = new Date().toISOString().slice(0, 10);

  //A state for the controlled inputs.
  const [inputState, setInputState] = useState({
    pre_nom: "",
    nom: "",
    sexe: "",
    date_naissance: "",
    lateralite: "",
    licence: "",
    points: "",
    classement: "",
    nation: "",
    club: "",
  });

  //react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const updateInputState = (prevState, updateObj) => {
    //Sets the registered value for the react-hook-form.
    setValue(Object.keys(updateObj)[0], updateObj[Object.keys(updateObj)[0]]);

    return { ...prevState, ...updateObj };
  };

  const generateMenuItem = (country) => {
    return (
      <MenuItem key={country.short} value={country.short}>
        {country.long}
      </MenuItem>
    );
  };

  useEffect(() => {
    function setMenuItemsFromJson() {
      const menuItems = countries.countries.map((c) => generateMenuItem(c));
      setMenuItems(menuItems);
    }
    setMenuItemsFromJson();
    async function getData() {
      const response = await get(`/fencers/${rowId}`);
      setModifyData(response);
    }
    if (props.type == "Modify") {
      getData();
    }
  }, []);

  useEffect(() => {
    //Sets the state for the controlled inputs
    setInputState(modifyData);
  }, [modifyData]);

  useEffect(() => {
    //Updates the registered values for the react-hook-form.
    for (const key in inputState) {
      setValue(key, inputState[key]);
    }
  }, [inputState]);

  const onSubmit = async (data) => {
    if (props.type == "Add") {
      const resp = await post("fencers/", {
        ...data,
        competitions: [compId],
        statut: "N",
      });
      if (resp.name && resp.name == "AxiosError") {
        setSuccess(-1);
      } else {
        navigate(-1);
      }
    } else if (props.type == "Modify") {
      await update(`fencers/${rowId}/`, {
        ...data,
        competitions: [compId],
        statut: "N",
      });
      navigate(-1);
    }
  };

  const text = `${props.type} Competitor`;
  return (
    <main>
      <div className="PageHeader">
        <h1 className="PageTitle">{text}</h1>
        <div className="PageButtonsWrapper">
          <Button variant="contained" size="small" onClick={() => navigate(-1)}>
            CANCEL
          </Button>
          <Button form="add-form" variant="contained" size="small" type="submit">
            {text}
          </Button>
        </div>
      </div>
      <div className="PageContent">
        {success == -1 ? (
          <Alert variant="filled" severity="error">
            Something went wrong. Please try later!
          </Alert>
        ) : (
          <></>
        )}
        <Box
          className="PageContentInner Form"
          component="form"
          display="flex"
          flexDirection="column"
          id="add-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="FormColumn">
            {props.type == "Add" && (
              <TextField
                error={!!errors.id}
                helperText={errors?.id?.message}
                label="Fencer id"
                type="text"
                margin="normal"
                size="small"
                variant="filled"
                {...register("id", {
                  required: { value: true, message: "Please enter an ID!" },
                  maxLength: {
                    value: 24,
                    message: "Field cannot be longer than 24 characters!",
                  },
                })}
              />
            )}
            <TextField
              error={!!errors.pre_nom}
              helperText={errors?.pre_nom?.message}
              label="First Name"
              type="text"
              margin="normal"
              size="small"
              variant="filled"
              value={inputState.pre_nom || ""}
              {...register("pre_nom", {
                required: {
                  value: true,
                  message: "Please enter your first name!",
                },
                maxLength: {
                  value: 72,
                  message: "Field cannot be longer than 72 characters!",
                },
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, { pre_nom: e.target.value })
                  ),
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
              value={inputState.nom || ""}
              {...register("nom", {
                required: {
                  value: true,
                  message: "Please enter your last name!",
                },
                maxLength: {
                  value: 72,
                  message: "Field cannot be longer than 72 characters!",
                },
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, { nom: e.target.value })
                  ),
              })}
            />

            <FormControl variant="filled">
              <TextField
                error={!!errors.sexe}
                helperText={errors?.sexe?.message}
                select
                label="Sex"
                id="sex"
                value={inputState.sexe || ""}
                {...register("sexe", {
                  required: "Please choose sex!",
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, { sexe: e.target.value })
                    ),
                })}
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
              value={inputState.date_naissance || ''}
              sx={{ width: 220 }}
              {...register("date_naissance", {
                required: "Please enter your date of birth!",
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, {
                      date_naissance: e.target.value,
                    })
                  ),
              })}
            />

            <FormControl variant="filled">
              <TextField
                error={!!errors.lateralite}
                helperText={errors?.lateralite?.message}
                select
                label="Laterality"
                id="laterality"
                value={inputState.lateralite || ""}
                {...register("lateralite", {
                  required: "Please select laterality!",
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, {
                        lateralite: e.target.value,
                      })
                    ),
                })}
              >
                <MenuItem value="G">Left</MenuItem>
                <MenuItem value="D">Right</MenuItem>
              </TextField>
            </FormControl>
          </div>
          <div className="FormColumn">
            <TextField
              error={!!errors.licence}
              helperText={errors?.licence?.message}
              label="License"
              type="text"
              margin="normal"
              size="small"
              variant="filled"
              value={inputState.licence || ""}
              {...register("licence", {
                required: {
                  value: true,
                  message: "Please enter your license!",
                },
                maxLength: {
                  value: 12,
                  message: "Field cannot be longer than 12 characters!",
                },
                min: {
                  value: 0,
                  message: "License should not be negative!"
                },
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, {
                      licence: e.target.value,
                    })
                  ),
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
              value={inputState.points || ""}
              {...register("points", {
                required: { value: true, message: "Please enter the points!" },
                maxLength: {
                  value: 11,
                  message: "Field cannot be longer than 11 numbers!",
                },
                min: {
                  value: 0,
                  message: "Points should be a positive number or zero!"
                },
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, {
                      points: e.target.value,
                    })
                  ),
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
              value={inputState.classement || ""}
              {...register("classement", {
                required: {
                  value: true,
                  message: "Please enter the classement!",
                },
                maxLength: {
                  value: 11,
                  message: "Field cannot be longer than 11 numbers!",
                },
                min: {
                  value: 0,
                  message: "Classement should not be negative!"
                },
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, {
                      classement: e.target.value,
                    })
                  ),
              })}
            />
          </div>
          <div className="FormColumn">
            <FormControl variant="filled">
              <TextField
                error={!!errors.nation}
                helperText={errors?.nation?.message}
                select
                label="Nationality"
                id="nationality"
                value={inputState.nation || ""}
                {...register("nation", {
                  required: "Please choose a nationality!",
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, {
                        nation: e.target.value,
                      })
                    ),
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
                value={inputState.club || ""}
                {...register("club", {
                  required: { value: true, message: "Please choose a club!" },
                  maxLength: {
                    value: 256,
                    message: "Field cannot be longer than 256 characters!",
                  },
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, {
                        club: e.target.value,
                      })
                    ),
                })}
              ></TextField>
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
                value={inputState.club || ""}
                {...register("club", {
                  required: { value: true, message: "Please choose a club!" },
                  maxLength: {
                    value: 256,
                    message: "Field cannot be longer than 256 characters!",
                  },
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, {
                        club: e.target.value,
                      })
                    ),
                })}
              />
            )}
          </div>
        </Box>
      </div>
    </main>
  );
}

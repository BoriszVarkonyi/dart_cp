import React, { useState, useEffect } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { FormControl, MenuItem, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { post, update, get } from "../../services/backend.service";

export default function Competition(props) {
  const [isOther, setIsOther] = useState(false);
  const [modifyData, setModifyData] = useState({});
  const { state } = useLocation();
  const { rowId } = state;
  let { tournamentId } = useParams();
  const navigate = useNavigate();

  //react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //A state for the controlled inputs.
  const [inputState, setInputState] = useState({
    title_long: "",
    weapon_type: "",
    is_wheelchair: false,
    sex: "",
    type: "",
    age_group: "",
    host_country: "",
    address: "",
    entry_fee: "",
    currency: "",
    start_date: "",
    end_date: "",
  });


  useEffect(() => {
    async function getData() {
      const response = await get(`/competitions/${rowId}`);
      setModifyData(response);
    }
    if (props.type == "Modify") {
      getData();
    }
  }, []);

  useEffect(() => {
    //Sets the state for the controlled inputs
    setInputState(modifyData);

    //Updates the registered values for the ract-hook-form.
    for (const key in inputState) {
      setValue(key, inputState[key]);
    }
  }, [modifyData]);

  const updateInputState = (prevState, updateObj) => {
    //Sets the registered value for the react-hook-form.
    setValue(Object.keys(updateObj)[0], updateObj[Object.keys(updateObj)[0]]);

    return { ...prevState, ...updateObj };
  };

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
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(-1)}>
            CANCEL
          </Button>
          <Button
            form="create-form"
            variant="contained"
            size="small"
            ype="submit">
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
              value={inputState.title_long || ""}
              {...register("title_long", {
                required: "Please enter the competition name!",
                maxLength: {
                  value: 72,
                  message: `Field cannot be longer than 72 characters!`,
                },
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, { title_long: e.target.value })
                  ),
              })}
            />

            <TextField
              error={!!errors.weapon_type}
              helperText={errors?.weapon_type?.message}
              select
              label="Weapon type"
              id="weapon-type"
              defaultValue=""
              value={inputState.weapon_type || ""}
              {...register("weapon_type", {
                required: "Please choose a weapon type!",
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, { weapon_type: e.target.value })
                  ),
              })}
            >
              <MenuItem value="E">Epee</MenuItem>
              <MenuItem value="F">Foil</MenuItem>
              <MenuItem value="S">Sabre</MenuItem>
            </TextField>
            <FormControl variant="filled">
              <TextField
                error={!!errors.isWheel}
                helperText={errors?.isWheel?.message}
                select
                label="Wheelchair"
                id="wheelchair"
                value={inputState.is_wheelchair || false}
                {...register("isWheel", {
                  required: "Ide mit kéne írni?:c",
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, {
                        is_wheelchair: e.target.value,
                      })
                    ),
                })}
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
                value={inputState.sex || ""}
                {...register("sex", {
                  required: "Please choose sex!",
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, { sex: e.target.value })
                    ),
                })}
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
                value={inputState.type || ""}
                {...register("type", {
                  required: "Please choose a competition type!",
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, { type: e.target.value })
                    ),
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
                  value={inputState.age_group || ""}
                  {...register("age_group", {
                    required: "Please choose an age gorup!",
                    maxLength: {
                      value: 64,
                      message: `Field cannot be longer than 64 characters!`,
                    },
                    onChange: (e) =>
                      setInputState((prevState) =>
                        updateInputState(prevState, {
                          age_group: e.target.value,
                        })
                      ),
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
                value={inputState.age_group || ""}
                {...register("age_group", {
                  required: "Please choose an age gorup!",
                  maxLength: {
                    value: 64,
                    message: `Field cannot be longer than 64 characters!`,
                  },
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, { age_group: e.target.value })
                    ),
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
                value={inputState.host_country || ""}
                {...register("host_country", {
                  required: "Please choose a host country!",
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, {
                        host_country: e.target.value,
                      })
                    ),
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
              value={inputState.address || ""}
              {...register("address", {
                required: "Please enter an address!",
                maxLength: {
                  value: 128,
                  message: `Field cannot be longer than 128 characters!`,
                },
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, { address: e.target.value })
                  ),
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
                value={inputState.entry_fee || ""}
                {...register("entry_fee", {
                  required: "Please enter a fee!",
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, { entry_fee: e.target.value })
                    ),
                })}
              />
              <TextField
                error={!!errors.currency}
                helperText={errors?.currency?.message}
                label="Currency"
                type="text"
                margin="normal"
                size="small"
                variant="filled"
                value={inputState.currency || ""}
                {...register("currency", {
                  required: "Please enter a currency!",
                  onChange: (e) =>
                    setInputState((prevState) =>
                      updateInputState(prevState, { currency: e.target.value })
                    ),
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
              value={inputState.start_date || ""}
              sx={{ width: 220 }}
              {...register("start_date", {
                required: "Please choose a starting date!",
                maxLength: {
                  value: 31,
                  message: `Field cannot be longer than 31 characters!`,
                },
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, { start_date: e.target.value })
                  ),
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
              sx={{ width: 220 }}
              value={inputState.end_date || ""}
              {...register("end_date", {
                required: "Please choose an ending date!!",
                onChange: (e) =>
                  setInputState((prevState) =>
                    updateInputState(prevState, { end_date: e.target.value })
                  ),
              })}
            />
          </div>
        </Box>
      </div>
    </div>
  );
}

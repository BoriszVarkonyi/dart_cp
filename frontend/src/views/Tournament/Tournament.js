import React from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { post, update, get } from '../../services/backend.service';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Tournament(props) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [modifyData, setModifyData] = useState({});
  const { state } = useLocation();
  const { rowId } = state;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dateString = new Date().toISOString().slice(0, 10);

  //A state for the controlled inputs.
  const [inputState, setInputState] = useState({
    id: '',
    title_long: '',
    starting_date: dateString,
    ending_date: dateString,
  });

  const updateInputState = (prevState, updateObj) => {
    //Sets the registered value for the react-hook-form.
    setValue(Object.keys(updateObj)[0], updateObj[Object.keys(updateObj)[0]]);

    return { ...prevState, ...updateObj };
  };

  useEffect(() => {
    async function getData() {
      const response = await get(`/tournaments/${rowId}`);
      setModifyData(response);
    }
    if (props.type == 'Modify') {
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

  const onSubmitSave = async (data) => {
    if (props.type == 'Create') {
      await post('tournaments/', data);
    } else if (props.type == 'Modify') {
      await update(`tournaments/${rowId}/`, data);
    }
    return navigate(-1);
  };

  const onSubmitSaveOpen = async (data) => {
    const resp = await post('tournaments/', data);
    return navigate(`/${resp.id}/competitions`);
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
            value={inputState.title_long || ''}
            {...register('title_long', {
              required: 'Please enter a name!',
              onChange: (e) =>
                setInputState((prevState) =>
                  updateInputState(prevState, { title_long: e.target.value })
                ),
            })}
          />
        </div>
        <div className="FormColumn">
          <TextField
            error={!!errors.starting_date}
            helperText={errors?.starting_date?.message}
            id="date"
            label="Starting Date"
            type="date"
            size="small"
            variant="filled"
            value={inputState.starting_date}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register('starting_date', {
              required: 'Please enter a start date!',
              validate: (value) =>
                value <= getValues('ending_date') ||
                'Please enter a valid time interval!',
              onChange: (e) =>
                setInputState((prevState) =>
                  updateInputState(prevState, { starting_date: e.target.value })
                ),
            })}
          />
          <TextField
            error={!!errors.ending_date}
            helperText={errors?.ending_date?.message}
            id="date"
            label="Ending Date"
            type="date"
            size="small"
            variant="filled"
            value={inputState.ending_date || ''}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register('ending_date', {
              required: 'Please enter an end date!',
              onChange: (e) =>
                setInputState((prevState) =>
                  updateInputState(prevState, { ending_date: e.target.value })
                ),
            })}
          />
        </div>
      </Box>
    </div>
  );
}

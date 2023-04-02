import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/auth';
import { clearMessage } from '../../slices/message';
import { useTranslation, Trans } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  //react-router-doms usNavigate hook
  const navigate = useNavigate();

  //onSubmit function, after submit it navigates to the /panel path
  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    dispatch(login({ username: email, password: password }))
      .unwrap()
      .then(() => {
        navigate('/panel');
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  //validate rules for the email input
  const emailRules = {
    required: t('login.enterEmail'),
    pattern: {
      // value:
      // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      // message: t('login.enterValidEmail'),
    },
  };

  return (
    <div className="LoginForm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        noValidate
      >
        <TextField
          error={!!errors.email}
          helperText={errors?.email?.message}
          label={t('login.email')}
          type="text"
          margin="normal"
          size="small"
          variant="filled"
          {...register('email', emailRules)}
        />
        <TextField
          error={!!errors.password}
          helperText={errors?.password?.message}
          label={t('login.password')}
          type="password"
          margin="normal"
          size="small"
          variant="filled"
          {...register('password', { required: t('login.enterPassword') })}
        />
        <Button variant="contained" type="submit" size="small">
          {t('login.login')}
        </Button>
      </Box>
      {message && <div>{message}</div>}
    </div>
  );
}

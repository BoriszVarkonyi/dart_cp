import React from 'react';
import './LoginLayout.css';
import fencersImage from '../../../assets/fencers.svg';
import Login from '../../../views/Login/Login';
import Button from '@mui/material/Button';
import { useTranslation, Trans } from 'react-i18next';

export default function LoginLayout() {
  const { t, i18n } = useTranslation();
  return (
    <div id="LoginLayout">
      <div id="LoginBlock">
        <div className="LoginHeader">
          <p id="AppNameLogin">d'ARTAGNAN CONTROL</p>
          <p id="AppVersionLogin">Alpha</p>
        </div>
        <p id="LoginText">{t('login.login')}</p>
        <Login />
        {/*
          <div className="LanguageSwitcher">
            <Button
              variant="text"
              size="large"
              onClick={() => i18n.changeLanguage('en')}
            >
              🇬🇧
            </Button>
            &#47;
            <Button
              variant="text"
              size="large"
              onClick={() => i18n.changeLanguage('hu')}
            >
              🇭🇺
            </Button>
          </div>
        */}
        <p id="CopyrightText">© d'ARTAGNAN 2023</p>
      </div>
      <div id="LoginBackground">
        <img src={fencersImage} />
      </div>
    </div>
  );
}

import React from 'react';
import './LoginLayout.css';
import fencersImage from '../../../assets/fencers.svg';
import horseImage from '../../../assets/horse.svg';
import Login from '../../../views/Login/Login';
import Button from '@mui/material/Button';
import { useTranslation, Trans } from 'react-i18next';

export default function LoginLayout() {
  const { t, i18n } = useTranslation();
  return (
    <div className="LoginLayout">
      <div className="LoginBlock">
        <div className="LoginHeader">
          <img className="LogoImage" src={horseImage} />
          <h1 className="LoginText">{t('login.login')}</h1>
        </div>
        <Login />
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
        <p className="CopyrightText">© d'ARTAGNAN 2023</p>
      </div>
      <div className="LoginBackground">
        <img className="FencersImage" src={fencersImage} />
      </div>
    </div>
  );
}
